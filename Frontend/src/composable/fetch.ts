import { ref } from "vue";

export function useFetch(url: any, method: string = "GET") {
  const data = ref([]);
  const error = ref(null);

  const fetchData = () => {
    fetch(url, {
      method: method,
    })
      .then((res) => res.json())
      .then((json) => (data.value = json.payload))
      .catch((err) => (error.value = err));
  };

  fetchData();

  const refresh = () => {
    fetchData();
  };

  return { data, error, refresh };
}
