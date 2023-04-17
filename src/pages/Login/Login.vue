<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:current}" @click="current=!current">短信登录</a>
          <a href="javascript:;" :class="{on:!current}" @click="current=!current">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:current}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phoneNum"/>
              <button :disabled="!rightPhone" class="get_verification"
                :class="{changeCheckColor:rightPhone}" @click.prevent="getCheckCode">
                {{computedTime>0?`已发送(${computedTime}s)`:`获取验证码`}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="currentCode"/>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!current}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名" v-model="name"
                />
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd"/>
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd"/>
                <div class="switch_button" :class="showPwd?`on`:`off`"  @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
                <img class="get_verification" src="http://localhost:3000/captcha"
                  ref="captcha" @click="getCaptcha" />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <alert-tip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import {loginPwd,sendCode,smsLogin} from '../../api/index.js'
export default {
  name: "Login",
  components:{
    AlertTip
  },
  data(){
    return {
      phoneNum:'',        //手机号
      current:false,       //短信登录or密码登录
      currentCode:'',     //手机登录-验证码
      computedTime:0,     //发送验证码后的倒计时
      showPwd:true,       //是否显示密码
      pwd:'',              //密码登录-密码
      name:'',              //用户名
      captcha:'',           //密码登录验证码
      alertText:'',         //提示文本
      showAlert:false,      //是否显示提示框
    }
  },
  methods: {
    //获取新的图片验证码
    getCaptcha(){
      this.$refs.captcha.src='http://localhost:3000/captcha?time'+Date.now()
    },
    //关闭弹出框
    closeTip(){
      this.showAlert=false
    },
    //弹出提示框
    showAlertBox(text){
      this.alertText=text
      this.showAlert=true
    },
    //登录
    async login(){
      let result
      //表单验证
      if(this.current){
        //短信登陆
        const {phoneNum,currentCode}=this
        if(this.rightPhone===false){
          //手机号不正确
          this.showAlertBox('手机号不正确')
          return
        }else if(!(/^\d{6}$/.test(currentCode))){
          //验证码错误
          this.showAlertBox('验证码错误')
          return
        }else{
          //短信登陆
          result=await smsLogin(this.phoneNum,this.currentCode)
        }
      }else{
        //密码登录
        const {name,pwd,captcha}=this
        if(!name){
          //用户名为空
          this.showAlertBox('用户名为空')
          return
        }else if(!pwd){
          //密码不为空
          this.showAlertBox('密码为空')
          return
        }else if(!captcha){
          //图片验证码不为空
          this.showAlertBox('图片验证码为空')
          return
        }else{
          result=await loginPwd({name,pwd,captcha})
        }
      }

      if(result.code===0){
        const user=result.data
        //保存user
        this.$store.dispatch("save_user",user)
        //去个人中心
        this.$router.replace('/profile')
      }else{
        const errMsg=result.msg
        this.showAlertBox(errMsg)
      }
    },
    //获取手机验证
    async getCheckCode(){
      if(this.computedTime===0){
        //启动倒计时
        this.computedTime=30
        this.intervalCode=setInterval(()=>{
          this.computedTime--
          if(this.computedTime<=0){
            clearInterval(this.intervalCode)
          }
        },1000)

        //发送短行验证码请求
        let res=await sendCode(this.phoneNum)
        if(res.code===1){
          this.showAlertBox(res.msg)
          if(this.computedTime!=0){
            this.computedTime=0
            clearInterval(this.intervalCode)
          }
        }
      }

    }
  },
  computed:{
    rightPhone(){
      return /^1\d{10}$/.test(this.phoneNum)
    }
  }
};
</script>

<style lang="stylus" scoped>
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.changeCheckColor{
                color : black
              }
            }


          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right{
                  transform:translateX(27px)
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
