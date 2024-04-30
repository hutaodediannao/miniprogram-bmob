/**
 * 获取导航栏高度px
 * @returns {number}
 */
function navHeight() {
    let jnRect = wx.getMenuButtonBoundingClientRect()
    let statusBarHeight = wx.getWindowInfo().statusBarHeight
    let jnPadding = jnRect.top - statusBarHeight
    let navHeight = jnPadding * 2 + jnRect.height
    console.log("获取头部导航栏高度为：", navHeight)
    return navHeight
}

function statusBarHeight() {
    return wx.getWindowInfo().statusBarHeight
}

function screenWidth(){
    return wx.getWindowInfo().screenWidth;
}

//获取三个TabBar对应的页面高度计算
function tabPageHeight(pageIndex = 0) {
    if (pageIndex === 2)
        return wx.getWindowInfo().screenHeight - navBottomHeight;
    else
        return wx.getWindowInfo().screenHeight - statusBarHeight() - navHeight() - navBottomHeight;
}

function topHeight(){
    return navHeight() + statusBarHeight();
}

const navBottomHeight = 55;

module.exports = {
    nh: navHeight(),
    sh: statusBarHeight(),
    navBottomHeight: navBottomHeight,
    tabPageHeight: tabPageHeight,
    screenWidth: screenWidth(),
    topHeight: topHeight(),
}
