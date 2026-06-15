import { 
    getFilteredAndOrderedProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProductFromDB,
    checkoutProductList
 } from "../services/productService.js";

import { validateCompleteBody } from "../utils/validationUtils.js";

export async function getProducts(req, res, next){
    const {category, supplier, sortBy, order} = req.query;

    if(sortBy!==undefined && sortBy !== "stock" && sortBy !== "price"){
        const error = Error("The parameter in sortBy is incorrect");
        error.statusCode = 400;
        return next(error);
    }
    if(order!== undefined && order !== "asc" && order !== "desc"){
        const error = Error("The parameter in order is incorrect");
        error.statusCode = 400;
        return next(error);
    }

    if((sortBy!==undefined && order===undefined) || (sortBy===undefined && order!==undefined)){
        const error = Error("If order is required, it needed to put sortBy and order params");
        error.statusCode = 400;
        return next(error);
    }

    const products = await getFilteredAndOrderedProducts(category,supplier,sortBy,order);

    return res.success(200,`Get products processed succesfully with filters category=${category} and supplier=${supplier}`,products);

}

export async function getProductById(req, res, next){
    const productId = req.params.id;
    const product = await getSingleProduct(productId);
    if(product){
        return res.success(200,`Get product with id ${productId} succesfully`,product);
    }
    else{
        const error = Error("id not found");
        error.statusCode = 404;
        return next(error);
    }
}

export async function postProduct(req, res, next){
    const completeBody = validateCompleteBody(req.body);
    if(completeBody == null){
        const error = Error("Body for add product is incomplete");
        error.statusCode = 400;
        return next(error);
    }
    const savedProduct = await addProduct(completeBody);
    return res.success(200,"Product saved succesfully",savedProduct);
}

export async function patchProduct(req, res, next){
    const productId = req.params.id;
    const previousProduct = await getSingleProduct(productId);
    if(previousProduct === null){
        const error = Error(`Product with id ${productId} does not exist`);
        error.statusCode = 404;
        return next(error);
    }
    const updateBody = req.body;
    const updatedProduct = await updateProduct(productId, updateBody);
    return res.success(200,`Product with id ${productId} updated succesfully`,updatedProduct);
}

export async function deleteProduct(req, res, next){
    const productId = req.params.id;
    const productForDelete = await getSingleProduct(productId);
    if(productForDelete === null){
        const error = Error(`Product with id ${productId} does not exist`);
        error.statusCode = 404;
        return next(error);
    }
    const deletedProduct = await deleteProductFromDB(productId);
    return res.success(200,`Product with id ${productId} was deleted`,deletedProduct);
}

export async function putCheckout(req, res, next) {
    const totalPrice = await checkoutProductList(req.body.products);
    if(totalPrice == -1){
        const error = Error("Checkout Product List has errors");
        error.statusCode = 400;
        return next(error);
    }
    return res.success(200,"Checkout Sucessfully",{totalPrice});
}