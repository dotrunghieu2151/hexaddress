import { localStorageService } from "@/services";

export default {
  // called by Vue.use(LocalStorage)
  install(Vue, options) {
    localStorageService.updateConfig(options);
    Vue.prototype.$localStorage = localStorageService;
  }
}