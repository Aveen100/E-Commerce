<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
       
        <v-btn
          class="warning elevation-13"
          dark
          rounded
          v-bind="attrs"
          v-on="on"
          justify="center" 
          v-on:click="CheckUser()"
        >
          Check Out
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <h3 class="text-h5 warning--text">Shipping Informarion</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Enter First Name"  required></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Enter last name*"  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Enter Email*"  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Enter Phone Number*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Enter Address*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" text @click="dialog = false"> Close </v-btn>
          <v-btn dark text color="warning" @click="snackbar = true ,reload()">
            Order Now
          </v-btn>

          <v-snackbar v-model="snackbar" timeout="2000">
            Your Order Has Been Placed Successfully. 

            <template v-slot:action="{ attrs }">
              <v-btn
                color="warning"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "CheckOut",
  data() {
    return {
      dialog: false,
      snackbar: false,
      user: window.localStorage.getItem("LoginData"),
     
    };
  },
  methods:{
    reload(){
      this.$router.go()
    },
    CheckUser(){
      const x = window.localStorage.getItem("LoginData")
      if(x){
        this.dialog = true
      }
      else{
        this.$router.push("/Login")
      }
    }
  }
};
</script>

<style></style>
