<template>
  <div>
    <div>
      <Navbar />
      <v-container class="warning lighten-4 elevation-19">
        <v-row>
          <v-col col="5" class="elevation-19" elevation-19>
            <v-carousel>
              <v-carousel-item
                v-for="i in ProductDetails.images"
                :key="i"
                :src="i"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col col="7" class="elevation-19">
            <h2>{{ ProductDetails.title }}</h2>

            <v-rating
              :value="ProductDetails.rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
              class="ma-3"
            ></v-rating>

            <span class="grey--text ms-4">
              {{ ProductDetails.rating }} reviews
            </span>

            <div class="my-4 text-subtitle-1">
              <h2>$ • {{ ProductDetails.price }}</h2>
            </div>

            <div class="my-4 caption">
              <strong color="warning--text">Category:</strong>
              {{ ProductDetails.category }}
            </div>

            <div>{{ ProductDetails.description }}</div>

            <v-divider class="mx-4"></v-divider>

            <!-- ************ Size buttons will only show on shoes and dresses *********  -->
            <div
              class="caption"
              v-if="
                ProductDetails.category == 'mens-shirts' ||
                ProductDetails.category == 'mens-shoes' ||
                ProductDetails.category == 'women-shoes' ||
                ProductDetails.category == 'womens-dresses'
              "
            >
              <h3 color="warning--text" class="my-2 mx-2">Size:</h3>
              <v-btn
                ><v-icon large color="red" class="mx-2"
                  >mdi-size-s</v-icon
                ></v-btn
              >
              <v-btn
                ><v-icon large color="red" class="mx-2"
                  >mdi-size-m</v-icon
                ></v-btn
              >
              <v-btn
                ><v-icon large color="red" class="mx-2"
                  >mdi-size-l</v-icon
                ></v-btn
              >
              <v-btn
                ><v-icon large color="red" class="mx-2"
                  >mdi-size-xl</v-icon
                ></v-btn
              >
            </div>

            <v-btn
              class="warning elevation-19 my-4"
              v-on:click="AddtoCart(ProductDetails.id)"
              >Add to Cart</v-btn
            >
            <div class="my-6 caption">
              <h3 color="warning--text" class="mx-2">Share:</h3>
              <v-btn
                ><v-icon large color="primary" class="mx-2"
                  >mdi-facebook</v-icon
                ></v-btn
              >
              <v-btn
                ><v-icon large color="primary" class="mx-2"
                  >mdi-facebook-messenger</v-icon
                ></v-btn
              >
              <v-btn
                ><v-icon large color="primary" class="mx-2"
                  >mdi-twitter</v-icon
                ></v-btn
              >
              <v-btn
                ><v-icon large color="success" class="mx-2"
                  >mdi-whatsapp</v-icon
                ></v-btn
              >
            </div>
            <!-- <v-chip class="warning elevation-15 mx-5" v-on:click="UpdateProduct">Update Product</v-chip> -->

            <v-col cols="auto">
              <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    color="warning elevation-15 mx-5"
                    v-bind="attrs"
                    v-on="on" v-if="user"
                    >Update Products Price</v-chip
                  >
                  <v-chip v-if="user"
                    class="warning elevation-15"
                    v-on:click="DeletePost(), (DeletedSnackbar = true)"
                    >Delete Product</v-chip
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="warning" dark
                      >Update Product's Price</v-toolbar
                    >
                    <v-card-text>
                      <v-text-field
                        prepend-icon="mdi-shopping"
                        label="Set New Price"
                        v-model="NewPrice"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-chip
                        class="warning"
                        v-on:click="
                          Price(), (UpdateSnackbar = true), UpdateProduct()
                        "
                        >Update Price</v-chip
                      >

                      <v-btn
                        text
                        @click="dialog.value = false"
                        class="justify-end"
                        >Close</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>

            <!-- ******* Update Snackbar Starts ********  -->
            <v-snackbar v-model="UpdateSnackbar">
              Price Updated

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="pink"
                  text
                  v-bind="attrs"
                  @click="UpdateSnackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>

            <!-- ******* Update Snackbar End ********  -->

            <!-- ******* Delete Product Snackbar Starts ********  -->

            <v-snackbar v-model="DeletedSnackbar">
              Product Deleted

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="pink"
                  text
                  v-bind="attrs"
                  @click="DeletedSnackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>

            <!-- ******* Delete Product Snackbar Ends********  -->
          </v-col>
        </v-row>
      </v-container>
      <Footer />
    </div>
    <Loader />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Loader from "../components/Loader.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductDetail",
  components: {
    Navbar,
    Footer,
    Loader,
  },
  data() {
    return {
      DeletedSnackbar: false,
      UpdateSnackbar: false,
      NewPrice: "",
      user: window.localStorage.getItem("LoginData"),
    };
  },
  computed: {
    ...mapGetters(["ProductDetails"]),
    ...mapGetters(["products"]),
    ...mapGetters(["GetUserCart"]),
  },
  methods: {
    ...mapActions(["DetailsPage"]),
    ...mapActions(["UpdateProduct"]),
    ...mapActions(["DeletePost"]),
    ...mapActions(["AddtoCart"]),
    Price() {
      localStorage.setItem("UpdatedPrice", this.NewPrice);
    },
  },
  mounted() {
    this.DetailsPage();
   
  },
};
</script>

<style></style>
