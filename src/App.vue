<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, watchEffect } from 'vue';

const ALL_LINKS_QUERY = gql`
  {
    users {
      id
      name
      email
      books{
        id
        title
      }
      booksCount
    }
  }
`;

const {result} = useQuery(ALL_LINKS_QUERY)
const links = computed(() => result.value?.users ?? [])
watchEffect(() => {
  console.log(links.value);
});


</script>

<template>
   <div>
    <ul>
      <li v-for="link in links" :key="link.id">
        {{ link.name }} - {{ link.email }}
        <ul>
          <li v-for="book in link.books" :key="book.id">
            {{ book.title }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
