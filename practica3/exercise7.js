import {getUser,getOrders,getPaymentStatus,getShippingInfo} from "./sandbox.js";

async function printOrderSummary(userId,orderId){
    try{
    const [user,orders]= await Promise.all([
        getUser(userId),
        getOrders(userId)
    ]);
    const order=orders.find(order=>order.id===orderId);
    if(order==null){
        throw new Error("Order not found");
    }
    const [payment,shipping]= await Promise.all([
      getPaymentStatus(orderId),
      getShippingInfo(orderId)
    ]);
    console.log("User:",user.name);
    console.log("Order:",`${order.product}-${order.price}`);
    console.log("Payment status:",payment.status);
    console.log("Shipping status:",shipping.status);
    console.log("Shipping company:",shipping.company);
    }catch(error){
        console.error("Error:",error);
    }
}
printOrderSummary(1,1);
printOrderSummary(1, 99);
printOrderSummary(-1, 1);