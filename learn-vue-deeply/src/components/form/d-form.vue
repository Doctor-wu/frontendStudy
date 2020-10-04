<template>
  <div>
    <!-- DForm 持有数据和校验规则 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
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
  methods: {
    validate(cb) {
      const tasks = this.$children
        .filter((child) => child.prop) // 过滤掉没有prop的孩子
        .map((child) => child.validate());

      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style lang="scss" scoped></style>
