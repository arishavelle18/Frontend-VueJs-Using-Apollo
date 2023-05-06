
<template>
 
    <Nav />
      <div class="container">
        <div class="auth-wrapper">
          <div class="auth-inner">
              <!-- <Login /> -->
              <RouterView />
          </div>
        </div>  
    </div>
  
 
</template>

<script>

import Nav from './components/Nav.vue';
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    Nav,
  },
}
</script>




<style scoped>

</style>
