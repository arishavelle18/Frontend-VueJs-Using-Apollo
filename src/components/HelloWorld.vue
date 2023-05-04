<template>
  <div>
    <ul>
      <li v-for="post in links" :key="post.id">
        <a :href="post.url">{{ post.description }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, watchEffect } from 'vue';

const ALL_LINKS_QUERY = gql`
  query {
    allLinks {
      id
      url
      description
    }
  }
`;

const { result, error } = useQuery(ALL_LINKS_QUERY);

if (error.value) {
  console.error(error.value);
}

const links = computed(() => result.value?.allLinks ?? []);

watchEffect(() => {
  console.log(links.value);
});
</script>

<style scoped>

</style>
