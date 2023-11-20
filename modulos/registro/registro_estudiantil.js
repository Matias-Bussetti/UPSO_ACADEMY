class RegistroEstudiantil {
    USUARIOS = [];

    constructor() {
        // Si el usuario loggeado no es admin, redirige a login
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (loggedUser && loggedUser.rol !== 'ADMIN') {
            window.location.href = 'http://127.0.0.1:5500/modulos/login/login.html';
            console.log('not admin')
        }

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

        // si se da de alta un usuario desde otra pagina no se actualiza
        this.USUARIOS = JSON.parse(localStorage.getItem("usersList"));


        // funcion para mostrar y ocultar el formulario -------------------

        const botonShow= document.getElementById('btn-mostrarform');
        const formulario= document.getElementById('form-registro');
        formulario.style.display= "none";

        botonShow.addEventListener('click',mostrarForm);

        function mostrarForm() {
            
            if (formulario.style.display === "none" || formulario.style.display === "") {
                formulario.style.display = "block"; 
            } else {
                formulario.style.display = "none";
            }
        }
        
        //BOTON DE "CERRAR SESION"
       
        const btncerrar = document.getElementById('cerrar-sesion');

        btncerrar.addEventListener('click', cerrarSesion);
        
        function cerrarSesion() {
            const confirmacion = window.confirm('¿Deseas cerrar sesión?');
        
            if (confirmacion) {
                // Redirigir al usuario al archivo index.html
                window.location.href = 'http://127.0.0.1:5500/index.html'; // Ruta relativa
            }
        }
        
        
        //-------------------------------------------------------

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
            // console.log('Nuevo usuario creado')
            return {msg: 'USUARIO REGISTRADO EXITOSAMENTE'};
        } else {
            // console.log('El usuario ya existe')
            return {msg: 'EL USUARIO YA EXISTE'};
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

        // this.USUARIOS = JSON.parse(localStorage.getItem("usersList"));
        const usuariosStorage = JSON.parse(localStorage.getItem("usersList"));

        // Comprueba que se hayan cargado los campos
        if (!nombre || !apellido || !usuario || !contrasenia ||  !email || !rol || !email || !edad || !paisNac || !codCuatrimIni) {
            containerMsgs.style = 'background-color: red';
            containerMsgs.innerHTML = 'POR FAVOR COMPLETE TODOS LOS CAMPOS';
            return;
        }
        
        //pusheamos el estudiante al arreglo usuarios
        if (usuariosStorage && usuariosStorage.length <= 10) {
            const nuevoEstudiante = RegistroEstudiantil.crearEstudiante(usuario, contrasenia, nombre, apellido, rol, email, edad, paisNac, codCuatrimIni);
            const res = RegistroEstudiantil.guardarUsuarioStorage(nuevoEstudiante);
            // usuariosStorage.push(nuevoEstudiante);
            // localStorage.setItem('usersList', JSON.stringify(usuariosStorage));

            containerMsgs.style = 'background-color: green';
            containerMsgs.innerHTML = res.msg;
        } else {
            containerMsgs.style = 'background-color: red';
            containerMsgs.innerHTML = 'NO SE PUEDEN REGISTAR MAS ALUMNOS';
        }

        console.log(usuariosStorage)
        formulario.reset();
    }
}


if (window.location.href.toString().includes('registro_estudiantil.html')) {
    const registro = new RegistroEstudiantil();
}