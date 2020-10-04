<template>
  <div>
    <!-- d-form-item 主要负责校验 -->
    <label v-if="label">{{ label }}</label>
    <!-- 用来放表单控件 -->
    <slot></slot>
    <div class="error">{{ error }}</div>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  inject: ["form"],
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
}
</style>
