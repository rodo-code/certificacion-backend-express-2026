import { Product } from "../data/product.js";

export async function getFilteredAndOrderedProducts(category, supplier, sortBy, order){
    let productFilter = {};
    if(category !== undefined){
        productFilter["category"] = category;
    }
    if(supplier !== undefined){
        productFilter["supplier"] = supplier;
    }
    
    let productOrder = {};
    if(sortBy !== undefined && order !== undefined){
        productOrder[sortBy] = (order === "asc") ? 1 : -1;
    }

    const products = await Product.find(productFilter).sort(productOrder);
    return products;
}

export async function getSingleProduct(productId){
    const product = await Product.findById(productId);
    return product;
}

export async function addProduct(product){
    const savedProduct = await Product.create(product);
    return product;
}

export async function updateProduct(productId, bodyUpdateProduct) {
    const updateProduct = await Product.findByIdAndUpdate(productId, bodyUpdateProduct, {new: true});
    return updateProduct;
}

export async function deleteProductFromDB(productId) {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct;
}

export async function checkoutProductList(checkoutOrder) {
    let totalPrice = 0;
    // Validation for checkout
    if(checkoutOrder === undefined) return -1;
    for(let item of checkoutOrder){
        const productId = item.id;
        const productQuantity = item.quantity;
        const product = await getSingleProduct(productId);
        if(product == null){
            return -1; // An id of the checkout order does not exist
        }
        if(productQuantity > product.stock){
            return -1; // A product has a quantity order greater than stock
        }
    }
    // Update products
    for(let item of checkoutOrder){
        const productId = item.id;
        const productQuantity = item.quantity;
        const product = await getSingleProduct(productId);
        const newStock = product.stock - productQuantity;
        // Update stocks
        await Product.findByIdAndUpdate(productId,{
            stock: newStock
        });
        totalPrice = totalPrice + (productQuantity * product.price);
    }
    return totalPrice;
}