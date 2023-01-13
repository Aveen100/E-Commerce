<template>
    <v-container fluid fill-height>
       <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
             <v-card class="elevation-15">
                <v-toolbar dark color="warning">
                   <v-toolbar-title >Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                      <v-text-field
                         prepend-icon="mdi-account"
                         name="login"
                         label="Username"
                         type="text" v-model="username"
                      ></v-text-field>
                      <v-text-field
                         id="password"
                         prepend-icon="mdi-lock"
                         name="password"
                         label="Password"
                         type="password" v-model="password"
                      ></v-text-field>
                </v-card-text>
                <!-- <h1>{{username}}</h1>
                <h1>{{password}}</h1> -->
                <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn color="warning" @click="Login">Login</v-btn>
                </v-card-actions>
             </v-card>
          </v-flex>
       </v-layout>
      </v-container>
    
</template>

<script>
export default {
    data(){
  return{
    username: '',
    password: '',
    cart: []
  }  
},
computed:{



},

methods: {
async Login() {
const auth= await fetch('https://dummyjson.com/auth/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({

username: this.username,
password: this.password
})


})
const getdata= await auth.json();
console.log(getdata.username)


if(getdata.message=='Invalid credentials')
alert("Enter Correct Credentials")
else
{
   console.log(getdata)
   localStorage.setItem("LoginData",JSON.stringify(getdata))

this.$router.push({name:'home'})
}
}

},
}

</script>

<style>

</style>
