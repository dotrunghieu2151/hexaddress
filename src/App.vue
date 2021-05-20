<template>
  <v-app>
    <v-layout row justify-center>
      <v-container fluid>
        <NavBar v-if="$route.name !== 'login'" />
        <LoaderWrapper :loading="true">
          <LoaderSpin />
        </LoaderWrapper>
        <v-main>
          <transition name="fade">
            <router-view />
          </transition>
        </v-main>
      </v-container>
    </v-layout>
  </v-app>
</template>


<script>
import { commonGetters } from "@/store/modules/common";
import LoaderWrapper from "./components/common/loaders/LoaderWrapper.vue";
import LoaderSpin from "./components/common/loaders/LoaderSpin.vue";
import NavBar from "./components/common/layout/NavBar.vue";

export default {
  name: "App",
  page: {
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | HexAddress` : "HexAddress";
    },
  },
  components: {
    LoaderWrapper,
    LoaderSpin,
    NavBar,
  },
  data: () => ({
    //
  }),
  watch: {
    isLoading(val) {
      console.log("LOADING", val);
    },
  },
  computed: {
    ...commonGetters(["isLoading"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style";
</style>
