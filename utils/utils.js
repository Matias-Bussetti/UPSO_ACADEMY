 crearUsuario(usuario, password, nombre, apellido, rol, email) {
    const usr = { id: this.generarID(), usuario, password, nombre, apellido, rol, email };
    return usr;
}

 crearEstudiante(usuario, password, nombre, apellido, rol, email, edad, paisNac, codCuatrimIni) {
    const usr = this.crearUsuario(usuario, password, nombre, apellido, rol, email);
    usr.edad = edad;
    usr.paisNac = paisNac;
    usr.codCuatrimIni = codCuatrimIni;

    return usr;
}

 generarID() {
    // Genera un ID a partir de una cadena de texto generada aleatoreamente
    const stringRandom = Math.random().toString(36).substring(2, 10);

    return stringRandom;
}