import {getUser,getOrders} from "./sandbox.js";

async function printOrdersByUser(id){
    try{
        const user= await getUser(id);
        const orders= await getOrders(user.id);
        console.log("User fetched:",user);
        console.log("Orders fetched:",orders);
    }catch(error){
        console.error("Error:",error);
    }
}

printOrdersByUser(1);

printOrdersByUser(-1);