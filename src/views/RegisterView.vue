<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign Up</h3>

        <div class="form-group mb-3">
            <label for="">First Name</label>
            <input type="text" class="form-control" v-model="first_name" placeholder="First Name">
        </div>
        <div class="form-group mb-3">
            <label for="">Last Name</label>
            <input type="text" class="form-control" v-model="last_name" placeholder="Last Name">
        </div>
        <div class="form-group mb-3">
            <label for="">Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email Address">
        </div>
        <div class="form-group mb-3">
            <label for="">Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password">
        </div>
        <div class="form-group mb-3">
            <label for="">Confirm Password</label>
            <input type="password" class="form-control" v-model="password_confirm" placeholder="Confirm Password">
        </div>

        <button class="btn btn-primary btn-block">Sign Up</button>
    </form>
</template>

<script>
import axios from 'axios';
import { useQuery,useMutation} from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, watchEffect,ref} from 'vue';
import { useRouter } from 'vue-router';

export default{
    setup(){
        const first_name = ref("");
        const last_name = ref("");
        const email = ref("");
        const password = ref("");
        const password_confirm = ref("");

        // create a rounter
        const router = useRouter();

        const CREATE_USER = gql`
            mutation createUser($first_name:String!,$last_name:String!,$email:String!,$password:String!,$password_confirm:String!){
                createUser( input:{ firstName:$first_name,lastName:$last_name,email:$email,password:$password,passwordConfirmation:$password_confirm} ){
                    user{
                        id
                    }
                    errors
                }
            }
        `;

        const handleSubmit = async() => {
            try{
                const { mutate } = useMutation(CREATE_USER,{
                    variables:{
                        first_name:first_name.value,
                        last_name:last_name.value,
                        email:email.value,
                        password:password.value,
                        password_confirm:password_confirm.value,
                    }
                });
                const response = await mutate();
                // check if the user is null
                if(response.data.createUser.user == null){
                    console.log(response.data.createUser.errors)
                    first_name.value = "";
                    last_name.value = "";
                    email.value = "";
                    password.value = "";
                    password_confirm.value = "";
                }
                else {
                    console.log("Registered Successfully")
                    router.push({name:"login"})
                }

            }catch(error){
                console.error(error)
            }
            
        }

        return{
            handleSubmit,
            first_name,
            last_name,
            email,
            password,
            password_confirm,
        }

        
    }
}
</script>