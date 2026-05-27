function multiplo3(numero){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(numero%3 == 0){
                resolve("Es multiplo de 3");
            }
            else{
                reject("No es multiplo de 3");
            }
        },1500);
    });
}

async function obtenerMultiplo3(){
    try{
        const valor = await multiplo3(4);
        console.log(valor);
    }catch(error){
        console.log(error);
    }
}

// Usando then/catch
multiplo3(12).then(valor => console.log(valor))
            .catch(error => console.log(error));

obtenerMultiplo3();