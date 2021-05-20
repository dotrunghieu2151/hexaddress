<template>
  <div>
    <!-- SideBar -->
    <v-navigation-drawer
      v-if="!isSideBarDisabled"
      v-model="sidebar"
      :mini-variant.sync="mini"
      mini-variant-width="70"
      :permanent="$vuetify.breakpoint.smAndUp"
      bottom
      clipped
      :expand-on-hover="$vuetify.breakpoint.smAndUp"
      app
    >
      <v-treeview
        :items="sideBarTreeView"
        item-key="name"
        item-text="title"
        :open="openSideBar"
        :active="activeSideBar"
        hoverable
        activatable
      >
        <template v-slot:prepend="{ item }">
          <v-icon v-if="item.icon">
            {{ item.icon }}
          </v-icon>
        </template>
        <template v-slot:label="{ item }">
          <router-link :to="item.path" v-if="item.path">{{
            item.title
          }}</router-link>
          <span v-else>{{ item.title }}</span>
        </template>
      </v-treeview>
      <!-- <v-list dense>
        <v-list-item v-for="item in navBarItems" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
    </v-navigation-drawer>

    <!-- NavBar -->
    <v-app-bar app fixed class="primary app-pl20" clipped-left>
      <v-toolbar-title class="white--text">
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="app-text-30"> HexAddress </span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon
          class="white--text"
          @click="closeSideBar"
        ></v-app-bar-nav-icon>
      </span>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          depressed
          class="primary"
          v-for="item in navBarItems"
          :key="item.title"
          :to="item.path"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-avatar class="ml-5">
        <img :src="userInfo.avatar" :alt="userInfo.username" />
      </v-avatar>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="ml-6 mr-6" dark icon v-on="on">
            {{ userInfo.username }}
          </v-btn>
        </template>
        <v-card>
          <v-list dense>
            <v-list-item class="pl-3 pr-3 clickable" @click="logout">
              Logout
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { userGetters } from "@/store/modules/user";
import { userActions } from "@/store/modules/user";

export default {
  name: "NavBar",

  data() {
    return {
      sidebar: false,
      mini: true,
      disableSideBarRoutes: ["login"],
      navBarItems: [
        // { title: "Home", path: "/", icon: "mdi-home" },
        // { title: "Address", path: "/address", icon: "mdi-map-marker" },
      ],
      sideBarTreeView: [
        // { title: "Home", name: "home", path: "/", icon: "mdi-home" },
        { title: "Address", path: "/address", icon: "mdi-map-marker" },
      ],
    };
  },
  computed: {
    ...userGetters(["userInfo"]),
    isSideBarDisabled() {
      return this.disableSideBarRoutes.includes(this.$route.name);
    },
    openSideBar() {
      return this.$route.name?.split(".");
    },
    activeSideBar() {
      return [this.$route.name];
    },
  },

  methods: {
    ...userActions(["hexaLogout"]),
    closeSideBar() {
      this.sidebar = !this.sidebar;
    },
    toggleMinimizeSideBar() {
      this.mini = !this.mini;
    },
    async logout() {
      await this.hexaLogout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/components/nav-bar";
</style>
