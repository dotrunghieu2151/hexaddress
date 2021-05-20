import Vue from 'vue';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  localize
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";

localize('en');

// add custom validation message
// localize({
//   ja: langJa
// })

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
  });
});
// custom validation modes
export const passiveWhenValid = ({ errors }) => {
  if (errors.length) {
    return {
      on: ['input', 'change']
    };
  }
  return {
    on: []
  };
}

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);