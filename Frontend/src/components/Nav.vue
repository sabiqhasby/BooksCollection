<template>
  <nav class="nav">
    <div class="nav-logo">Books Collection</div>
    <div class="nav-link">
      Login / Register
    </div>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  padding-inline: 1rem;
  justify-content: space-between;
  align-items: center;
  background-color: inherit;
  border-bottom: 1px solid rgba(22, 22, 22, 0.548);
  /* box-shadow: 0 2px 5px black; */
  /* background-color: antiquewhite; */
}

.nav .nav-logo {
  font-size: 25px;
  font-weight: 700;
}

.nav .nav-link {
  justify-items: center;
  /* background-color: aquamarine; */
  font-size: small;
}

.nav .nav-link:hover {
  color: rgb(18, 138, 175);
  cursor: pointer;
}
</style>