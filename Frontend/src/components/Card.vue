<template>
  <div class="card">
    <div class="card-item" v-for="book in booksData" @click="selectedCard(book)">
      <p class="category">#{{ book.category_id }}</p>
      <p class="label">title:</p>
      <p class="title">{{ book.title }}</p>
      <hr />
      <p class="label">description:</p>
      <p class="sub-item">{{ book.description }}</p>

      <p class="year">{{ book.release_year }}</p>
      <!-- <p class="label">release:</p>
      <p class="sub-item">{{ book.release_year }}</p>
      <p class="label">total page:</p>
      <p class="sub-item">{{ book.total_page }} pages</p>
      <p class="label">price:</p>
      <p class="sub-item price">Rp {{ book.price }}</p> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
import { Books } from '../type/books';
import { useBookStore } from '../store/booksStore.ts'
import { storeToRefs } from 'pinia'

defineProps<{
  booksData: Books[]
}>()

const emit = defineEmits(["modalOpen"])

const booksStore = useBookStore()
const { book, selectedBookId } = storeToRefs(booksStore)
function selectedCard(data: any) {
  booksStore.modalType = "edit"
  emit("modalOpen", true)
  selectedBookId.value = data.id
  book.value.title = data.title
  book.value.description = data.description
  book.value.price = data.price
  book.value.image_url = data.image_url
  book.value.total_page = data.total_page
  book.value.release_year = data.release_year
  book.value.category_id = data.category_id
}

</script>

<style scoped>
.card {

  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: auto;
  gap: 1rem;
}


.card-item {
  position: relative;
  /* height: 100px; */
  background: linear-gradient(-45deg, rgb(14, 114, 160) 15%, rgb(48, 60, 75) 15%);
  border: 1px solid gray;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 3px 5px rgb(32, 31, 31);
}

.card-item:hover {
  background: linear-gradient(-45deg, rgb(14, 114, 160) 15%, rgb(48, 66, 87) 15%);
}

.card-item .label {
  font-size: small;

}

.card-item .title {
  margin-top: -15px;
  margin-bottom: -5px;
  font-size: x-large;
  font-weight: 600;
}

.card-item .price {
  font-weight: 600;
}


.card-item .category {
  position: absolute;
  right: 8px;
  top: -10px;
}

.card-item .sub-item {
  margin-top: -15px;
}

.card-item .year {
  position: absolute;
  right: 8px;
  bottom: -10px;
  font-weight: 600;
  color: rgb(43, 220, 226);
}
</style>
