<template>
  <v-container>
    <v-row class="home-row">
      <v-col lg="4" md="12">
        <h1 class="home-header">What is CoWeb ?</h1>
        <p>
          This is an idea-based learning supplementary website for the
          scientific research movement of the School of Foreign Languages, Hanoi
          University of Science and Technology. The goal of this website is to
          become an effective online learning material for students in learning
          Vowels and Consonants of the Phonetics and Phonology course. We hope
          that you can find useful information and activities at this website.
        </p>
        <p>Thank you!</p>
        <v-btn
          class="get-started-btn pl-9 pr-9"
          to="/theory/consonants"
          color="primary"
          >GET STARTED</v-btn
        >
      </v-col>
      <v-col lg="8" md="12"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  page: {
    title: "Home",
    meta: [{ name: "description", content: "Home page" }],
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.home-row {
  align-items: center;
  align-content: center;
}

.home-header {
  margin-bottom: 50px;
  font-size: 40px;
}
.get-started-btn {
  color: #fff;
  border-radius: 16px;
  font-size: 17px;
  margin-top: 50px;
}
@media only screen and (max-width: 1250px) {
  .home-row {
    flex-direction: column-reverse;
  }
  .home-header {
    margin-bottom: 5px;
    font-size: 35px;
  }
  .get-started-btn {
    margin-top: 5px;
  }
}
</style>
