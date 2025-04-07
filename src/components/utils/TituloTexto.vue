<template>
  <div>
    <p>{{ titulo }}</p>
    <h3>{{ texto }}</h3>
  </div>
</template>
<script>
export default {
  name: 'TituloTexto',
  props: {
    titulo: String,
    texto: String
  }
}
</script>
<style scoped>
div {
  text-align: start;
  margin: 20px 0;
}

p {
  color: #a2a2a2;
  font-size: 14px;
}

h3 {
  margin: 10px 0;
  font-size: 16px;
}
</style>
