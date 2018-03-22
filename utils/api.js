/**
 * 小程序接口定义文件
 */

const baseUrl = "http://118.31.116.206:8080/wnxg-platform" // 测试版线上接口
// const baseUrl = "https://a.abc.com" // 正式版线上接口

const api = {
    public: { // 公共接口
        register: `${baseUrl}/ws/user/register`, // 4.1.用户注册接口(POST)
        sms: `${baseUrl}/ws/user/sms`, // 3.1.获取短信接口(POST)
        adInfo: `${baseUrl}/ws/user/ad_info/{typeCode}/{cityCode}`, // 3.3.用户端banner图查询接口(GET)
        citys: `${baseUrl}/ws/user/citys/{adcode}`, // 3.2.城市列表查询接口(GET)
        allCitys: `${baseUrl}/ws/user/all_citys`, // 3.4.城市列表查询接口树结构返回值(GET)
        virtualTel: `${baseUrl}/ws/user/axb/{orderId}`, // 4.51.获取虚拟号(GET)
        brotherInfo: `${baseUrl}/ws/user/xg_info/{xgId}`, // 4.53.获取小哥信息接口(GET)
        login: `${baseUrl}/ws/user/login`, // 4.2.用户登录接口(POST)
        fastLogin: `${baseUrl}/ws/user/WeChatLogin`, // 4.48.用户快速登录接口(POST)
        loginOut: `${baseUrl}/ws/user/logout`, // 4.47.退出接口(POST)
    },
    problem: { // 问题
        problems: `${baseUrl}/ws/user/problems`, // 4.5.常见问题列表查询接口(POST)
        problemDetail: `${baseUrl}/ws/user/problem/{id}`, // 4.6.常见问题详情查询接口(GET)
        problemAdd: `${baseUrl}/ws/user/problem`, // 4.7.问题添加接口(POST)
    },
    skuList: { // sku列表

    },
    skuComment: { // sku评论

    },
    service: { // 服务、服务类型

    },
    order: { // 订单
        order: `token|${baseUrl}/ws/user/order`, // 4.15.下单接口(POST)
        my_orders: `token|${baseUrl}/ws/user/my_orders/{status}`, // 4.26.我的订单列表查询接口(GET)
        my_order_details: `token|${baseUrl}/ws/user/my_order_details/{orderId}`, // 4.27.我的订单详情查询接口(GET)
        my_order_operate_record: `token|${baseUrl}/ws/user/my_order_operate_record/{orderId}`, // 4.28.订单跟踪记录查询接口(GET)
        orderCancel: `token|${baseUrl}/ws/user/order`, // 4.30.取消订单接口(PUT)
        order_pay: `token|${baseUrl}/ws/user/order_pay`, // 4.33.订单支付接口（PUT）
        end_order: `token|${baseUrl}/ws/user/end_order/{orderId}`, // 4.52.完结订单接口(PUT)
        payment_list: `token|${baseUrl}/ws/user/payment_list/{payNumber}`, // 4.56.根据支付单号生成新的支付记录接口（PUT）
        order_cancel: `token|${baseUrl}/ws/user/order_cancel`, // 4.59.用户取消订单接是否扣上门费查询接口(GET)
    },
    orderComment: { // 订单评论

    },
    paySms: { // 支付短信

    },
    coupon: { // 优惠券

    },
    shoppingCart: { // 购物车

    },
    invoice: { // 发票

    },
    address: { // 用户地址
        user_default_address: `token|${baseUrl}/ws/user/user_default_address/`, // 4.16.用户默认地址查询接口（GET）
    },
    userInfo: { // 个人信息

    },
    activity: { // 活动

    }
}

module.exports = api