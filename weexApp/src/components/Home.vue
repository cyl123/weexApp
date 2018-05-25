<template>
    <div>
         <wxc-loading :show="isShow" type="trip"></wxc-loading>
         <navigation-bar :title="title" :onLeftButtonClick="()=>{}" :onRightButtonClick="minibarRightButtonClick"
                        :rightIcon="'切换'" :leftIcon="''"></navigation-bar>
        <list class="clinicList" v-if="isClinicShow">
            <cell class="clinicCell" v-for="(item, index) in cliniclist" :key="index" @click="doSwitchClinic(index)"
                 v-show="item.name != $store.state.user.userInfo.orgName" >
                <text class="clinicName">{{item.isGeneral ? '总' : '门'}}-{{item.name}}</text>
            </cell>
        </list>
    </div>
</template>
<script>
 import NavigationBar from './widget/NavigationBar.vue'
 import { WxcLoading} from 'weex-ui'

const modal = weex.requireModule('modal');
//首页
export default {
    components:{NavigationBar,WxcLoading},
    data(){
        return {
            title:this.$store.state.user.userInfo.orgName,
            isClinicShow:false,
            cliniclist:[],
            isShow:false,
        }
    },
    methods:{
        minibarRightButtonClick(event){
              this.clinicList(); 
        },
         clinicList(){
                this.isShow = true
                this.$store.dispatch('switchClinic',{
                resultCallback:(res=>{
                    debugger
                    this.isClinicShow = true
                    this.isShow = false
                    if (res && res.success == 0) {
                        this.cliniclist = res.datas;
                    }else{
                        modal.toast({message:res.message});
                        if(res && (res.success == 4 || res.success == 1)){
                             this.reset("/login");
                         }
                        }
                    })
             });
        },
        doSwitchClinic(index){
            this.isShow = true
            var item = this.cliniclist[index];
            this.$store.dispatch('doSwitchClinic',{
                clinicId:item.id,
                resultCallback:(res=>{
                    this.isShow = false
                    if (res && res.success == 0) {
                        this.isClinicShow = false;
                         this.title = this.$store.state.user.userInfo.orgName;
                         modal.toast({message:'切换成功!'});
                    }else{
                        modal.toast({message:res.message});
                         if(res && (res.success == 4 || res.success == 1)){
                             this.reset("/login");
                         }
                      }
                    })
            });
        }
    },
    created(){
        debugger

        console.log(this.$store.state.user.userInfo);
    }
}
</script>

<style scoped>

.clinicList{
    background-color: white;
    max-height: 500px;
}

.clinicCell{
    height: 80px;
    width: 750px;
    margin-bottom: 10px;
}

.clinicName{
   text-align: center;
    height: 80px;
    border-bottom-color: #C9C9C9;
    border-bottom-width: 1px;
    margin-left: 20px;
    margin-right: 20px;
    line-height: 80px;
}

</style>

