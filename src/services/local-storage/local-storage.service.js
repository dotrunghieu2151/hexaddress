import { compareDates, compareVersion } from "@/utils/helpers";
import moment from "moment";
import { immutable } from "@/utils/helpers";

export default ({ options }) => {
  let config = { ...options };
  return immutable({
    updateConfig(options) {
      config = { ...config, ...options };
    },
    get(key, defaultVal = null) {
      const item = window.localStorage.getItem(key);
      if (!item) return defaultVal;
      if (this.isCacheOutdated(key)) {
        this.delete(key);
        return defaultVal;
      }
      return JSON.parse(window.localStorage.getItem(key));
    },

    set(key, val, metaData = {}) {
      const { expiresAt = null, version = config.cacheVersion } = metaData;
      expiresAt && this.setExpireAt(key, expiresAt);
      this.setVersion(key, version);
      window.localStorage.setItem(key, JSON.stringify(val));
    },

    setExpireAt(key, date) {
      const storeDate = moment.isMoment(date) ? date.valueOf() : date;
      window.localStorage.setItem(`${key}${config.expireKey}`, storeDate);
    },

    setVersion(key, version) {
      window.localStorage.setItem(`${key}${config.versionKey}`, version);
    },

    delete(key) {
      window.localStorage.removeItem(key);
      window.localStorage.removeItem(`${key}${config.expireKey}`);
      window.localStorage.removeItem(`${key}${config.versionKey}`);
    },

    isCacheOutdated(key) {
      return this.hasExpired(key) || this.isVersionOutdated(key);
    },

    hasExpired(key) {
      const expiresAt = window.localStorage.getItem(`${key}${config.expireKey}`);
      if (!expiresAt) return false; // if expireAt is not set, assume always valid
      return compareDates(moment(), '>=', expiresAt);
    },

    isVersionOutdated(key) {
      const version = window.localStorage.getItem(`${key}${config.versionKey}`);
      if (!version) return true; // if object has no version, assume it is outdated
      return compareVersion(config.cacheVersion, version) > 0;
    }
  })
}

