import {getIonFontPath} from './IconConfig'
import * as Config from './Config'


export default {

    // 使用 iconFont 模式的tab title配置
    tabIconFontTitles: [
        {
            title: '我的',
            codePoint: '\ue60a'
        },
        {
            title: '就诊',
            codePoint: '\ue61d'
        },
        {
            title: '预约',
            codePoint: '\ue623'
        },
        {
            title: '客户',
            codePoint: '\ue606'
        },
        {
            title: '我的',
            codePoint: '\ue6ab',
        }
    ],
    tabIconFontStyles: {
        bgColor: '#fbfbfb',
        titleColor: '#666666',
        activeTitleColor: '#249FE6',//Config.primaryColor,
        activeBgColor: '#fbfbfb',
        isActiveTitleBold: true,
        width: 160,
        height: Config.mainTabBarHeight,
        fontSize: 24,
        textPaddingLeft: 10,
        textPaddingRight: 10,
        iconFontSize: 40,
        iconFontMarginBottom: 8,
        iconFontColor: '#AAAAAA',
        activeIconFontColor: '#249FE6',
        iconFontUrl: getIonFontPath("../")
    }
}