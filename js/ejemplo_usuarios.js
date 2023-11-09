class Usuario {
    constructor(nombre, apellido, email, rol) {
        this.id = generarID();
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.rol = rol;
    }
}

class Estudante extends Usuario {
    constructor(nombre, apellido, email, rol, edad, paisNac, codCuatrimIni) {
        super(nombre, apellido, email, rol);
        this.edad = edad;
        this.paisNac = paisNac;
        this.codCuatrimIni = codCuatrimIni;
    }
}

function generarID() {
    // Genera un ID a partir de una cadena de texto generada aleatoreamente
    const stringRandom = Math.random().toString(36).substring(2,10);

    return stringRandom;
}

const usuario1 = new Estudante('Pepe', 'Pepee', 'pepepepee@pepe.com', 'STUDENT', 25, 'Argentina', '1C23');
const usuario2 = new Usuario('admin', 'admin', '', 'ADMIN');

console.log(usuario1)
console.log(usuario2)