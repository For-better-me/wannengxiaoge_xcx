/**
 * 小程序接口定义文件
 */

const baseUrl = "http://118.31.116.206:8080/wnxg-platform"; //测试版线上接口
// const baseUrl = "https://a.abc.com"; //正式版线上接口

const api = {
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

    }
}

module.exports = api