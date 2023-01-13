<template>
  <v-dialog transition="dialog-top-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-cart </v-icon>
        <v-badge overlap color="warning" :content="UserCart.length"></v-badge>
      </v-btn>
    </template>

    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="warning title" dark align="center">Cart</v-toolbar>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="title black--text">Image</th>
                  <th class="title black--text">Item Name</th>
                  <th class="title black--text">Quantity</th>
                  <th class="title black--text">Price</th>
                  <th class="title red--text">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in UserCart" :key="item.id">
                  <td>
                    <v-img :src="item.thumbnail" max-width="100"></v-img>
                  </td>
                  <td>{{ item.title }}</td>
                  <td>
                    <v-layout>
                      <v-btn
                        x-small
                        @click="item.quantity++"
                        v-if="item.quantity <= item.stock"
                        class="title warning elevation-13"
                      >
                        +
                      </v-btn>
                      <h4 class="mx-2">{{ item.quantity }}</h4>
                      <v-btn
                        x-small
                        @click="item.quantity--"
                        v-if="item.quantity > 1"
                        class="title warning elevation-13"
                      >
                        -
                      </v-btn>
                    </v-layout>
                  </td>
                  <td>{{ item.price * item.quantity }}</td>
                  <td>
                    <v-btn text v-on:click="removeFromCart(item)">
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
                <br />
                <p class="title black--text">Total Bill:{{ totalPrice }}</p>
                <CheckOut v-if="UserCart.length>0" />
                <br />
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapGetters,  mapState } from "vuex";
import CheckOut from "./CheckOut.vue";
export default {
  name: "Cart",
  components: {
    CheckOut,
  },
  data() {
    return {
      items: JSON.parse(localStorage.getItem("Cart")),
    };
  },
  computed: {
    ...mapGetters(["GetUserCart"]),
    ...mapState(["UserCart"]),

    // ****** Calculating the Total Price of the Cart *********
    totalPrice() {
      return this.UserCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    // ****** Removing product from the Cart *********

    removeFromCart(item) {
      const index = this.UserCart.indexOf(item);
      if (index > -1) {
        this.UserCart.splice(index, 1);
      }
    },
  },
  mounted() {
  },
};
</script>

<style></style>
