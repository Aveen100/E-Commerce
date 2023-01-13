<template>
  <div>
  <div class="grey lighten-3">
    <Navbar />
    <v-container>

      <!-- ********** Displaying Buttons of All Categories Starts ********* -->
      
      <h3 class="ml-10">Categories</h3>
      <v-chip
      v-for="cat in categories"
      :key="cat"
      color="warning"
      class="ma-2"
      v-on:click="FilterCategories(cat)"
        >{{ cat }}</v-chip
        >
        <!-- ********** Displaying Buttons of All Categories End********* -->
        
      <v-divider></v-divider><br />
      <!-- ************* Start  of Add New Products Dialog Starts *************  -->

      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="grey lighten-1" v-bind="attrs" v-on="on">
              Add New Product
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Add New Product</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="Product.title"
                      label="Enter Product Title"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="Product.category"
                      label="Enter Product Category"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4"> </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="Product.description"
                      label="Enter Product Description"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="Product.price"
                      label="Enter Product Price"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="warning" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn
                color="warning"
                text
                @click="(dialog = false), NewProduct(), AddNewProduct()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <!-- ************* End of Add New Products *************  -->

      

      <!-- **************** Display All Products ****************  -->

      <v-layout
        row
        v-if="
          this.$store.state.filter.length == 0 &&
          this.$store.state.SearchedProducts == 0
        "
      >
        <v-card
          class="mx-auto my-12 elevation-14"
          max-width="280" max-height="auto"
          v-for="p in paginatedProducts"
          :key="p.id"
          v-on:click="GetProductID(p.id)"
        >
        
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
      <!-- *********** End of show all products *************-->

      <!-- ***************** Displaying  After Filtering Products By Category  ***************-->
      <v-layout v-if="this.$store.state.filter.length != 0">
        <ProductByCategory />
      </v-layout>
      <!--********** Displaying  After Filtering Products By Category End ********************-->

      <!-- ************* Displayyy Searched Products  Starts**************** -->
      <v-layout
        row
        v-if="
          this.$store.state.SearchedProducts != 0 &&
          this.$store.state.filter == 0
        "
      >
        <SearchedProducts />
      </v-layout>

      <!-- ************* Displayyy Searched Products Ends **************** -->
      <!-- ************** Pagination  Area ***************   -->

      <div class="text-center">
        <v-pagination v-if="this.$store.state.filter==0"
          class="mt-10" @input="scrollToTop()"
          v-model="page"
          :length="totalPages"
          :total-visible="6"
          color="warning"
          circle
        />
      </div>

      <!-- ************** Pagination  Area End ***************   -->
    </v-container>
    
    <!-- ************* Footer Starts **************** -->
    <Footer />
    <!-- ************* Footer Ends **************** -->
  </div>
  <Loader />

</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import ProductByCategory from "../components/ProductByCategory.vue";
import SearchedProducts from "../components/SearchedProducts.vue";
import Loader from "../components/Loader.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Products",
  components: {
    Navbar,
    Footer,
    ProductByCategory,
    SearchedProducts,
    Loader
  },
  data() {
    return {
      cart: [],
      page: 1,
      itemsPerPage: 10,
      dialog: false,

      Product: {
        title: "",
        category: "",
        description: "",
        price: "",
      },
    };
  },
  computed: {
    // ********* Pagination Start *******

    ...mapGetters(["products"]),
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },

    // ********* Pagination Ends *******

    ...mapGetters(["categories"]),
    ...mapGetters(["filter"]),
    ...mapGetters(["SearchedProducts"]),
  },
  methods: {

      // ********  Scroll to top After moving on next page in pagination ***********


// ********  Scroll to top After moving on next page in pagination ***********
    scrollToTop() {
    window.scrollTo(0,0);
  },

    GetProductID(index) {
      console.log(index);
      localStorage.setItem("ProductID", index);
      this.$router.push({ name: "productdetails" });
    },
// map actions for vuex 
    ...mapActions(["fetchAllProducts"]),
    ...mapActions(["FetchCategories"]),
    ...mapActions(["FilterCategories"]),
    ...mapActions(["AddNewProduct"]),
    ...mapActions(["SearchProduct"]),

    NewProduct() {
      window.localStorage.setItem("NewProduct", JSON.stringify(this.Product));
    },
  },
//  mounted function for vuex
  mounted() {
    
    this.fetchAllProducts();
    this.FetchCategories();
    let x = localStorage.getItem("LoginData");
    if (!x) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>

<style></style>
