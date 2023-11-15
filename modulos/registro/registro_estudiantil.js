class RegistroEstudiantil {
    USUARIOS = [];

    constructor() {
        const btn_submit = document.getElementById('btn-registrar');
        const btn_materias= document.getElementById('btn-reg-materias');

        btn_submit.addEventListener('click', e => {
            e.preventDefault();
            this.registarUsuario();
        });

        btn_materias.addEventListener('click',e =>{
            e.preventDefault();
            window.location.href= '../materias/materias.html';
        });

        this.USUARIOS = JSON.parse(localStorage.getItem("usersList"));
    }

    static crearUsuario(usuario, password, nombre, apellido, rol, email) {
        const usr = { id: this.generarID(), usuario, password, nombre, apellido, rol, email };
        return usr;
    }

    static crearEstudiante(usuario, password, nombre, apellido, rol, email, edad, paisNac, codCuatrimIni) {
        const usr = this.crearUsuario(usuario, password, nombre, apellido, rol, email);
        usr.edad = edad;
        usr.paisNac = paisNac;
        usr.codCuatrimIni = codCuatrimIni;

        return usr;
    }

    static generarID() {
        // Genera un ID a partir de una cadena de texto generada aleatoreamente
        const stringRandom = Math.random().toString(36).substring(2, 10);

        return stringRandom;
    }

    static guardarUsuarioStorage(usuario) {
        const usuariosStorage = JSON.parse(localStorage.getItem('usersList'));
        let usuarioEncontrado = usuariosStorage.find(usr => usr.usuario === usuario.usuario);

        if (!usuarioEncontrado) {
            usuariosStorage.push(usuario);
            localStorage.setItem('usersList', JSON.stringify(usuariosStorage))
            console.log('Nuevo usuario creado')
        } else {
            console.log('El usuario ya existe')
        }
    }

    // Obtiene los datos del formulario y genera un nuevo usuario.
    registarUsuario() {
        const containerMsgs = document.getElementById('container-msgs');
        const formulario = document.getElementById('form-registro');
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const usuario = document.getElementById('usuario').value;
        const contrasenia = document.getElementById('contrasenia').value;
        const rol = document.getElementById('select-rol').value;
        const email = document.getElementById('email-alumno').value;
        const edad = document.getElementById('edad').value;
        const paisNac = document.getElementById('select-paises').value;
        const codCuatrimIni = document.getElementById('cuatrimestre').value;

        // Comprobar que no se repita el email
        
        //pusheamos el estudiante al arreglo usuarios
        if (this.USUARIOS && this.USUARIOS.length < 10) {
            const nuevoEstudiante = RegistroEstudiantil.crearEstudiante(usuario, contrasenia, nombre, apellido, rol, email, edad, paisNac, codCuatrimIni);
            this.USUARIOS.push(nuevoEstudiante);
            localStorage.setItem('usersList', JSON.stringify(this.USUARIOS));
            
            containerMsgs.style = 'background-color: green';
            containerMsgs.innerHTML = 'USUARIO REGISTRADO EXITOSAMENTE';
        } else {
            containerMsgs.style = 'background-color: red';
            containerMsgs.innerHTML = 'NO SE PUEDEN REGISTAR MAS ALUMNOS';
        }

        console.log(this.USUARIOS)
        formulario.reset();
    }
}


if (window.location.href.toString().includes('registro_estudiantil.html')) {
    const registro = new RegistroEstudiantil();
}