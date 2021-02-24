<template>
  <div class="box" v-if="isShow">
    <div class="notice-title"><p>{{title}} <a href="javascript:;" @click="hide" class="close">×</a></p></div>
    <div class="divider"></div>
    <p class="box-content">
        {{renderSlot()}}
        <slot name="messageRender"></slot>
        <template v-if="!$slots.messageRender">
            {{message}}
        </template>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    message: {
      type: [Function, String],
      default: ""
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  updated(){
      this.$el.style.opacity = 0;
      this.$el.offsetHeight; //  触发回流
      this.$el.style.opacity = 1;
  },
  methods: {
    show() {
      this.isShow = true;
      this.timer = setTimeout(this.hide, this.duration);
    },
    hide() {
      clearTimeout(this.timer);
      this.$el.style.opacity = 0;
      setTimeout(()=>{

      this.isShow = false;
      // 清除自己
      this.remove();
      },300)
    },
    renderSlot(){
        if(typeof this.message === "string") return null;
        if(this.$slots.messageRender) return null;
        console.log(this.message);
        if(this.message instanceof Function){
            this.$nextTick(()=>{
                this.$slots.messageRender = this.message(this.$createElement);
                this.$forceUpdate();
                console.log(this);
            })
        }
    }
  }
};
</script>

<style scoped>

.box {
  position: absolute;
  width: 20%;
  max-height: 200px;
  margin: 100px auto;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* pointer-events: none; */
  background-color: #fff;
  border: grey 1px solid;
  border-radius: 3px;
  box-sizing: border-box;
  z-index: 22;
  box-shadow: -0.1em 0 2em .12em rgba(77, 77, 77, .3);
  transition: opacity ease-in-out .5s;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.notice-title{
    padding: 5px 5px 0 5px;
    color: #222244;
    overflow: hidden;
}

.divider{
    display: block;
    margin: 5px 0;
    border-bottom: 1px solid #ccc;
}

.close{
    float: right;
    padding-right: 5px;
    text-decoration: none;
    color: #222244;
    font-size: 20px;
}

.box-content {
  margin: 10px auto;
  font-size: 14px;  
  padding: 8px 16px;
  background: #fff;
  margin-bottom: 8px;
}
</style>