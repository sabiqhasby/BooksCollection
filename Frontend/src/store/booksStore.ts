import { defineStore } from "pinia";
import { ref, reactive } from "vue";

type modalType = "create" | "edit" | null;

export const useBookStore = defineStore("booksStore", () => {
  const book = reactive({
    title: null,
    description: null,
    image_url: null,
    release_year: null,
    price: null,
    total_page: null,
    category_id: null,
  });

  function reset() {
    book.title = null;
    book.description = null;
    book.image_url = null;
    book.release_year = null;
    book.price = null;
    book.total_page = null;
    book.category_id = null;
    modalType.value = null;
  }

  const selectedBookId = ref(0);

  const modalType = ref<modalType>(null); // create or edit

  return { selectedBookId, book, reset, modalType };
});
