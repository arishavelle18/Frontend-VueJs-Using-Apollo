<template>
    <div class="container">
        <h1>SwipeView</h1>
        <div v-if="result && result.femaleUsers" v-for="user in result['femaleUsers']" :key="user.id">
            Email:{{ user.email  }}
            <div v-for="img in JSON.parse(user.images)">
                <img :src="img" alt="" width="200">
            </div>
            <button>Like</button>
            <button>Dislike</button>
        </div>
       
    </div>
</template>

<script>
 import gql from 'graphql-tag';
 import {ref,watch} from 'vue';
 import { useQuery } from '@vue/apollo-composable'
    // get the user gender interest
 const GET_MALE_GENDER_INTEREST = gql`
        query MaleUsers {
          maleUsers {
          id
          email
          genderInterest
          images
        }
      }
    `;
     
    // get the user gender interest
    const GET_FEMALE_GENDER_INTEREST = gql`
        query FemaleUsers {
          femaleUsers {
          id
          email
          genderInterest
          images
        }
      }
    `;

    export default{
        setup(){
            const {error,result,loading} = useQuery(GET_FEMALE_GENDER_INTEREST)
            const getMaleGenderInterest = async() => {
                await result.value;
                console.log("Query result is ready!")
                // additional operations here
            }

            getMaleGenderInterest();
            console.log(result)
            return{
                result
            }
        }
    }
   
</script>