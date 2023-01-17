<template>
  <div>
    <!-- **************ToolBar Start ***************** -->

    <v-app-bar flat app class="grey lighten-1">
      <v-app-bar-nav-icon v-on:click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="blue--text hidden-sm-and-down">Programmer</span>
        <span class="font-weight-light hidden-sm-and-down">Force</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip class="grey lighten-2">
        <v-text-field
          label="Search"
          v-model="search"
          v-on:click="SearchedInput(), SearchProduct()"
          placeholder="Search Item"
          class="mt-5"
          prepend-icon="mdi-magnify"
        ></v-text-field>
      </v-chip>

  

      <!-- ******** Cart Dialog Starts ********* -->

      <Cart />

      <!-- ******** Cart Dialog Ends ********* -->
      <v-btn rounded class="warning elevation-10" v-if="!user" to="/Login">Login</v-btn>
      <v-btn icon v-on:click="logout">
        <v-icon v-if="user" >mdi-logout</v-icon>
        
        <!-- <v-icon v-if="!user" to="/Login" >mdi-login</v-icon> -->
      </v-btn>
    </v-app-bar>
    <!-- **************ToolBar Ends ***************** -->

    <!-- **************Navigation drawer Start ***************** -->

    <v-navigation-drawer class="warning" app v-model="drawer">
      <p class="text-center mt-4 headline" v-if="user">Profile</p>
      <v-layout column align="center" v-if="user">
        <v-flex>
          <v-avatar class="mx-15" size="100">
            <v-img :src="img"></v-img>
          </v-avatar>
          <p class="text-center mt-2 subheading white--text" >{{ Uname }}</p>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/products">
            <v-list-item-icon>
              <v-icon>mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title to="/products">Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon>mdi-help</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append v-if="user">
        <div class="pa-2">
          <v-btn block class="grey lighten-2" v-on:click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- **************Navigation drawer End ***************** -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Cart from "./Cart.vue";

export default {
  name: "Navbar",
  components: {
    Cart,
  },
  data() {
    return {
      drawer: false,
      user: window.localStorage.getItem("LoginData"),
      Uname: "",
      img: "",
      search: "",
    };
  },
  computed: {
    ...mapGetters(["SearchedProducts"]),
  },
  methods: {
    ...mapActions(["SearchProduct"]),

        // ****** Getting Users Details to display in the Sidebar *********

    GetUserDetails() {
      let data = JSON.parse(window.localStorage.getItem("LoginData"));
      this.Uname = data.username;
      this.img = data.image;
    },
        // ****** Logout  *********

    logout() {
      window.localStorage.removeItem("LoginData");
      this.$router.push({ name: "Login" });
    },

            // ******** Setting the Searched Keyword in the localstorage *********

    SearchedInput() {
      console.log(this.search.toLowerCase());
      localStorage.setItem("SearchedItem", this.search.toLowerCase());
    },
  },
 
};
</script>

<style></style>
