<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <RouterLink :to="{name:'login'}" class="nav-link" active-class="active">Date App</RouterLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
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
    export default {
        name: 'Nav',
        setup(){
            const router = useRouter();

            return{
                router
            }
        }
    }
</script>