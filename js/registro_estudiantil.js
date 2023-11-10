
class RegistroEstudiantil {
    USUARIOS = [];

    constructor() {
        
    }

    static crearUsuario(nombre, apellido, rol, email) {
        const usr = { id: this.generarID(), nombre, apellido, rol, email };
        return usr;
    }

    static crearEstudiante(nombre, apellido, rol, email, edad, paisNac, codCuatrimIni) {
        const usr = this.crearUsuario(nombre, apellido, rol, email);
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

// recibe la infomacion del nuevo estudiante y la "añade" al arreglo.
document.addEventListener('DOMContentLoaded',()=>{
const registrar= new RegistroEstudiantil();

const formulario = document.getElementById('form-registro');

formulario.addEventListener('submit', function(event){
event.preventDefault();
const nombre= document.getElementById('nombre').value;
const apellido= document.getElementById('apellido').value;
const rol= document.getElementById('select-rol').value;
const email= document.getElementById('email-alumno').value;
const edad= document.getElementById('edad').value;
const paisNac= document.getElementById('select-paises').value;
const codCuatrimIni= document.getElementById('cuatrimestre').value;

const nuevoEstudiante= RegistroEstudiantil.crearEstudiante(nombre, apellido, rol, email, edad , paisNac , codCuatrimIni);



//pusheamos el estudiante al arreglo usuarios
if(registrar.USUARIOS && registrar.USUARIOS.length < 10){

    registrar.USUARIOS.push(nuevoEstudiante);
} else {

    console.log("No se pueden ingresar más alumnos")
}

   formulario.reset();
   console.log(registrar.USUARIOS)

})

});



///
if (window.location.href.toString().includes('registro_estudiantil.html')) {
    const registro = new RegistroEstudiantil()
}

// const usuario1 = new Estudante('Pepe', 'Pepee', 'pepepepee@pepe.com', 'STUDENT', 25, 'Argentina', '1C23');
// const usuario2 = new Usuario('admin', 'admin', '', 'ADMIN');

// console.log(usuario1)
// console.log(usuario2)