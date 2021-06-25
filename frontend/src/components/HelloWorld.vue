<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      {{ text }}      
    </p>
    <input v-model="text">
    <h3>Ingresar URL</h3>
    <input >
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    text: String,
  }
}
// TODO: Agregar metodos
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 20px 0;
}
a {
  color: #42b983;
}
</style>
