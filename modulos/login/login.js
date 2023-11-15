class Login {
    // INP=>INPUT P=>p BTN=>btn
    INP_USERNAME = document.getElementById('inp_username');
    INP_PASSWORD = document.getElementById('inp_password');
    BTN_SUBMIT = document.getElementById('btn_submit');
    P_MSG_DISPLAY = document.getElementById('msg_display');

    constructor() {
        // Al instanciarse la clase, se guardan los usuarios en el local storage
        const usuarios = []
        usuarios.push(RegistroEstudiantil.crearUsuario('admin', 'c0ntr4s3ñ4', 'admin', '', 'ADMIN', 'admin@upsoa.com.ar'));
        usuarios.push(RegistroEstudiantil.crearEstudiante('student', 'c0ntr4s3ñ4', 'Pepe', 'Gonzalez', 'pepeg@gmail.com', 'STUDENT', 25, 'Argentina', '1C23'));
        localStorage.setItem('usersList', JSON.stringify(usuarios));
        

        // Submit login form
        this.BTN_SUBMIT.addEventListener('click', e => {
            e.preventDefault();
            let validado = this.validarUsuario(this.INP_USERNAME.value, this.INP_PASSWORD.value);
            this.P_MSG_DISPLAY.innerHTML = validado.msg;
            this.P_MSG_DISPLAY.style.backgroundColor = validado.valido ? 'green' : 'red';

            if (validado.valido === true) {
                // Guardamos en local storage el nombre de usuario loggeado y el rol
                const loggedUser = validado.usuario;
                localStorage.setItem('loggedUser', JSON.stringify({...loggedUser}));

                // Redireccionamos al sitio correspondiente
                setTimeout(() => {
                    window.location.href = 'http://127.0.0.1:5500/modulos/registro/registro_estudiantil.html'
                }, 3000);
            }

        });
    }

    validarUsuario(usrName, password) {
        const usuarios = JSON.parse(localStorage.getItem('usersList'));
        const usuario = usuarios.find(usr => usr.usuario === usrName);
        // console.log(usuario)

        if (usuario && usuario.password === password) {
            return {valido: true, msg: "credenciales validas", usuario: {usuario: usuario.usuario, rol: usuario.rol}};
        }

        return {valido: false, msg: "usuario o contraseña incorrectos"};
    }
}

if (window.location.href.toString().includes('login.html')) {
    const log = new Login();
}
