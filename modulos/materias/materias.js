class Materias{
    MATERIAS = [];
    MATERIA_SELECCIONADA;
    
    constructor(){
        const btn_alta = document.getElementById('btn-alta');
        const btn_modificar=document.getElementById('btn-modificar');

        // Si el usuario NO esta loggeado redirige a login
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (!loggedUser) {
            window.location.href = 'http://127.0.0.1:5500/modulos/login/login.html';
        }

        if (loggedUser.rol === 'STUDENT') {
                document.getElementById('ab_materias').hidden = true;
                this.listarMaterias()
        }

        // Se dan de alta las materias por defecto
        // this.MATERIAS.push(this.crearMateria())

        btn_alta.addEventListener('click', e => {
            e.preventDefault();
            this.darAltaMateria();
        });

        // btn_modificar.addEventListener('click', e => {
        //     e.preventDefault();
        //     this.editarMateria();
        // });
    }

    //funciones del Admin
    crearMateria(nombre, docente, dia, horario, habilitacion, cantInscritos, nombInscritos, emailInscritos){
        const materia = { id: this.generarID(), nombre, docente, dia, horario, habilitacion, 
            cantInscritos, nombInscritos, emailInscritos};
        return materia;
    }

    darAltaMateria() {

        const materia= document.getElementById('input-materia').value
        const docente= document.getElementById('input-docente').value
        const horario= document.getElementById('input-horario').value
        const mensaje = document.getElementById('div-mensajes');

        if (this.MATERIAS && materia !== '' && docente !== '' && horario!== '' ) {
            
            const nuevaMateria = this.crearMateria(materia, docente, 'Lunes', horario, 'por hacer', 0, [], []);
            this.MATERIAS.push(nuevaMateria);
            localStorage.setItem('materiasList', JSON.stringify(storageMaterias));

            mensaje.style = 'background-color: green';
            mensaje.innerHTML = 'MATERIA REGISTRADA EXITOSAMENTE'

        } else {
            mensaje.style = 'background-color: red';
            mensaje.innerHTML = 'NO SE REGISTRÓ LA MATERIA'
        }

    };

    editarMateria(id, docente, dia, horario){
        const storageMaterias = JSON.parse(localStorage.getItem('materiasList'));
        let materia = storageMaterias.find(mat => mat.id === id);

        // se puede editar el docente y el horario
        if (materia && docente && dia && horario) {
            materia.docente = docente;
            materia.dia = dia;
            materia.horario = horario;

            localStorage.setItem('materiasList', JSON.stringify(storageMaterias));
        } else {

        }
    };

    listarMaterias() {

        const container = document.createElement('div')
        const h4 = document.createElement('h4');
        const btn = document.createElement('button');

        container.className = 'card_materia'

        h4.innerHTML = 'Backend'
        btn.innerHTML = 'Editar';

        btn.value = ''  // Aca va el id de cada materia

        container.appendChild(h4);
        container.appendChild(btn)
        document.getElementById('lista_materias').appendChild(container)
    }

    //funcion reciclada
    static generarID() {
        // Genera un ID a partir de una cadena de texto generada aleatoreamente
        const stringRandom = Math.random().toString(36).substring(2, 6);

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