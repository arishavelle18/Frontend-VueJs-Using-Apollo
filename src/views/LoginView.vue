<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <div class="form-group mb-3">
           <label for="">Email</label>
           <input type="email" v-model="email" class="form-control" placeholder="Email" /> 
        </div>
        <div class="form-group mb-3">
            <label for="">Password</label>
            <input type="password" v-model="password" class="form-control" placeholder="Password" />
        </div>
        
        <button class="btn btn-primary btn-block">Login</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import {gql} from 'graphql-tag';
import {useMutation} from '@vue/apollo-composable';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const SIGN_IN_USER = gql`
            mutation SignInUser($email: String!, $password: String!) {
                signInUser(input:{email: $email, password: $password}) {
                    token
                    errors
                    success
                }
            }
        `;

export default {
    name: 'Login',
    setup()
    {
        const email = ref('');
        const password = ref('');
        const router = useRouter();
        

        // create a function to handle the form submission
        const handleSubmit = async() => {
            // first we need to make sure that the user has entered a valid email address
            const {mutate} = useMutation(SIGN_IN_USER,{
                variables:{
                    email: email.value,
                    password: password.value
                }
            })
            // if the email is not valid, we will show an alert message
            const response = await mutate();
            // check if the user has entered a valid email address
            if(response.data.signInUser.errors.lenght > 0 || response.data.signInUser.token == null){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Incorrect username and password',
                    footer: response.data.signInUser.errors[0].message
                })
            }
            else{
                // add the token to the local storage 
                console.log(response.data.signInUser.token)
                localStorage.setItem("token",JSON.stringify({"token":response.data.signInUser.token}));
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'You are logged in!',
                })
                console.log(response.data.signInUser)
                router.push({name: 'home'});
            }
        }
        return {
            handleSubmit,
            email,
            password
        }
    }
    
}
</script>