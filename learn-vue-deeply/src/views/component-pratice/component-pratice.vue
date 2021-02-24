<template>
  <div>
    <h3>组件实践练习</h3>
    <d-form class="d-form" :model="userInfo" :rules="rules" ref="dform">
      <d-form-item label="用户名: " prop="username">
        <d-input
            v-model="userInfo.username"
            type="text"
            placeholder="用户名" 
            style="width:100%"
          />
      </d-form-item>

      <d-form-item label="密码: " prop="password">
        <d-input
          v-model="userInfo.password"
          type="password"
          placeholder="密码"
          style="width:100%"
        />
      </d-form-item>
      <d-form-item>
        <button style="display:block;width:100%;margin:auto;padding:5px 0" @click="login">登录</button>
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
          message: valid ?  (h)=> h('p', null, [
            h('span', null, '恭喜你 '),
            h('i', { style: 'color: teal' }, '登录成功')
          ]): "校验失败",
          duration: 2000,
        });
        notice.show();
      });
    },
  },
};
</script>

<style lang="scss">
  .d-form{
      padding: 0 20%;
  }
</style>
