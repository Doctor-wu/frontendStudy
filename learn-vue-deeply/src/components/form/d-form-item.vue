<template>
  <div class="d-form-item__wrapper" :class="{'error-class': this.error}">
    <!-- d-form-item 主要负责校验 -->
    <div class="label-wrapper" :style="{color: this.error ? 'red' : 'inherit'}">
        <label v-if="label">{{ label }}</label>
    </div>
    <!-- 用来放表单控件 -->
    <slot></slot>
    <div class="error">{{ error }}</div>
  </div>
</template>

<script>
import Schema from "async-validator";
import emitter from "@/mixins/emitter";

export default {
  name: "DFormItem",
  componentName: "DFormItem",
  inject: ["form"],
  mixins: [emitter],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      error: "",
      valid: true,
    };
  },
  created() {
    if (this.prop) {
      this.dispatch("DForm", "doctorwu.form.field", [this]);
    }
  },
  mounted() {
    this.$on("validate", async function() {
      try {
        await this.validate();
      } catch (e) {}
    });
  },
  methods: {
    async validate() {
      // 获取规则
      const rule = this.form.rules[this.prop];
      // 获取值
      const value = this.form.model[this.prop];

      const schema = new Schema({ [this.prop]: rule });

      return schema.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
    text-align: left;
}
.label-wrapper{
    text-align: left;
}
.d-form-item__wrapper{
    margin: 10px 0;
}
</style>
