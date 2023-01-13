<template>
  <v-layout row>
    <v-card
      class="mx-auto my-12 elevation-14"
      max-width="280"
      max-height="auto"
      v-for="p in filter"
      :key="p.id"
      v-on:click="GetProductID(p.id)"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="p.thumbnail">
        <v-chip color="warning lighten-1"
          >{{ p.discountPercentage }}% OFF</v-chip
        >
      </v-img>

      <v-card-title>{{ p.title }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="p.rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            {{ p.rating }}
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">$ • {{ p.price }}</div>

        <div>{{ p.description }}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>{{ p.brand }}</v-card-title>

      <v-card-text>
        <span><b>Category: </b></span>
        <span>{{ p.category }}</span
        ><br />
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProductByCategory",
  computed: {
    ...mapState(["filter"]),
  },
  methods: {

            // ********* Getting Product ID and routing it to the details page *********

    GetProductID(index) {
      console.log(index);
      localStorage.setItem("ProductID", index);
      this.$router.push({ name: "productdetails" });
    },
  },
};
</script>

<style></style>
