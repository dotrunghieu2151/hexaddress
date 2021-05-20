<template>
  <v-container>
    <v-card class="mt-5 mx-auto" max-width="600">
      <ValidatorObserver v-slot="props">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row justify="center">
              <p cols="12" class="mt-3 display-1 grey--text">Login</p>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="10" sm="10">
                <Validator rules="required" label="email" v-slot="props">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    :error="props.hasErrors"
                  />
                  <p class="caption mb-0 red--text">{{ props.errors }}</p>
                </Validator>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="10" sm="10">
                <Validator rules="required" label="password" v-slot="props">
                  <v-text-field
                    v-model="password"
                    type="password"
                    label="Password"
                    :error="props.hasErrors"
                  />
                  <p class="caption mb-0 red--text">{{ props.errors }}</p>
                </Validator>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="10" sm="10">
                <v-btn
                  block
                  class="mr-4 blue white--text"
                  @click="props.passes(login)"
                >
                  Login
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </ValidatorObserver>
    </v-card>
  </v-container>
</template>

<script>
import { userActions } from "@/store/modules/user";
import ValidatorObserver from "../components/validation/ValidatorObserver.vue";
import Validator from "../components/validation/Validator.vue";

export default {
  components: {
    ValidatorObserver,
    Validator,
  },
  name: "Login",
  page: {
    title: "Login",
    meta: [{ name: "description", content: "User Login" }],
  },
  data() {
    return {
      valid: null,
      email: "",
      password: "",
    };
  },
  methods: {
    ...userActions(["hexaLogin", "upateUserInfo"]),
    async login() {
      await this.hexaLogin({
        email: this.email,
        password: this.password,
      });
      await this.upateUserInfo();
      this.$router.push({ name: "address" });
    },
  },
};
</script>