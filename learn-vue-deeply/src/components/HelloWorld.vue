<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul class="menu">
      <li v-for="menu in getMenus" :key="menu.path">
        <router-link :to="menu.path">
          {{ menu.name || "忘记写路由名字了" }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "@/store/index";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    getMenus() {
      return store.getters.getMenus;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  text-decoration: none;
  font-size: 18px;
  padding: 10px ;
}

.menu {
  display: flex;
  flex-direction: column;
  justify-items: start;
}
</style>
