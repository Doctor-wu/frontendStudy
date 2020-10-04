<template>
  <div>
    <!-- 
            d-input主要负责双向数据绑定和input控件的属性
      -->
    <input :type="type" :value="value" @input="inputMethod" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  name: "DInput",
  inheritAttrs: false, // 设置为false，避免把$attrs设置到父组件上
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: String,
    default: "",
  },
  methods: {
    inputMethod(e) {
      // 此处是将input的值抛给dinput处理
      this.$emit("input", e.target.value);

      // 让form-item组件校验, form-item不一定就是input的父级，这里先简单写
      this.$parent.$emit("validate");
    },
  },
};
</script>

<style lang="scss" scoped></style>
