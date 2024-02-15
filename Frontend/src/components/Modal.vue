<template>
  <div v-if="modalOpen" class="modal">
    <div class="modal-content">
      <slot></slot>

      <button class="modal-close" @click="modalOpen = !modalOpen">x</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';


const modalOpen = defineModel({ type: Boolean, default: false })
watch(modalOpen, (val) => {
  if (val) {
    document.body.classList.add('modal-open')

  } else {
    document.body.classList.remove('modal-open')
  }
})
// const modalOpen = ref(false)
</script>

<style scoped>
.modal {
  /* display: none; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  z-index: 1;
}

.modal .modal-content {
  position: absolute;
  overflow: auto;

  background-color: #fefefe;
  /* margin: 15% auto; */
  /* margin-inline: auto;
  margin-block: 10%; */

  inset: 9rem;
  padding: 30px;
  border: 1px solid #888;
  /* width: 80%; */
}


.modal-content .modal-close {
  position: absolute;
  top: 3px;
  right: 3px;
  cursor: pointer;
}
</style>
