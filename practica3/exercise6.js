import { getOrders } from "./sandbox.js";
function test1(id){
    getOrders(id)
    .then(orders=>{
        console.log("Orders fetched:",orders);
    })
    .catch(error=>{
        console.log("Error test1:",error);
    });
}
test1(-1);

async function test2(id){
    try{
        const orders=await getOrders(id);
        console.log("Orders fetched:",orders);
    }catch(error){
        console.error("Error test2:",error);
    }
}
test2(-1);