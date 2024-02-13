<template>
  <Nav />
  <div>
    <button @click="btnAdd" class="button">+ Add New Data Books</button>
    <Card :booksData="booksData" @modalOpen="modalOpen" />
  </div>

  <Modal v-model.modalOpen="active">
    <FormInput :addData="book" @submitData="submitData" />
  </Modal>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
// import { Books } from './type/books';
import Card from './components/Card.vue'
import Nav from './components/Nav.vue'
import Modal from './components/Modal.vue'
import FormInput from './components/FormInput.vue'
import { useFetch } from './composable/fetch'
import { useBookStore } from './store/booksStore.ts'
import { storeToRefs } from 'pinia'


// const { data } = useFetch("http://localhost:3000/books", "GET")

// const booksData = ref(data) as Ref<Books[] | undefined>;
// const booksData = ref<Books[]>([])
const booksStore = useBookStore()
const { book, selectedBookId, modalType } = storeToRefs(booksStore)


const active = ref(false)
function modalOpen(x: boolean) {
  active.value = x
}
const addData = book

function btnAdd() {
  active.value = !active.value
  booksStore.modalType = "create"
}
//FETCHING DATA

// fetch("http://localhost:3000/books", {
//   method: "GET"
// }).then(res => res.json()).then((result) => {
//   booksData.value = result.payload;

// })

const { data: booksData, refresh } = useFetch('http://localhost:3000/books', "GET")
// console.log(booksData.value);


function reset() {
  booksStore.reset()
}
async function submitData() {

  let body = {
    ...addData,
    category_id: addData.value.category_id,
    description: addData.value.description,
    image_url: addData.value.image_url,
    price: addData.value.price,
    release_year: addData.value.release_year,
    title: addData.value.title,
    total_page: addData.value.total_page

  }

  if (modalType.value === "create") {
    await fetch("http://localhost:3000/books", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(body) })
    reset()
    active.value = false
    refresh()
  }
  if (modalType.value === "edit") {
    await fetch(`http://localhost:3000/books/${selectedBookId.value}`, { headers: { "Content-Type": "application/json" }, method: "PATCH", body: JSON.stringify(body) })
    reset()
    active.value = false
    refresh()
  }

}

watch(active, (val) => {
  if (!val) {
    reset()
  }
})

</script>


<style scoped>
.button {
  margin-top: 1rem;
  margin-bottom: .5rem;
  padding-inline: 8px;
  padding-block: 5px;
}
</style>
