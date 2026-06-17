export function validateCompleteBody(body){
    if(body.name === undefined || body.category === undefined
        || body.price === undefined || body.stock === undefined
        || body.supplier === undefined){
        return null;
    }
    const completeBody = {
        "name": body.name,
        "category": body.category,
        "price": body.price,
        "stock": body.stock,
        "supplier": body.supplier
    };
    return completeBody;
}

export function validateIncompleteBody(body){
    let updateBody = {};
    let hasValidField = false;
    const validFields = ["name", "category", "price", "stock", "supplier"];
    for(const field of validFields){
        if(body[field] !== undefined){
            updateBody[field] = body[field];
            hasValidField = true;
        }
    }
    console.log(updateBody);
    return hasValidField? updateBody : null;
}