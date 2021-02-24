<template>
  <div>
    <!-- DForm 持有数据和校验规则 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DForm",
  componentName: "DForm",
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      default: (_) => {},
    },
  },
  created() {
    // 一被创建出来就开始监听是否有form-item注册
    this.fields = [];
    this.$on("doctorwu.form.field", (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
  },
  methods: {
    validate(cb) {
      const tasks = this.fields.map((child) => child.validate());

      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
