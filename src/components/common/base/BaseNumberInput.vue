<template>
  <v-text-field
    outlined
    filled
    ref="input"
    :type="type"
    :disabled="disabled"
    v-on="listeners"
    :label="label"
    :placeholder="placeholder"
    :hint="hint"
    :error="hasError"
    :success="valid"
    v-model="input"
    @focus="selectText"
    @keydown="preventInputCharachter"
  />
</template>

<script>
import { omit } from "@/utils/helpers";

export default {
  name: "BaseNumberInput",
  computed: {
    listeners() {
      return Object.assign(
        {},
        omit(this.$listeners, "click:append-outer", "click:prepend", "input")
      );
    },
    hasError() {
      return this.errors && this.errors.length > 0;
    },
    input: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  props: {
    label: {
      type: String,
    },
    hint: {
      type: String,
    },

    placeholder: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "text",
    },

    valid: {
      type: Boolean,
    },

    errors: {
      type: [Array, String],
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    value: {
      type: String,
      isRequired: true,
    },
  },
  methods: {
    selectText(e) {
      // fix for Safari bug
      setTimeout(function () {
        e.target.select();
      }, 0);
    },

    preventInputCharachter(e) {
      const charValue = String.fromCharCode(e.keyCode);
      // 231 is the keyCode for all number for Vietnamese keyboard
      // 190 is "."
      // 37,38,39,40 = arrow keys
      const allowKeyCodes = [190, 231, 37, 38, 39, 40];
      if (
        !allowKeyCodes.includes(e.which) &&
        isNaN(charValue) &&
        e.which != 8
      ) {
        e.preventDefault();
      }
    },
  },
};
</script>