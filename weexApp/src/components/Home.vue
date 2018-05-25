<template>
    <div>
         <navigation-bar :title="title" :onLeftButtonClick="()=>{}" :onRightButtonClick="minibarRightButtonClick"
                        :rightIcon="'切换'" :leftIcon="''"></navigation-bar>
        <list class="clinicList" v-if="isClinicShow">
            <cell class="clinicCell" v-for="(item, index) in cliniclist" :key="index">
                <text class="clinicName">{{item.isGeneral ? '总' : '门'}}-{{item.name}}</text>
            </cell>
        </list>
    </div>
</template>
<script>
 import NavigationBar from './widget/NavigationBar.vue'
 import {mapState} from "vuex"

const modal = weex.requireModule('modal');
//首页
export default {
    components:{NavigationBar},
    data(){
        return {
            title:this.$store.state.user.userInfo.orgName,
            isClinicShow:false,
            cliniclist:[]
        }
    },
    methods:{
        minibarRightButtonClick(event){
              this.clinicList(); 
        },
         clinicList(){
                    this.$store.dispatch('switchClinic',{
                    resultCallback:(res=>{
                      debugger
                      this.isClinicShow = true
                       if (res && res.success == 0) {
                            this.cliniclist = res.datas;
                         }else{
                             modal.toast({message:res.message});
                             if(res && res.success == 4){
                                 this.reset("/login");
                             }
                         }
                      })
                    });
        }
    },
    created(){
        
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

