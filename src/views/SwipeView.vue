<template>
    <div class="container">
        <h1>Finding a Partner</h1>
        <div>
            <div v-if="prospect[0] && (prospect[0].femaleUsers || prospect[0].maleUsers)" v-for="user in (prospect[0].femaleUsers || prospect[0].maleUsers)" :key="user.id">
                <div class="container mb-3">
                    <img :src="JSON.parse(user.images)[0]" alt="" width="200" height="200">
                </div>
                <div class="container mb-3">
                    <div class="container">
                        <strong> Name: </strong>{{ capitalize(user.firstName) }} {{ capitalize(user.lastName)}}
                    </div>
                    <div class="container">
                        <strong> Location: </strong>{{ capitalize(user.country) }} {{ capitalize(user.region) }} {{ capitalize(user.city) }}
                    </div>
                    <div class="container">
                        <strong> School: </strong>{{ capitalize(user.school) }}
                    </div>
                    <div class="container">
                        <strong> Bio: </strong> islip islip tulog tulog lang
                    </div>
                </div>
                <div class="accordion accordion-flush mt-3 mb-3" id="accordionFlushExample">
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapseOne' + user.id" aria-expanded="false" aria-controls="flush-collapseOne">
                        Photo Gallery
                        </button>
                    </h2>
                    <div :id="'flush-collapseOne' + user.id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div class="container row g-4">
                                    <div class="card " v-for="img in JSON.parse(user.images)" style="width: 18rem;">
                                        <div class="card-body">
                                            <div>
                                                <img :src="img" alt="" width="200">
                                            </div>
                                        </div>
                                    </div>
                            </div>

                        </div>
                    </div>
                    </div>
                </div>
            
                <!-- <button class="btn btn-success m-3" @click="HandleLike(user.id)">Like</button> -->
                <a href="/"  @click="HandleLike(user.id)" class="btn btn-success m-3">Like</a>
                <a href="/"  @click="HandleDislike(user.id)" class="btn btn-danger m-3">Dislike</a>
                <!-- <button class="btn btn-danger m-3" @click="HandleDislike(user.id)">Dislike</button> -->
            </div>
        </div>
    </div>
</template>

<script>
 import gql from 'graphql-tag';
 import {ref,watch,onMounted} from 'vue';
 import {RouterView, RouterLink } from 'vue-router'
 import { useQuery,useMutation } from '@vue/apollo-composable'
 import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
 import 'swiper/swiper-bundle.css'

    // get the user gender interest
 const GET_MALE_GENDER_INTEREST = gql`
        query MaleUsers($id:ID!,$genderInterest:Boolean!) {
          maleUsers(id:$id,genderInterestedIn:$genderInterest) {
          id
          email
          firstName
          lastName
          country
          region
          city
          school
          genderInterest
          images
        }
      }
    `;
     
    // get the user gender interest
    const GET_FEMALE_GENDER_INTEREST = gql`
        query FemaleUsers($id:ID!,$genderInterest:Boolean!) {
          femaleUsers(id:$id,genderInterestedIn:$genderInterest) {
          id
          email
          firstName
          lastName
          country
          city
          region
          school
          genderInterest
          images
        }
      }
    `;


    const CREATE_LIKE = gql`
    mutation CreateLike(
        $swipedUserId:Int!,
        $swipedById:Int!,
        $status:String!,
        $isMatch:Boolean!){
            createLike(input:{
                swipedUserId:$swipedUserId,
                swipedById:$swipedById,
                status:$status,
                isMatch:$isMatch
            }) {
                swipe{
                id
                status
                isMatch
                }
            }
        }
    `;

    const CREATE_DISLIKE = gql`
    mutation CreateDislike(
        $swipedUserId:Int!,
        $swipedById:Int!,
        $status:String!,
        $isMatch:Boolean!){
            createLike(input:{
                swipedUserId:$swipedUserId,
                swipedById:$swipedById,
                status:$status,
                isMatch:$isMatch
            }) {
                swipe{
                id
                status
                isMatch
                }
            }
        }
    `;
    export default{
        props:{
            user: {
                type: Object,
                required: true
            }
        },
        setup(props){

            console.log(props.user.gender,props.user.genderInterest)
            const prospect = ref([])
            const newUser=ref([])
            const {error,result,loading} = useQuery(props.user.genderInterest ? GET_FEMALE_GENDER_INTEREST: GET_MALE_GENDER_INTEREST,() => ({
                id: parseInt(props.user.id),
                genderInterest: Boolean(props.user.gender),
            }))
            const getMaleGenderInterest = async() => {
                await result.value;
                console.log("Query result is ready!")
            }
            console.log(props.user.genderInterest);
    
            getMaleGenderInterest();
            
            const capitalize = (str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
            console.log(error)


            watch(result, (newValue, oldValue) => {
                prospect.value = [...prospect.value, newValue];
            });

         
            const HandleLike = async(id) =>{
                // your acc id 
                let owner =  props.user.id
                let person =  id 
                console.log(owner,person)
                const {mutate} = useMutation(CREATE_LIKE,{
                    variables:{
                        swipedUserId:parseInt(person),
                        swipedById:parseInt(owner),
                        status:"like",
                        isMatch:false
                    }
                })
                const response = await mutate();
                // if(response.data.creatLike )
            }

            const HandleDislike = async(id) =>{
                // your acc id 
                let owner =  props.user.id
                let person =  id 
                console.log(owner,person)
                const {mutate} = useMutation(CREATE_DISLIKE,{
                    variables:{
                        swipedUserId:parseInt(person),
                        swipedById:parseInt(owner),
                        status:"dislike",
                        isMatch:false
                    }
                })
                const response = await mutate();
                // if(response.data.creatLike )
            }

            
            
            console.log(result)


            return{
                result,
                HandleLike,
                HandleDislike,
                capitalize,
                prospect,
                user:props.user
            }
        }
    }
   
</script>