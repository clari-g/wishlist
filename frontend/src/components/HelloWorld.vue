<template>
  <div>
    <div class="header">
      <div>
        <img alt="Logo" src="../assets/lista-de-deseos.png">
        <h1>Wishlist</h1>
      </div>

      <div class="inputArea">
        <h3>Ingresar URL</h3>

        <div>
          <b-input-group>
            <b-form-input v-model="url" v-on:keyup.enter="getInfo"></b-form-input>

            <b-input-group-append>
              <b-button v-on:click="getInfo">
                <b-icon icon="plus" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>

    <div class="itemList">
      <b-card v-for="(item, index) in items" :key="index" :img-src="item.image" img-alt="Card image" img-left class="mb-3" style="
    width: 47%;">
        <b-card-text>
          <div class="mb-3" v-show="!item.edit">{{ item.title }}</div>
          <b-form-input class="mb-3" v-show="item.edit" v-model="item.title"></b-form-input>
          <div class="buttons">
            <div class="b-left">
              <b-button v-on:click="deleteItem(index)">
                <b-icon icon="trash" />
              </b-button>
              <b-button v-on:click="editItem(index)">
                <b-icon icon="pencil" />
              </b-button>
            </div>
            <div class="b-right">
              <b-button v-on:click="openLink(item.url)">Comprar</b-button>
            </div>
          </div>           
        </b-card-text>
      </b-card>
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
            image: data.images[0],
            title: data.title,
            url: data.url,
            edit: false
          })
        })       
        .catch(error => {
          console.error(error);
        });
      }
    },

    editItem: function (id) {
      this.items[id].edit = !this.items[id].edit;
    },

    deleteItem: function (id) {
      this.items.splice(id, 1);
    },

    openLink: function (url) {
      window.open(url, "_blank");
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
.header {
  display: flex;
  align-items: baseline;
}
.header div {
  margin: 0 20px;
}
.inputArea {
  width: -webkit-fill-available;
}
.itemList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 30px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.b-left {
  width: 20%;
  display: flex;
  justify-content: space-between;
}
</style>
