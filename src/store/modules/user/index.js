
import { hexabaseService } from "@/services";
import { localStorageService } from "@/services";
import { BaseModuleBuilder } from "../base";

const defaultState = () => ({
  token: "",
  status: false,
  id: "",
  username: "",
  email: "",
  avatar: "",
});

const getters = {
  token: state => state.token || localStorageService.get('token'),
  status: state => state.status,
  userInfo: ({ username, email, avatar, id }) => {
    const cachedUserInfo = localStorageService.get('userInfo');
    return {
      id: id || cachedUserInfo?.id,
      username: username || cachedUserInfo?.username,
      email: email || cachedUserInfo?.email,
      avatar: avatar || cachedUserInfo?.avatar
    }
  }
};

const mutations = {
  setDefault(state) {
    Object.assign(state, defaultState);
  },

  setToken(state, token) {
    state.token = token;
    localStorageService.set('token', token);
  }
};

const actions = {
  async hexaLogin({ commit }, { email, password }) {
    const token = await hexabaseService.user.login({ email, password });
    commit("setToken", token);
    commit("setStatus", true);
  },
  async hexaLogout({ commit }) {
    await hexabaseService.user.logout();
    commit("setDefault");
    localStorageService.delete('userInfo');
    localStorageService.delete('token');
  },
  async upateUserInfo({ commit }) {
    const { username, email, profile_pic: avatar, u_id: id } = await hexabaseService.user.getUserInfo();
    commit("setUsername", username);
    commit("setEmail", email);
    commit("setAvatar", avatar);
    commit("setId", id);
    localStorageService.set('userInfo', { username, email, avatar, id });
  },
};

const module = BaseModuleBuilder.buildModule({
  state: defaultState,
  getters,
  actions,
  mutations
})

export default module;

export const { userGetters, userMutations, userActions } = BaseModuleBuilder.buildComputedNameMaps('user');