import { getProductList, getProductDetail } from "./sandbox.js";

async function printAvailableProductDetails() {
  try {
    const products=await getProductList();
    const productDetails=await Promise.all(
      products.map(productName=>getProductDetail(productName))
    );
    const availableProducts=productDetails.filter(product=>product.stock>0);
    console.log("Available products:");
    availableProducts.forEach(product=>{
      console.log(`${product.name}-${product.category}-stock:${product.stock}`);
    });
  }catch(error){
    console.error("Error:",error);
  }
}

printAvailableProductDetails();