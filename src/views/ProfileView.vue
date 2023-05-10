<template>
    <div v-if="result" class="container mt-3 mb-3">
        <h1 v-if="result && result.user">Hi, {{ result.user.email }} </h1>
        <div class="container">
            <div v-if="result && result.user">
                <div class="container mb-3">
                    <img :src="JSON.parse(result.user.images)[0]" alt="" width="200" height="200">
                </div>
                <div class="container mb-3">
                    <div class="container">
                        <strong> Name: </strong>{{ capitalize(result.user.firstName) }} {{ capitalize(result.user.lastName)}}
                    </div>
                    <div class="container">
                        <strong> Location: </strong>{{ capitalize(result.user.country) }} {{ capitalize(result.user.region) }} {{ capitalize(result.user.city) }}
                    </div>
                    <div class="container">
                        <strong> School: </strong>{{ capitalize(result.user.school) }}
                    </div>
                    <div class="container">
                        <strong> Bio: </strong> islip islip tulog tulog lang
                    </div>
                </div>
                <div class="accordion accordion-flush mt-3 mb-3" id="accordionFlushExample">
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapseOne' + result.user.id" aria-expanded="false" aria-controls="flush-collapseOne">
                        Photo Gallery
                        </button>
                    </h2>
                    <div :id="'flush-collapseOne' + result.user.id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div class="container row g-4">
                                    <div class="card " v-for="img in JSON.parse(result.user.images)" style="width: 18rem;">
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
            
                <!-- <button class="btn btn-success m-3" @click="HandleLike(result.user.id)">Like</button> -->
                <!-- <a href="/"  @click="HandleLike(result.user.id)" class="btn btn-success m-3">Edit Profile</a> -->
                <RouterLink :to="{'name':'edit-profile'}" class="btn btn-info"> Edit Profile</RouterLink>
                <!-- <button class="btn btn-danger m-3" @click="HandleDislike(result.user.id)">Dislike</button> -->
            </div>
        </div>
    </div>
</template>
<script>
 import gql from 'graphql-tag';
 import { useQuery } from '@vue/apollo-composable'
 import { RouterLink } from 'vue-router';
     const user = gql`
        query user($id: ID!) {
            user(id: $id) {
            id
            email
            gender
            firstName,
            lastName,
            email,
            birthdate,
            gender,
            genderInterest,
            country,
            region,
            city,
            school,
            images,
            swipesGiven {
                id,
                isMatch,
                swipedUserId,
                swipedById,
                status, 
                }
            }
        }
        `;
       


    export default {
        name: 'Profile',
        setup() {
            const token = JSON.parse(localStorage.getItem('token'))["token"];

            let userId;

            // check if token exists
            if (token) {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const decodedToken = JSON.parse(atob(base64));
                userId = decodedToken.user_id;
            
            }

            // adad result.user query
            const {error,loading,result} = useQuery(user,() => ({
                id: userId  
            }))

            // get the result.user data async
            const getUser = async() => {
                await result.value;
                console.log("Query result is ready!")
                // additional operations here
            }

            getUser();

            const capitalize = (str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
            
            return {
                result,
                getUser,
                capitalize
            }
        }
    }
</script>