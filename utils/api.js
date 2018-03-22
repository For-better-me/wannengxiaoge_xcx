/**
 * 小程序接口定义文件
 */

 const baseUrl = "http://118.31.116.206:8080/wnxg-platform"; //测试版线上接口
// const baseUrl = "https://a.abc.com"; //正式版线上接口

const api = {
    dev: { // 开发环境
        person: { // 用户中心模块接口
            all_citys: `${baseUrl}/ws/user/all_citys`,
            problems: `${baseUrl}/ws/user/problems`, // 常见问题
            serverTypeList: `${baseUrl}/ws/user/service_type/{cityCode}/{serviceId}`, // 服务类型列表
        },
        orderList: { // 订单模块接口
    
        },
        index: { // 首页模块接口
            all_citys: `${baseUrl}/ws/user/all_citys`, // 查询已开通的区域
            ad_info: `${baseUrl}/ws/user/ad_info/{typeCode}/{cityCode}`, // 用户端banner图查询接口
        },
        status: {
            login: `${baseUrl}/ws/user/login`, // 登录
            sms: `${baseUrl}/ws/user/sms`, // 获取验证码
            
        },
        demo: {
            service_type_info: `${baseUrl}/ws/user/service_type_info/{serviceId}`,
            sku: `${baseUrl}/ws/user/sku/service/{id}/{adcode}`,
            skuDetail: `${baseUrl}/ws/user/sku/{id}`,
            sku_comment: `${baseUrl}/ws/user/sku_comment/{id}`,
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