import {Buffer} from 'buffer'
import Api from './api'
import Address from './address'
import * as Config from '../../config/Config'
import {getCache, setCache, removeCache} from '../common/storageUtils'
import md5 from 'js-md5';

// import * as ignoreConfig from '../common/ignoreConfig'

/**
 * 初始化用户信息
 */
const initUserInfo = async () => {
    debugger
    let token = await getCache(Config.TOKEN_KEY);
    let res = await getUserInfoLocal();
    return {
        result: res.result && (token !== null),
        data: res.data
    };

};

/**
 * 获取本地登录用户信息
 */
const getUserInfoLocal = async () => {
    let userText = await getCache(Config.USER_INFO);
    if (userText) {
        let res = JSON.parse(userText);
        return {
            result: true,
            data: res
        }
    } else {
        return {
            result: false
        }
    }
};


/**
 * 清除本地的用户信息
 */
const cleanUserInfoLocal = async () => {
    await removeCache(Config.USER_INFO);
    return true
};

/**
 * 登录
 */
const doLogin = async (compno, account, password) => {
    let requestParams = {
        account: account,
        compNo: compno,
        password: md5(password).toUpperCase(),
    };
    let res = await Api.netFetch(Address.getAuthorization(), 'POST', requestParams, true);
    if (res && res.datas) {
        //数据处理
        // removeCache
        //这样存储进去是多个还是一个 ==》1个
        let info = res.datas;
        info.password = password;//没有加密的
        info.compno = compno;
        info.account = account;
        setCache(Config.TOKEN_KEY,info.accessToken);
        setCache(Config.USER_ACCOUNT_KEY,info.account);
        setCache(Config.USER_INFO,JSON.stringify(info));
    }
    return res;
};

/**
 * 获取可切换的门店列表
 */
const switchClinic = async () => {
    let res = await Api.netFetch(Address.switch(), 'GET', null, true);
    //获取之后不需要做处理
    return res;
};

/**
 * 
 */
const doSwitchClinic = async (clinicId) => {
    let res = await Api.netFetch(Address.doswitch(clinicId), 'GET', null, true);
    //获取之后不需要做处理
    if (res && res.datas) {
        //数据处理
        // removeCache
        //这样存储进去是多个还是一个 ==》1个
        let result = await getUserInfoLocal();
        let info = res.datas;
        info.password = result.data.password;//没有加密的
        info.compno = result.data.compno;
        info.account = result.data.account;
        setCache(Config.TOKEN_KEY,info.accessToken);
        setCache(Config.USER_ACCOUNT_KEY,info.account);
        setCache(Config.USER_INFO,JSON.stringify(info));

        res.datas = info;
    }
    return res;
};

export default {
    initUserInfo,
    getUserInfoLocal,
    cleanUserInfoLocal,
    doLogin,
    switchClinic,
    doSwitchClinic
}
