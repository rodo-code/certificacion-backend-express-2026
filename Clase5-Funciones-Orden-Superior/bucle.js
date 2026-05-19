function loop_iterativo(value, condition, update, body){
    for(let i = value; condition(i); i = update(i)){
        body(i);
    }
}

function loop(value, condition, update, body) {
    if (!condition(value)) {
        return;
    }
    body(value);
    const newValue = update(value);
    loop(newValue, condition, update, body);
}


loop(0, x=>x<5, x=>x+1, console.log);

loop(3, n => n >0, n => n-1, console.log);

/*Realizar la funcion loop de forma recursiva, 
debe tener el mismo comportamiento que el solicitado
en el ejercicio.
RESTRICCION: No usar for*/
