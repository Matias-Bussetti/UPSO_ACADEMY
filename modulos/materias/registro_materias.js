class Materias{
    MATERIAS =[];

    constructor(){

    }

    //funciones del Admin
    static crearMateria(materia, docente, horario){
        const crearMateria = { id: this.generarID(), materia,docente,horario };
        return crearMateria;

    }
    darAltaMateria() {
        const materia= document.getElementById('input-materia')
        const docente= document.getElementById('input-docente')
        const horario= document.getElementById('input-horario')

        const nuevaMateria = Materias.crearMateria(materia, docente, horario);
        if (this.MATERIAS ) {
            this.MATERIAS.push(nuevaMateria);

            containerMsgs.style = 'background-color: green';
            containerMsgs.innerHTML = 'USUARIO REGISTRADO EXITOSAMENTE'
        } else {
            containerMsgs.style = 'background-color: red';
            containerMsgs.innerHTML = 'NO SE PUEDEN REGISTAR MAS ALUMNOS'
        }

    };

   static editarMateria(){

    // se puede editar el docente y el horario

    };

    mostrarInfoGeneralMaterias(){

    };

    //funcion reciclada
    static generarID() {
        // Genera un ID a partir de una cadena de texto generada aleatoreamente
        const stringRandom = Math.random().toString(36).substring(2, 10);

        return stringRandom;
    }






    //funciones de alumnos

    incripcionMateria(){

    };

    darseDeBaja(){

    };

    visualizarInfoMateriasInscirpitas(){

    };
}