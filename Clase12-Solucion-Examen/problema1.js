function crearValidadorLogin(usuarioCorrecto, passwordCorrecto, limiteIntentos){
    let intentos = 0, accesoConcedido = false, accesoBloqueado = false;
    return (usuarioIngresado, passwordIngresado) => {
        if(accesoConcedido){
            return "Acceso concedido";
        }
        if(accesoBloqueado){
            return "Cuenta bloqueada por demasiados intentos fallidos";
        }
        if(intentos>=limiteIntentos){
            accesoBloqueado = true;
            return "Cuenta bloqueada por demasiados intentos fallidos";
        }
        else{
            intentos++;
            if(usuarioCorrecto == usuarioIngresado && passwordIngresado == passwordCorrecto){
                accesoConcedido = true;
                return "Acceso concedido";
            }
            else{
                return `Credenciales incorrectas. Intento ${intentos} de ${limiteIntentos}`;
            } 
        }
    }
}

const login = crearValidadorLogin("admin", "1234", 3);
console.log(login("admin", "0000"));
console.log(login("user", "1234"));
console.log(login("admin", "1234"));
