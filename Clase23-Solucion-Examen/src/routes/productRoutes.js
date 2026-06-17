import { Router } from "express";

import {
    getProducts, 
    getProductById, 
    postProduct, 
    patchProduct, 
    deleteProduct,
    putCheckout
 } from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/",postProduct);
productRoutes.patch("/:id",patchProduct);
productRoutes.delete("/:id",deleteProduct);
productRoutes.put("/checkout",putCheckout);
export default productRoutes;