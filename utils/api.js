/**
 * 小程序接口定义文件
 */

 const onLineBaseUrl = "http://118.31.116.206:8080"; //测试版线上接口
// const onLineBaseUrl = "https://tal.sinrewx.com"; //正式版线上接口

const api = {
    dev: { // 开发环境
        person: { // 用户中心模块接口
            
        },
        orderList: { // 订单模块接口
    
        },
        index: { // 首页模块接口
            all_citys: `${onLineBaseUrl}/wnxg-platform/ws/user/all_citys`
        }
    },
    pro: {// 生产环境
        person: { // 用户中心模块接口
    
        },
        orderList: { // 订单模块接口
    
        },
        index: { // 首页模块接口
    
        }
    }
}

module.exports = api