import { ref } from "vue";

export function useFetch(url: any, method: string = "GET") {
  const data = ref([]);
  const error = ref(null);

  fetch(url, {
    method: method,
  })
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
