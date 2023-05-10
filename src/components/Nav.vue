<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <RouterLink :to="{name:'login'}" class="nav-link" active-class="active">Date App</RouterLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul  v-if="isLoggedIn" class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li>
                <RouterLink :to="{name:'message'}" class="nav-link" active-class="active">Message</RouterLink>
              </li>
              <li>
                <RouterLink :to="{name:'profile'}" class="nav-link" active-class="active">Profile</RouterLink>
              </li>
              <li>
                <a href="/" class="nav-link">Home</a>
              </li>
              <li class="nav-item">
                <button class="btn btn-outline-prima  ry" @click="onLogout">Logout</button>
              </li>
            </ul>
            <ul v-else class="navbar-nav me-auto mb-2 mb-lg-0">
              <li  class="nav-item">
                <RouterLink :to="{name:'login'}" class="nav-link" active-class="active">Login</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink :to="{name:'register'}" class="nav-link" active-class="active">Sign Up</RouterLink>
              </li>
              
            </ul>
            
          </div>
        </div>
      </nav>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import {ref,watchEffect,computed} from 'vue';
    export default {
        name: 'Nav',
        setup() {
        const token = ref(localStorage.getItem('token')) || null;
        const router = useRouter();

          
        const isLoggedIn = computed(() => {
          return token.value !== null;
        });

        watchEffect(() => {
          isLoggedIn.value = token.value !== null;
        });


        const onLogout = () => {
          localStorage.removeItem('token');
          token.value = null;
          router.push({name:'login'});
        };

        return {
          router,
          onLogout,
          isLoggedIn,
        };
      }

    }
</script>