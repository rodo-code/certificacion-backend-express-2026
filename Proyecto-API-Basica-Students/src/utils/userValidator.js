export function validateUserBody(body){
    const validProperties = ["username", "password", "role"];

    if(!body){
        return {
            validation: false,
            message: "body is empty and is required"
        };
    }

    const validPropertiesInBody = validProperties.filter( property => body.hasOwnProperty(property));

    if(!body.hasOwnProperty("username") || !body.hasOwnProperty("password")){
        return {
            validation: false,
            message: "Body is not complete for use user API"
        };
    }

    for(let property of Object.keys(body)){
        if(!validProperties.includes(property)){
            return {
                validation: false,
                message: `Body has a non allowed property called ${property} for user`
            };
        }
    }

    if(typeof body.username !== "string" || body.username.trim().length === 0){
        return {
            validation: false,
            message: "username is invalid"
        };
    }

    if(typeof body.password !== "string" || body.password.trim().length === 0){
        return {
            validation: false,
            message: "password is invalid"
        };
    }

    return {
        validation: true,
        message: "all validation passed"
    };
}
