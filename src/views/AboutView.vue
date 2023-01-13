<template>
  <div>
  <div>
    <Navbar />
    <!-- ********** Top Textt ******** -->

    <v-container fluid class="grey lighten-4">
      <h1 class="display-3 pa-16 warning--text font-weight-bold">
        We help to easily buy products<br />around the country
      </h1>
    </v-container>

     <!-- ********* Hero Image ********* -->

    <v-parallax src="../assets/login.webp">
      <v-layout>
        <v-col class="3">
          <h2>Testtt</h2>
        </v-col>
      </v-layout>
    </v-parallax>
    <v-layout row class="pa-8 grey lighten-4">
      <v-col class="4">
        <v-img src="../assets/goals.jpg" maxWidth="400" class="mx-10"></v-img>
      </v-col>
      <v-col class="8">
        <h4>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </h4>
      </v-col>
    </v-layout>
    <v-layout row class="grey lighten-4">
      <v-col class="6">
        <h4 class="mx-15">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </h4>
      </v-col>
      <v-col class="6">
        <v-img src="../assets/goals.jpg" maxWidth="400" class="mx-10"></v-img>
      </v-col>
    </v-layout>
    <Footer />
  </div>
<Loader/>
</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Loader from "../components/Loader.vue";
export default {
  name: "About",
  components: {
    Navbar,
    Footer,
    Loader
  },
  mounted() {
    // this.UserCart();
    let x = localStorage.getItem("LoginData");
    if (!x) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>

<style></style>
