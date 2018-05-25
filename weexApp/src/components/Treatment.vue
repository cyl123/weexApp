<template>
    <div>
         <wxc-loading :show="isShow" type="trip"></wxc-loading>
         <navigation-bar :title="title" :onLeftButtonClick="()=>{}" :onRightButtonClick="()=>{}"
                        :rightIcon="''" :leftIcon="''"></navigation-bar>
    </div>
</template>

<script>
 import NavigationBar from './widget/NavigationBar.vue'
 import { WxcLoading} from 'weex-ui'

export default {
    components:{NavigationBar,WxcLoading},
    data(){
        return {
            isShow:false,
            title:
        }
    },
    methods:{

    },
    created(){

    }
}
</script>
