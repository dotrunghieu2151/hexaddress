import { immutable } from "../../utils/helpers";

export default ({ http }) => immutable({
  async login({ email, password }) {
    const result = await http.post("/login", { email, password });
    return result.data.token;
  },

  async logout() {
    await http.post("/users/logout");
    return true;
  },

  async getUserInfo() {
    const result = await http.get("/userinfo");
    return result.data;
  },
});
