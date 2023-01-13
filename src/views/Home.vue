<template>
  <div>
    <div>
    <Navbar />

    <!-- ***********  Hero Image Start **********  -->

    <v-parallax src="../assets/Hero.webp" max-height="auto">
      <v-row align="center" justify="center">
        <v-col class="text-left" cols="8">
          <h1 class="text-h4 font-weight-thin mb-4 my-12">E-Comm</h1>
          <h4 class="title my-12">Get Your Productss today!</h4>
          <v-chip large class="title grey lighten-1" to="/products">
            Shop Now</v-chip
          >
        </v-col>
      </v-row>
    </v-parallax>

    <!-- ***********  Hero Image End **********  -->

    <!-- ***********  Services Start **********  -->

    <v-container fluid class="grey lighten-2 pa-16">
      <v-row align="center" justify="center">
        <h1 class="warning--text">Why Us?</h1>
      </v-row>
      <v-layout row>
        <v-hover v-slot="{ hover }" open-delay="50">
          <v-card
            :elevation="hover ? 16 : 2"
            :class="{ 'on-hover': hover }"
            class="elevation-15 mx-auto my-12"
          >
            <v-layout>
              <v-icon right size="100px" color="warning lighten-1"
                >mdi-dump-truck</v-icon
              >
              <v-layout column class="pa-10">
                <h3 class="warning--text">Free Shipping</h3>
                <p class="grey--text">When Order over $100</p>
              </v-layout>
            </v-layout>
          </v-card>
        </v-hover>
        <v-hover v-slot="{ hover }" open-delay="50">
          <v-card
            :elevation="hover ? 16 : 2"
            :class="{ 'on-hover': hover }"
            class="elevation-15 mx-auto my-12"
          >
            <v-layout>
              <v-icon right size="100px" color="warning lighten-1"
                >mdi-phone</v-icon
              >
              <v-layout column class="pa-10">
                <h3 class="warning--text">24/7 Support</h3>
                <p class="grey--text">Get support all day</p>
              </v-layout>
            </v-layout>
          </v-card>
        </v-hover>
        <v-hover v-slot="{ hover }" open-delay="50">
          <v-card
            :elevation="hover ? 16 : 2"
            :class="{ 'on-hover': hover }"
            class="elevation-15 mx-auto my-12"
          >
            <v-layout>
              <v-icon right size="100px" color="warning lighten-1"
                >mdi-cash-refund</v-icon
              >
              <v-layout column class="pa-10">
                <h3 class="warning--text">Refund</h3>
                <p class="grey--text">Get refund within 3 days!</p>
              </v-layout>
            </v-layout>
          </v-card>
        </v-hover>
      </v-layout>
    </v-container>

    <!-- ***********  Services End **********  -->

    <!-- ***********  Categories Start  /// Our Products **********  -->
    <v-container fluid>
      <v-layout>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="8">
            <h1 class="warning--text mb-4 my-12">Our Story</h1>
          </v-col>
        </v-row>
      </v-layout>
      <v-row>
        <v-col class="col-3"></v-col>
        <v-col class="col-3">
          <p class="subtitle-1 grey--text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
        </v-col>
        <v-divider vertical ></v-divider>
        <v-col class="col-3">
          <p justify="center" class="subtitle-1 grey--text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- ***********  Categories End  /// Our Products **********  -->

    <Footer />
  </div>
  <Loader />
</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Loader from "../components/Loader.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Navbar,
    Footer,
    Loader
  },
  computed: {
    ...mapGetters(["GetUserCart"])
  },
  methods: {
    ...mapActions(["UserCart"])
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
