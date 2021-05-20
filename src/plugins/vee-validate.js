import Vue from 'vue';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  localize
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import * as customRules from "@/utils/rules";

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

extend('tel', {
  validate: customRules.tel,
  getMessage(field) {
    return `${field} is invalid`;
  },
});

extend('zipCode', {
  validate: customRules.zipCode,
  getMessage(field) {
    return `${field} is invalid`;
  },
});

extend('fax', {
  validate: customRules.fax,
  getMessage(field) {
    return `${field} is invalid`;
  },
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