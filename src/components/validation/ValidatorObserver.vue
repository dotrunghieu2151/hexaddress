<template>
  <!-- destructuring doesn't work on IE 11 so use props instead of {}  -->
  <validation-observer ref="obs" v-slot="props">
    <slot
      :invalid="props.invalid"
      :passes="props.passes"
      :errors="props.errors"
      :validate="validate"
    ></slot>
  </validation-observer>
</template>
<script>
export default {
  name: "ValidatorObserver",
  components: {},
  props: {},
  methods: {
    async validate(cb) {
      const valid = await this.$refs.obs.validate();
      if (valid) {
        cb();
      }
    },
  },
};
</script>
