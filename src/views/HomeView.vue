<template>
   <div>
    <div class="container">
      <h3 v-if="result && result.user">Hi, {{ result.user.email }} </h3>
      <div>
        <SwipeView />
      </div>
    </div> 
   

   </div>
 </template>
 
 <script>
 import gql from 'graphql-tag';
 import {ref,watch} from 'vue';
 import { useQuery } from '@vue/apollo-composable'
 import SwipeView from './SwipeView.vue';

 const User = gql`
   query User($id: ID!) {
     user(id: $id) {
       id
       email
       genderInterest
     }
   }
 `;

 
 
 export default {
   name: 'Home',
   components: {
    SwipeView
  },
   setup() {
     // Get the token from localStorage
     const token = JSON.parse(localStorage.getItem('token'))["token"];
    
     // Decode the JWT token to get the user ID
     let userId;
     if (token) {
       const base64Url = token.split('.')[1];
       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
       const decodedToken = JSON.parse(atob(base64));
       userId = decodedToken.user_id;
     }
    //  provideApolloClient(createApolloClient(token))


    const {error,loading,result} = useQuery(User,() => ({
        id: userId  
    }))

    const getUser = async() => {
      await result.value;
      console.log("Query result is ready!")
      // additional operations here
    }

    getUser();

     return {
      result,
     };
   },
 };
</script> 