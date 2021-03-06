import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
})

export default store
