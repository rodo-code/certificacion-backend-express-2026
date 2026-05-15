//Ej 1
const calcularPrecioFinal=function(precio,categoria,esclienteFrecuente){
    let descuento=0;
    if(esclienteFrecuente){
    if(categoria==="tecnologia"){
    descuento+=10;
    }else if(categoria==="ropa"){
    descuento+=15;
    }else{
    descuento+=5;    
    }
    let preciofinal=precio-(precio*descuento/100);
    preciofinal-=preciofinal*0.05
    if(preciofinal>1000){
    preciofinal-=50;
    }
    return preciofinal;
    }else{
    let descuento=0;
    if(categoria==="tecnologia"){
    descuento+=10;
    }else if(categoria==="ropa"){
    descuento+=15;
    }else{
    descuento+=5;    
    }
    preciofinal=precio-(precio*descuento/100);
    if(preciofinal>1000){
    preciofinal-=50;
    }
    return preciofinal;
    }
}
console.log(calcularPrecioFinal(1200, "tecnologia", true));

//Ej 2 
function evaluarPassword(password) {
    let errores="";
    let tieneMayuscula=false;
    let tieneMinuscula=false;
    let tieneNumero=false;
    let tieneSimbolo=false;
    if(password.length<8){
    errores+="falta longitud mínima,";
    }
    for(let i=0;i<password.length;i++){
        let letra=password.charAt(i);
        if(letra>="A"&&letra<="Z") {
            tieneMayuscula=true;
        }else if(letra>="a"&&letra<="z") {
            tieneMinuscula=true;
        }else if(letra>="0"&&letra<="9") {
            tieneNumero=true;
        }else if("!@#$%&".includes(letra)) {
            tieneSimbolo=true;
        }
    }

    if(!tieneMayuscula){
        errores+=" falta mayúscula, ";
    }
    if(!tieneMinuscula){
        errores+=" falta minúscula, ";
    }
    if(!tieneNumero){
        errores+=" falta número, ";
    }
    if(!tieneSimbolo){
        errores+=" falta símbolo ";
    }
    if(errores.length===0){
        return "Contraseña segura";
    }else{
        return "Contraseña débil:"+errores;
    }
}

console.log(evaluarPassword("hola123"));

//Ej3
const estudiantes=[
  { nombre: "Ana", notas: [80, 90, 75] },
  { nombre: "Luis", notas: [50, 60, 58] },
  { nombre: "Carla", notas: [95, 92, 98] },
  { nombre: "Pedro", notas: [40, 45, 50] }
];
function calcularPromedio(notas){
    let suma=0;
    for(let i=0;i<notas.length;i++){
    suma+=notas[i];

    }
    let promedio=suma/notas.length;
    return promedio;
}
function obtenerEstado(promedio){
    if(promedio>=60){
        return "Aprobado";
    }
    return "Tirado";
}
function generarReporte(estudiantes){
    let reporte=[];
    for(let i=0;i<estudiantes.length;i++){
        let estudiante=estudiantes[i];
        let promedio=calcularPromedio(estudiante.notas);
        let estado=obtenerEstado(promedio);
        reporte.push({
        nombre:estudiante.nombre,
        promedio:promedio,
        estado:estado
        });
    }
    return reporte;
}
console.log(generarReporte(estudiantes));
//console.log(JSON.stringify(generarReporte(estudiantes), null, 2));

//Ej 4
function crearGeneradorDeIds(prefijo,inicio=0){
  let contador=inicio;
  return function(){
    contador++;
    return prefijo+"-"+contador;
  };
}
const generarIdUsuario=crearGeneradorDeIds("USR");

console.log(generarIdUsuario());
console.log(generarIdUsuario());
console.log(generarIdUsuario());
//Extra solo añadir el parametro
const generarIdUsuario1=crearGeneradorDeIds("USR",100);
console.log(generarIdUsuario1());
console.log(generarIdUsuario1());
console.log(generarIdUsuario1());

//Ej 5
function crearContadorDePeticiones(nombre="",limite){
  let contador=0;
  return function(){
    contador++;
    if(contador<=limite){
      return nombre+": Petición permitida:Intento "+contador+" de "+limite;
    }
      return nombre+": Límite excedido. Intenta más tarde.";
  };
}
const verificarPeticion = crearContadorDePeticiones("",3);

console.log(verificarPeticion());
console.log(verificarPeticion());
console.log(verificarPeticion());
console.log(verificarPeticion());
//Extra
const verificarPeticion1 = crearContadorDePeticiones("Ana",3);
console.log(verificarPeticion1());
console.log(verificarPeticion1());
console.log(verificarPeticion1());
console.log(verificarPeticion1());
//Extra avanzado
const ana = crearContadorDePeticiones("Ana", 3);
const luis = crearContadorDePeticiones("Luis", 2);

console.log(ana());
console.log(ana());
console.log(luis());
console.log(ana());
console.log(luis());
console.log(luis());