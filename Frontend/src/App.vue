<template>
  <div>
    <div v-for="book in booksData">
      <p>{{ book.title }}</p>
      <p>{{ book.price }}</p>
    </div>
  </div>
  <!-- {{ booksData }} -->
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { Books } from './type/books';
// import { useFetch } from './composable/fetch'

// const { data } = useFetch("http://localhost:3000/books", "GET")

// const booksData = ref(data) as Ref<Books[] | undefined>;
const booksData = ref<Books[]>([])

//FETCHING DATA

fetch("http://localhost:3000/books", {
  method: "GET"
}).then(res => res.json()).then((result) => {
  booksData.value = result.payload;

})




</script>