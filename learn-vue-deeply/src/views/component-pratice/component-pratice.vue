<template>
  <div>
    <h3>组件实践练习</h3>
    <d-form :model="userInfo" :rules="rules" ref="dform">
      <d-form-item label="用户名: " prop="username">
        <d-input v-model="userInfo.username" type="text" placeholder="用户名" />
      </d-form-item>

      <d-form-item label="密码: " prop="password">
        <d-input
          v-model="userInfo.password"
          type="password"
          placeholder="密码"
        />
      </d-form-item>
      <d-form-item>
        <button @click="login">登录</button>
      </d-form-item>
    </d-form>
  </div>
</template>

<script>
import DInput from "@/components/form/d-input";
import DFormItem from "@/components/form/d-form-item";
import DForm from "@/components/form/d-form";
import Notice from "@/components/Notice.vue";
export default {
  components: {
    DInput,
    DFormItem,
    DForm,
    Notice
  },
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名名称" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs["dform"].validate((valid) => {
        const notice = this.$create(Notice, {
          title: "Doctorwu提醒您",
          message: valid ? "登录成功" : "校验失败",
          duration: 3000,
        });
        notice.show();
        // if (valid) {
        //   alert("submit!");
        // }
      });
    },
  },
};
</script>

<style></style>
