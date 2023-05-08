<template>
    <form @submit.prevent="handleSubmit" >
        <h3>Sign Up</h3>
        
        <div class="form-group mb-3">
            <label for="">First Name</label>
            <input type="text" class="form-control" v-model="first_name" placeholder="First Name" required>
        </div>
        <div class="form-group mb-3">
            <label for="">Last Name</label>
            <input type="text" class="form-control" v-model="last_name" placeholder="Last Name" required>
        </div>
        <div class="form-group mb-3">
            <label for="">Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email Address" required>
        </div>
        <div class="form-group mb-3">
            <label for="">Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password" required>
        </div>
        <div class="form-group mb-3">
            <label for="">Confirm Password</label>
            <input type="password" class="form-control" v-model="password_confirm" placeholder="Confirm Password" required>
        </div>
        <div class="form-group mb-3">
            <label for="">Birthdate</label>
            <input type="date" class="form-control" v-model="birthdate"  :max="maxDate.toISOString().split('T')[0]" required>
        </div>
        <div class="form-group mb-3">
            <label for="">Gender </label>
            <select v-model="gender" class="form-control" required>
                <option value="0">Male</option>
                <option value="1">Female</option>
            </select>
        </div>
        <div class="form-group mb-3">
            <label for="">Gender Interest</label>
            <select v-model="gender_interest" class="form-control" required>
                <option value="0">Male</option>
                <option value="1">Female</option>
            </select>
        </div>
        <div class="form-group mb-3">
            <label for="">Country</label>
            <input type="text" class="form-control" v-model="country" placeholder="Country" required>
        </div>
        <div class="form-group mb-3">
            <label for="">Region</label>
            <input type="text" class="form-control" v-model="region" placeholder="Region" required>
        </div>
        <div class="form-group mb-3">
            <label for="">City</label>
            <input type="text" class="form-control" v-model="city" placeholder="City" required>
        </div>
        <div class="form-group mb-3">
            <label for="">School</label>
            <input type="text" class="form-control" v-model="school" placeholder="School" >
        </div>
          <div class="form-group mb-3">
            <label for="">Image</label>
            <button @click="openUploadWidget()" type="button">Upload</button>
            <div v-for="image in selectedFile" :key="image">
                <img :src="image" alt="user uploaded image" style="width: 150px;display: inline-block;">
            </div>
        </div>



        <button class="btn btn-primary btn-block" >Sign Up</button>
    </form>
  
</template>

<script>
import axios from 'axios';
import { useQuery,useMutation} from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, watchEffect,ref,onMounted} from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'




export default{
    setup(){
        const first_name = ref("");
        const last_name = ref("");
        const email = ref("");
        const password = ref("");
        const password_confirm = ref("");
        const birthdate = ref("")
        const gender = ref("")
        const gender_interest = ref("")
        const country = ref("")
        const region = ref("")
        const city = ref("")
        const school = ref(null)
        const selectedFile = ref([])
        let maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 17)

        // create a rounter
        const router = useRouter();

        const CREATE_USER = gql`
            mutation createUser(
                $first_name:String!,
                $last_name:String!,
                $email:String!,
                $password:String!,
                $password_confirm:String!
                $birthdate:ISO8601Date!,
                $gender:Boolean!,
                $gender_interest:Boolean!,
                $country:String!,
                $region:String!,
                $city:String!,
                $school:String,
                $images:[String!]
                ){

                createUser( input:{ 
                    firstName:$first_name,
                    lastName:$last_name,
                    email:$email,
                    password:$password,
                    passwordConfirmation:$password_confirm,
                    birthdate:$birthdate,
                    gender:$gender,
                    genderInterest:$gender_interest,
                    country:$country,
                    region:$region,
                    city:$city,
                    school:$school,
                    images:$images
                } ){
                    user{
                        id
                        firstName
                        lastName
                        email
                        gender
                        genderInterest
                        country
                        region
                        city
                        school
                        images
                        
                    }
                    errors
                }
            }
        `;

        const DELETE_USER = gql`
            mutation deleteUser($id:ID!){
                deleteUser(input:{id:$id}){
                    errors
                }
            }
        `;
        
        //delete image
        const DELETE_IMAGE = gql`
            mutation deleteImage($publicIds:String!){
                deleteImage(input:{publicIds:$publicIds}){
                    errors
                }
            }
        `;


            // form validation
        const handleSubmit = async() => {
            try{
                // create a user
                const { mutate } = useMutation(CREATE_USER,{
                    variables:{
                        first_name:first_name.value,
                        last_name:last_name.value,
                        email:email.value,
                        password:password.value,
                        password_confirm:password_confirm.value,
                        birthdate:birthdate.value,
                        gender:gender.value != 0 ? true : false,
                        gender_interest:gender_interest.value != 0 ? true : false,
                        country:country.value,
                        region:region.value,
                        city:city.value,
                        school:school.value,
                        images:JSON.stringify(selectedFile.value)
                        
                    }
                });
                const response = await mutate();
                console.log(response)
                // check if the image is lessthan 1  or image is greater than 5 and the user is not null
                if (response.data.createUser.user && (selectedFile.value.length < 1 || selectedFile.value.length > 5)) {
                    // delete the user
                    const { mutate } = useMutation(DELETE_USER,{
                        variables:{
                            id:response.data.createUser.user.id
                        }
                    });
                    if (selectedFile.value.length > 5) {
                        // delete the image
                        const { mutate } = useMutation(DELETE_IMAGE,{
                            variables:{
                                publicIds:JSON.stringify(selectedFile.value)
                            }
                        });
                        const deleteImageresponse = await mutate();
                    }
                    const userresponse = await mutate();
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: 'Please upload 1 to 5 images only',
                    })
                // RESET THE FORM
                    first_name.value = "";
                    last_name.value = "";
                    email.value = "";
                    password.value = "";
                    password_confirm.value = "";
                    birthdate.value = "";
                    gender.value = "";
                    gender_interest.value = "";
                    country.value = "";
                    region.value = "";
                    city.value = "";
                    school.value = null;
                    selectedFile.value = [];

                    return;
                }
                // check if the user is null
                if(response.data.createUser.user == null){

                    console.log(response.data.createUser.errors)
                    // Define an array of error messages
                    const errorMessages = response.data.createUser.errors;

                    // Create an empty string to store the concatenated error messages
                    let errorMessageString = '';

                    // Use a for loop to concatenate the error messages together
                    for (let i = 0; i < errorMessages.length; i++) {
                    const errorMessage = errorMessages[i];
                    errorMessageString += "	○ "+ errorMessage + '<br>';
                    }

                    // Display the concatenated error messages in a single Sweet Alert pop-up message with justified text and centered container
                    Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    html: '<div style="display: flex; align-items: center; justify-content: center;padding:20px;"><div style="text-align: justify;">' + errorMessageString + '</div></div>',
                    });


                    // RESET THE FORM
                    first_name.value = "";
                    last_name.value = "";
                    email.value = "";
                    password.value = "";
                    password_confirm.value = "";
                    birthdate.value = "";
                    gender.value = "";
                    gender_interest.value = "";
                    country.value = "";
                    region.value = "";
                    city.value = "";
                    school.value = null;
                    selectedFile.value = [];
                }
                else {
                    console.log("Registered Successfully")
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registered Successfully',
                        showConfirmButton: false,
                        timer: 1500
                        })

                    router.push({name:"login"})
                }

            }catch(error){
                console.error(error)
            }
            
        }
        
        const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dg2h1nksa",
            uploadPreset: "upload-demo",
            sources: ["local", "url", "camera", "image_search", "facebook", "instagram"],
        },
        (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("Done! Here is the image info: ", result.info);
                    selectedFile.value.push(result.info.secure_url);
                }
            }
        );

        // add upload widget
        const openUploadWidget = () => {
            widget.open();
        }
        
        onMounted(() => {
            const widgetOptions = {
                cloudName: "dg2h1nksa",
                uploadPreset: "upload-demo",
                sources: ["local", "url", "camera", "image_search", "facebook", "instagram"],
            };
            const cloudinaryWidget = window.cloudinary.createUploadWidget(widgetOptions,(error,result) => {
                if(!error && result && result.event === "success"){
                    selectedFile.value.push(result.info.secure_url);
                }
            });
            
            cloudinaryWidget.update({
                apiKey : "513771815157224",
                apiSecret : "scoicM7Z3mU0kKFKNVGljW6Ie28"
            })
            
        });


        return{
            openUploadWidget,
            handleSubmit,
            first_name,
            last_name,
            email,
            password,
            password_confirm,
            birthdate,
            gender,
            gender_interest,
            country,
            region,
            city,
            school,
            selectedFile,
            maxDate
        }

        
    }
}
</script>