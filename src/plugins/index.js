import Vue from 'vue';
import localStoragePlugin from './local-storage';
import './vue-meta';
import './vuetify';
import './vee-validate';
import './axios';

Vue.use(localStoragePlugin, {
  cacheVersion: '1.0'
});

