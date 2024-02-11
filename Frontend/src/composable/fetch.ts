import { ref } from "vue";

export function useFetch(url: any) {
  const data = ref(null);
  const error = ref(null);

  fetch(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
    mode: "no-cors",
  })
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
