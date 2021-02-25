<template>
  <div style="text-align: left">
    <!-- 
            d-input主要负责双向数据绑定和input控件的属性
      -->
    <input class="d-input__controller" :type="type" :value="value" @input="inputMethod" v-bind="$attrs" />
  </div>
</template>

<script>
import emitter from "@/mixins/emitter";
export default {
  name: "DInput",
  mixins: [emitter],
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
      this.dispatch("DFormItem", "validate");
    },
  },
};
</script>

<style lang="scss" scoped>
  .d-input__controller{
      min-width: 120px;
      width: 100%;
      box-sizing: border-box;
      padding: 5px;
      outline: 1px solid #eee;
  }
  .error-class{
      .d-input__controller{
        border: 1px solid red;
      }
  }
</style>
