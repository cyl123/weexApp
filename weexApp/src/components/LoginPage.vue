<template>
    <div class="wrapper" :style="{ height: height + 'px' }">
        <wxc-loading :show="isShow" type="trip"></wxc-loading>
        <div class="login-top">
            <text class="login-top-text">颜术</text>
        </div>
         <div class="login-content">
          <div class="row row-line">
                 <input class="row-input row-input-right" type="text" placeholder="请输入公司ID" :value="compno"
                        @input="onCompNoChange" :autofocus="true"/>
          </div>
          
              <div class="row row-line">
                 <input class="row-input row-input-right" type="number" placeholder="请输入手机号码" :value="account"
                        @input="onAccountChange" :autofocus="true"/>
           </div>
              <div class="row row-line row-overall">
                 <input class="row-input login-pwd" :type="type" placeholder="请输入登录密码" :value="password"
                        @input="onPasswordChange" :autofocus="true"/>
                 <text class="login-pwd-eye" @click="lookPwd">eye</text>
          </div>
            <div class="row row-overall">
                <div class="row-end-left">
                    <switch checked="true"></switch>
                    <text class="label">记住密码</text>
                </div>
                <div class="row-end-right">
                    <text class="label">忘记密码?</text>
                </div>
          </div>
        </div>
        <div class="login-bottom">
            <text class="login" @click="login">登录</text>
        </div>
    </div>
</template>

<style scoped>

.wrapper{
 width: 750px;
}

.login-top-text{
    font-size: 60px;
    text-align: center;
    font-weight: bold;
    margin-top: 120px;
     width: 750px;
    height: 100px;
}
.login-content{
    margin-top: 100px;
}
.row{
    margin-top: 20px;
    height: 90px;
    margin-left: 30px;
    margin-right: 30px;  
}

.row-input{
    height: 90px;
    text-indent: 10px;
    margin-left: 0px;
}

.row-input-right{
    margin-right: 0px;
}

.row-line{
    border-bottom-color: lightgray;
    border-bottom-width: 1px; 
}

.row-overall{
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
}

.login-pwd{
    width: 570px;
}

.login-pwd-eye{
    width: 120px;
    height: 90px;
    background-color: yellow;
    text-align: center;
    line-height: 90px;
}

.row-end-left{
     justify-content: space-between;
    flex-direction: row;
    align-items: center;
}

.login{
    width: 600px;
    margin-left: 75px;
    margin-top: 60px;
    height: 90px;
    border-radius: 45px;
    text-align: center;
    line-height: 90px;
    color:white;
    background-color: #249FE6;
}

.weex-switch-checked {
    background-color: #249FE6;
    border-color: #249FE6;
    box-shadow: #249FE6 0 0 0 39.999975px inset;
}

.label{
    color:lightgray;
}
</style>

<script>
    import {WxcButton, WxcLoading, Utils} from 'weex-ui'
    import {Buffer} from 'buffer'
    import user from '../core/net/user'

    import {isEmptyString} from '../core/common/commonUtils'
    import {getImagePath, addIconFontSupport} from '../config/IconConfig'
    import * as Config from '../config/Config'

    const modal = weex.requireModule('modal')
    const dom = weex.requireModule('dom');
    const animation = weex.requireModule('animation');
//测试使用 看看咋样
export default{
    components:{
        WxcLoading
    },
    data(){
        return {
            height:Utils.env.getScreenHeight(),
            type:'password',
            compno:'',
            account:'',
            password:'',
            isShow:false
        }
    },
    methods:{
        lookPwd(event){
            debugger
            if(this.type == 'password'){
                this.type = 'text'
            }else{
                this.type = 'password'
            }
        },
         login(event){
            //登录
                let compno = this.compno;
                let account = this.account;
                let password = this.password;
                 if (isEmptyString(compno)) {
                    modal.toast({message: "公司ID不能为空!"});
                    return
                }
                if (isEmptyString(account)) {
                    modal.toast({message: "手机号码不能为空!"});
                    return
                }
                if (isEmptyString(password)) {
                    modal.toast({message: "密码不能为空!"});
                    return
                }
                this.isShow = true;

                this.$store.dispatch('doLogin',{
                    compno:this.compno,
                    account:this.account,
                    password:this.password,
                    resultCallback:(res=>{
                        this.isShow = false;
                       if (res && res.success == 0) {
                         modal.toast({message:"登录成功!"});
                         this.reset("/main");
                         }else{
                         modal.toast({message:res.message});
                         }
                      })
                    });
        },
        onCompNoChange(event){
            this.compno = event.value;
        },
        onAccountChange(event){
            this.account = event.value;
        },
        onPasswordChange(event){
            this.password = event.value;
        },
    },
}
    // export default {
    //     components: {WxcButton, WxcLoading, LoadingComponent},
    //     data() {
    //         return {
    //             logo: '',
    //             username: "",
    //             password: "",
    //             isLoading: false,
    //             loadingText: "处理中···",
    //             primaryColor: Config.primaryColor,
    //             mainHeight: 0
    //         }
    //     },
    //     created: function () {
    //         this.logo = getImagePath('logo', '.png')
    //         addIconFontSupport(dom, "../../")
    //         this.mainHeight = Utils.env.getScreenHeight()
    //     },
    //     methods: {
    //         onUserNameChange(event) {
    //             this.username = event.value;
    //         },
    //         onPWChange(event) {
    //             this.password = event.value;
    //         },
    //         onLogin() {
    //             let username = this.username;
    //             let password = this.password;
    //             if (isEmptyString(username)) {
    //                 modal.toast({
    //                     message: "用户名不能为空"
    //                 });
    //                 return
    //             }
    //             if (isEmptyString(password)) {
    //                 modal.toast({message: "密码不能为空"});
    //                 return
    //             }
    //             this.isLoading = true;
    //             this.$store.dispatch('doLogin', {
    //                 username: username,
    //                 password: password,
    //                 resultCallback: (res) => {
    //                     this.isLoading = false;
    //                     if (res && res.result) {
    //                             let containerEl = this.$refs[`container`];
    //                             animation.transition(containerEl, {
    //                                 styles: {
    //                                     transform: `translateY(${Utils.env.getPageHeight()}px)`
    //                                 },
    //                                 duration: 1000,
    //                                 'cubic-bezier': (0.25, 0.46, 0.45, 0.94),
    //                                 delay: 0
    //                             }, () => {
    //                                 this.reset("/main")
    //                             });

    //                     }
    //                     console.info("resultCallback", res)
    //                 }
    //             })
    //         },
    //     }
    // }
</script>