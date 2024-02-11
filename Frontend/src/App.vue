<template>
  {{ data }}
</template>


<script setup lang="ts">
// import { useFetch } from './composable/fetch'
import { ref } from 'vue';
const data = ref([])

//FETCHING DATA
fetch("http://localhost:3000/books", {
  method: "GET"
}).then((res) => res.json()).then(result => data.value = result);



// const { data } = useFetch('https://jsonplaceholder.typicode.com/posts')


</script>