<template>
    <div :style="{height: mainHeight, width: '750px'}">
      
        <tab-bar :tab-titles="tabTitles"
                 :tab-styles="tabStyles"
                 title-type="iconFont"
                 @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
            <div class="item-container" :style="contentStyle">
                <home></home>
            </div>
            <div class="item-container" :style="contentStyle">
                <treatment></treatment>
            </div>
            <div class="item-container" :style="contentStyle">
                <appoint></appoint>
            </div>
        </tab-bar>
    </div>
</template>

<style lang="scss" >
    @import '../config/styles.scss';
    .item-container {
        width: 750px;
        background-color: $--container-color;
        overflow: scroll;
    }
</style>
<style scoped>
</style>
<script>
    import {Utils, WxcMinibar} from 'weex-ui';
    import Config from '../config/MainTabConfig'
    import TabBar from './widget/TabBar.vue'
    import NavigationBar from './widget/NavigationBar.vue'
    import Home from './Home.vue'
    import Treatment from './Treatment.vue'
    import Appoint from './Appoint.vue'
    import Client from './Client.vue'
    import My from './My.vue'
    import {addIconFontSupport} from '../config/IconConfig'
    import {getRealScreenHeight} from '../config/Config'

    const dom = weex.requireModule('dom');
    const modal = weex.requireModule('modal');

    export default {
        components: {Home, Treatment, TabBar, WxcMinibar, Appoint},
        data: () => ({
            tabTitles: Config.tabIconFontTitles,
            tabStyles: Config.tabIconFontStyles,
            mainHeight: 0,
        }),
        created() {
            const tabPageHeight = Utils.env.getPageHeight();
            this.contentStyle = {height: tabPageHeight};
            this.mainHeight =  getRealScreenHeight(Utils)
            addIconFontSupport(dom, "../../")
        },
        methods: {
            wxcTabBarCurrentTabSelected(e) {
                const index = e.page;
            },
            minibarRightButtonClick() {
                this.jumpWithParams("SearchPage",{})
            },
        }
    };
</script>
