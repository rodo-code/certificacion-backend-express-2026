import {getUser,getProductList} from "./sandbox.js";

async function getData(){
  try{
    const [user,products]= await Promise.all([
      getUser(1),
      getProductList()
    ]);

    console.log("User fetched:",user);
    console.log("Products fetched:",products);
  }catch(error){
    console.error("Error:",error);
  }
}

getData();