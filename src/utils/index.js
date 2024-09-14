/**
 * @author Hepan
 * @description 公共函数定义
 */
export const wxUtil = {
    initShareInfo(wx) {
        let shareInfo = {
            title: 'h5分享', // 分享标题
            desc: 'h5分享测试', // 分享描述
            link: 'http://www.zjpzjp.com/wxh5', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '' // 分享图标
        }
        wx.onMenuShareAppMessage(shareInfo)
        wx.onMenuShareTimeline(shareInfo)
        wx.onMenuShareQQ(shareInfo)
        wx.onMenuShareQZone(shareInfo)

        // wx.updateAppMessageShareData(shareInfo);
        // wx.updateTimelineShareData(shareInfo);
    }
}
export function objectIsValid(param) {
    if (typeof param === 'undefined' || param === null) {
        return false
    }
    if (param === 0) {
        param = param.toString()
    }
    var tt = typeof param
    try {
        switch (tt) {
            case 'string':
                return isStrValid(param)
            case 'object':
                return Object.keys(param).length > 0
            case 'number':
                return !!param
            case 'boolean':
                return param
            default:
                return Boolean(param)
        }
    } catch (e) {
        console.log(e)
    }
}

function isStrValid(strobj) {
    if (typeof strobj === 'undefined' || strobj === null) {
        return false
    }
    var tmpStr = String(strobj)
    return tmpStr.trim().length > 0
}

//获取浏览器地址栏参数值
export const getUrlParam = (name) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
}
