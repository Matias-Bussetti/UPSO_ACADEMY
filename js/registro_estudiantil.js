class RegistroEstudiantil {
    USUARIOS = [];

    constructor() {
        
    }

    static crearUsuario(nombre, apellido, email, rol) {
        const usr = { id: this.generarID(), nombre, apellido, email, rol };
        return usr;
    }

    static crearEstudiante(nombre, apellido, email, rol, edad, paisNac, codCuatrimIni) {
        const usr = this.crearUsuario(nombre, apellido, email, rol);
        usr.edad = edad;
        usr.paisNac = paisNac;
        usr.codCuatrimIni = codCuatrimIni;

        return usr;
    }

    static generarID() {
        // Genera un ID a partir de una cadena de texto generada aleatoreamente
        const stringRandom = Math.random().toString(36).substring(2,10);
    
        return stringRandom;
    }
}

if (window.location.href.toString().includes('registro_estudiantil.html')) {
    const registro = new RegistroEstudiantil()
}

// const usuario1 = new Estudante('Pepe', 'Pepee', 'pepepepee@pepe.com', 'STUDENT', 25, 'Argentina', '1C23');
// const usuario2 = new Usuario('admin', 'admin', '', 'ADMIN');

// console.log(usuario1)
// console.log(usuario2)