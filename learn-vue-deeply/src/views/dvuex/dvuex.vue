<template>
  <div>
    实现自己的vuex
    <p @click="add(1)">value:{{ $store.state.value }}</p>
    <p @click="asyncAdd(1)">async value:{{ $store.state.value }}</p>
    <p>doubleValue:{{ $store.getters.doubleValue }}</p>
  </div>
</template>

<script>
export default {
  methods: {
    add(num) {
      this.$store.commit("UPDATE_VALUE", num);
    },
    asyncAdd(num) {
        this.$store.dispatch("update_value", num);
    },
  },
};
</script>

<style lang="scss" scoped></style>
