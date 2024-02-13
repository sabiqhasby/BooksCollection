<template>
  <form class="form">
    <label for="title">Title</label>
    <input v-model="addData.title" type="text" name="title" id="title">
    <label for="description">Description</label>
    <textarea v-model="addData.description" name="description" id="description" />
    <label for="release_year">Release</label>
    <input v-model="addData.release_year" type="text" name="release_year" id="release_year">
    <label for="price">Price</label>
    <input v-model="addData.price" type="text" name="price" id="price">
    <label for="total_page">Total Page</label>
    <input v-model="addData.total_page" type="text" name="total_page" id="total_page">
    <label for="image_url">Image Url</label>
    <input v-model="addData.image_url" type="text" name="image_url" id="image_url">
    <label for="category_id">Category</label>
    <input v-model="addData.category_id" type="text" name="category_id" id="category_id">
    <button @click.prevent="submitData" class="btn-submit">Submit</button>
  </form>
</template>

<script lang="ts" setup>
import { useBookStore } from '../store/booksStore.ts'
// import { Books } from '../type/books';


defineProps<{
  addData: any
}>()
const bookStore = useBookStore()

const emit = defineEmits(["submitData"])

function submitData() {
  if (bookStore.modalType === "create") {
    emit("submitData", 'create')
  }

  if (bookStore.modalType === "edit") {
    emit("submitData", 'edit')
  }

}
</script>


<style  scoped>
.btn-submit {
  padding-inline: 10px;
  padding-block: 14px;
  background-color: #413c3c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 90px;

}

.btn-submit:hover {
  background-color: #252323;
}



.form {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  /* margin-bottom: 15px; */
}

label {
  color: black;
  font-size: small;
}

input,
textarea {
  padding: 10px;
  background-color: rgb(183, 193, 196);
  border-radius: 5px;
  border: none;
  color: rgb(46, 43, 43);
  font-family: inherit;
}

textarea {
  resize: vertical;
}
</style>
