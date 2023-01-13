import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ******* Array to store All Products *****
    products: [],
    // ******* Array to store All Categories *****
    categories: [],
    // ******* Array to store Filter Product after clicking on the Categories *****
    filter: [],
    // ******* Array to store Product Details *****
    ProductDetails: [],
    // ******* Array to store Details of Searched Products *****
    SearchedProducts: [],
    // ******* Array to store Products added in the cart *****
    UserCart: [],
  },
  getters: {
    products(state) {
      return state.products;
    },
    categories(state) {
      return state.categories;
    },
    filter(state) {
      return state.filter.products;
    },

    ProductDetails(state) {
      return state.ProductDetails;
    },
    SearchedProducts(state) {
      return state.SearchedProducts;
    },
    GetUserCart(state) {
      return state.UserCart;
    },
  },
  mutations: {
    setproducts(state, products) {
      state.products = products;
    },
    setcategories(state, categories) {
      state.categories = categories;
    },
    setfilter(state, filter) {
      state.filter = filter;
    },
    
    SetDetail(state, ProductDetails) {
      state.ProductDetails = ProductDetails;
    },
    GetSearch(state, SearchedProducts) {
      state.SearchedProducts = SearchedProducts;
    },
    SetUserCart(state, y) {
      state.UserCart.push(y);
    },
  },
  actions: {
    // ********** Fetch All Products **************
    async fetchAllProducts(context) {
      const products = await fetch(
        "https://dummyjson.com/products?limit=100&skip=0"
      );
      const FetchedProducts = await products.json();
      console.log(FetchedProducts);
      context.commit("setproducts", FetchedProducts.products);
    },

    // *************End of fetching all Products ************

    // *******Fetch Categories******
    async FetchCategories(context) {
      const ProductCategories = await fetch(
        "https://dummyjson.com/products/categories"
      );
      const Cat = await ProductCategories.json();
      context.commit("setcategories", Cat);
    },

    // ************** Filter Categories on click ***************

    async FilterCategories(context, index) {
      const GetCat = await fetch(
        `https://dummyjson.com/products/category/${index}`
      );
      const Category = await GetCat.json();
      context.commit("setfilter", Category.products);

      console.log(Category);
    },

    // **************Fetching All Products Detail to show in detail page ***************

    async DetailsPage(context) {
      let FetchedProductID = localStorage.getItem("ProductID");
      const Details = await fetch(
        `https://dummyjson.com/products/${FetchedProductID}`
      );
      const MyProductDetail = await Details.json();
      context.commit("SetDetail", MyProductDetail);
    },

    // ********** Update Product Price *********

    async UpdateProduct() {
      let PriceUpdate = localStorage.getItem("UpdatedPrice");

      const ProductID = localStorage.getItem("ProductID");
      const update = await fetch(
        `https://dummyjson.com/products/${ProductID}`,
        {
          method: "PUT" /* or PATCH */,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: PriceUpdate,
          }),
        }
      );

      const NewPrice = await update.json();
      console.log(NewPrice);
    },

    // **************** Delete Product *************

    async DeletePost() {
      const ProductID = localStorage.getItem("ProductID");
      const DeletePost = await fetch(
        `https://dummyjson.com/products/${ProductID}`,
        {
          method: "DELETE",
        }
      );

      const Del = await DeletePost.json();
      console.log(Del);
    },

    // **************** Add New Product Starts *************

    async AddNewProduct() {
      const x = window.localStorage.getItem("NewProduct");
      const y = JSON.parse(x);

      const neww = await fetch(`https://dummyjson.com/products/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: y.title,
          category: y.category,
          description: y.description,
          price: y.price,
        }),
      });

      const add = await neww.json();
      console.log(add);
    },
    // **************** Add New Product Starts *************

    // **************** Search Product Starts *************

    async SearchProduct(context) {
      const GetSearchedData = localStorage.getItem("SearchedItem");
      const search = await fetch(
        `https://dummyjson.com/products/search?q=${GetSearchedData}`
      );
      const Value = await search.json();
      console.log(Value.products);
      context.commit("GetSearch", Value.products);
    },
    // **************** Search Product Ends   *************

    // ************* Add product to Cart Starts **********

    async AddtoCart(context, ProductID) {
      const Cart = await fetch(`https://dummyjson.com/products/${ProductID}`);
      const MyCart = await Cart.json();

      MyCart.quantity = 1;
      context.commit("SetUserCart", MyCart);
      console.log(this.state.UserCart, "hrllo");
    },

    // ************* Add product to Cart End **********
  },
  modules: {},
});
