import localStorage from './local-storage.service';

const defaultConfig = {
  expireKey: "_expiresAt",
  versionKey: "_version",
  cacheVersion: '1.0',
}
export const localStorageService = localStorage({ options: defaultConfig });