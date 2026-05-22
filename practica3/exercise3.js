import { getUser,getOrders } from "./sandbox.js";

function printOrdersByUser(id){
  getUser(id)
    .then(user=>{
      console.log("User fetched:",user);
      return getOrders(user.id);
    })
    .then(orders=>{
      console.log("Orders fetched:",orders);
    })
    .catch(error=>{
      console.error("Error:",error);
    });
}

printOrdersByUser(1);

printOrdersByUser(-1);