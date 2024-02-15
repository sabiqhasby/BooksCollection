<template>
  <Form @submit="submitData" :validation-schema="schema" class="form">
    <label for="title">Title</label>
    <Field v-model:model-value="addData.title" name="title" rules="required" />
    <ErrorMessage class="alert-field" name="title" />

    <label for="description">Description</label>
    <Field as="textarea" v-model:model-value="addData.description" class="description" name="description" />
    <ErrorMessage class="alert-field" name="description" />

    <label for="release_year">Release</label>
    <Field v-model:model-value="addData.release_year" name="release_year" />
    <ErrorMessage class="alert-field" name="release_year" />

    <label for="price">Price</label>
    <Field v-model:model-value="addData.price" name="price" />
    <ErrorMessage class="alert-field" name="price" />

    <label for="total_page">Total Page</label>
    <Field v-model:model-value="addData.total_page" name="total_page" />
    <ErrorMessage class="alert-field" name="total_page" />

    <label for="image_url">Image Url</label>
    <Field v-model:model-value="addData.image_url" name="image_url" />
    <ErrorMessage class="alert-field" name="image_url" />

    <label for="category_id">Category</label>
    <Field v-model:model-value="bookStore.book.category_id" as="select" name="category_id">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </Field>
    <ErrorMessage class="alert-field" name="category_id" />

    <div class="button-group">
      <button type="submit" class="btn submit">Submit</button>

      <button v-if="bookStore.modalType === 'edit'" @click.prevent="deleteData" class="btn delete">Delete</button>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
import { useBookStore } from '../store/booksStore.ts'
// import { Books } from '../type/books';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
defineProps<{
  addData: any
}>()
const bookStore = useBookStore()


const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  release_year: yup.string().required(),
  price: yup.string().required(),
  total_page: yup.number().required(),
  image_url: yup.string().required(),
  category_id: yup.number().required(),
})


const emit = defineEmits(["submitData", "deleteData"])




function submitData(values: any) {

  console.log(values);
  if (values) {

    if (bookStore.modalType === "create") {
      emit("submitData", 'create')
    }

    if (bookStore.modalType === "edit") {
      emit("submitData", 'edit')
    }
  }

}

function deleteData() {
  emit("deleteData")
}
</script>


<style  scoped>
.alert-field {
  font-size: small;
  color: red;
}

.button-group {
  display: flex;
  gap: 5px;
}

.btn {
  padding-inline: 10px;
  padding-block: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 90px;
  font-family: inherit;
  margin-top: 10px;

}

.btn.submit {
  background-color: rgb(54, 47, 47);
}

.btn.delete {
  background-color: red;
}

.btn:hover {
  background-color: #252323;
}

.btn.btn.delete:hover {
  background-color: #ff3838;
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
  font-family: inherit;
}

input,
select,
textarea {
  height: 40px;
  padding-inline: 15px;
  padding-block: 5px;
  background-color: rgb(216, 225, 228);
  border-radius: 5px;
  border: none;
  color: rgb(46, 43, 43);
  font-size: medium;
  font-family: inherit;
}


.description {
  font-family: inherit;
  resize: none;
  height: 50px;
}
</style>
