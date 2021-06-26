<template>
  <div class="hello">
    <h1>Wishlist</h1>
    <p>
      lorem ipsum dolor sit    
    </p>

    <h3>Ingresar URL</h3>

    <input v-model="url" v-on:keyup.enter="getInfo">
    <button v-on:click="getInfo">+</button>

    <div class="itemList">
      <div v-for="(item, index) in items" :key="item.id">
        {{ item.title }} <button v-on:click="deleteItem(index)">-</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
          url: "",
          items: []
        }),

  methods: {
    getInfo: function () {
      if (this.url) {
        fetch("http://localhost:3000/getSiteMeta?site=" + this.url)
        .then(async response => {
          const data = await response.json();

          if (!response.ok) {
            const error = data;
            return Promise.reject(error);
          }
          
          this.url = "",
          this.items.push({
            favicon: data.favicons[0],
            images: data.images[0],
            title: data.title,
            url: data.url
          })
        })       
        .catch(error => {
          console.error(error);
        });
      }
    },

    deleteItem: function (id) {
      this.items.splice(id, 1);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 20px 0;
}
a {
  color: #42b983;
}
.itemList {
  margin-top:20px;
}
</style>
