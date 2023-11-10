class Login {
    // INP=>INPUT
    INP_USERNAME = document.getElementById('inp_username');
    INP_PASSWORD = document.getElementById('inp_password');
    BTN_SUBMIT = document.getElementById('btn_submit');

    constructor() {
        this.BTN_SUBMIT.addEventListener('click', e => {
            console.log();
        });
        console.log(RegistroEstudiantil.crearUsuario('Pepe', 'Pepee', 'pepepepee@pepe.com', 'STUDENT', 25, 'Argentina', '1C23'));
        console.log(RegistroEstudiantil.crearEstudiante('admin', 'admin', '', 'ADMIN'));
    }
}

if (window.location.href.toString().includes('login.html')) {
    const log = new Login()
}
