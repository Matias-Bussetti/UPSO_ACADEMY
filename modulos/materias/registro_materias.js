class Materias{
    MATERIAS =[];

   
    constructor(){
        const btn_alta = document.getElementById('btn-alta');
        const btn_modificar=document.getElementById('btn-modificar')

        btn_alta.addEventListener('click', e => {
            e.preventDefault();
            this.darAltaMateria();
        });

        btn_modificar.addEventListener('click', e =>{
            e.preventDefault();
            this.editarMateria();

        });

    }

    //funciones del Admin
    static crearMateria(materia, docente, horario){
        const crearMateria = { id: this.generarID(), materia,docente,horario };
        return crearMateria;

    }
    darAltaMateria() {

        const materia= document.getElementById('input-materia').value
        const docente= document.getElementById('input-docente').value
        const horario= document.getElementById('input-horario').value
        const mensaje = document.getElementById('div-mensajes');

        const nuevaMateria = Materias.crearMateria (materia, docente, horario);

        if (this.MATERIAS && materia !== '' && docente !== '' && horario!== '' ) {

            this.MATERIAS.push(nuevaMateria);

            mensaje.style = 'background-color: green';
            mensaje.innerHTML = 'MATERIA REGISTRADA EXITOSAMENTE'

        } else {
            mensaje.style = 'background-color: red';
            mensaje.innerHTML = 'NO SE REGISTRÓ LA MATERIA'
        }

    };

   static editarMateria(){

    // se puede editar el docente y el horario

    };

    mostrarInfoGeneralMaterias(){
        
    //const informacion= { info :this.darAltaMateria(), habilitacion: this.docente  ? "por hacer" : "hecha", /*cupo:, estudiantes:, emails: */};

        //mostrar info de darAltaMAteria() + habilitacion docente ,cantidad y nombres de estudiantes y sus mails
        //console.log(informacion)
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


    // fin de la clase
}
const materia1 = new Materias();