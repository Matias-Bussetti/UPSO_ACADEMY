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

        if (!localStorage.getItem('materiasList')) {
            // Al instanciarse la clase, se guardan los usuarios en el local storage
            const storageMaterias = [];
            storageMaterias.push(this.crearMateria('Frontend','Mariana','Lunes','19 a 21', 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Backend','Luis','Martes','14 a 16', 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Base de Datos','Laura','Miércoles','18 a 20', 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Testing','Jose','Jueves','18 a 20', 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Infraestructura','Belen','Viernes','14 a 18', 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Seguridad','Gaston','Lunes','14 a 16', 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Agile','Celeste','Martes','20 a 22', 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));

            localStorage.setItem('materiasList', JSON.stringify(storageMaterias));
           
        }

        // Se muestran las materias
        this.listarMaterias();
       
        btn_alta.addEventListener('click', e => {
            e.preventDefault();
            this.darAltaMateria();

            if (this.MATERIA_SELECCIONADA) {
                return;
            }


        });
    }

    //funciones del Admin
    crearMateria(nombre, docente, dia, horario, habilitacion, cantInscritos, nombInscritos, emailInscritos){
        const materia = { id: Materias.generarID(), nombre, docente, dia, horario, habilitacion, 
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
        console.log('a')
        const lista_materias = JSON.parse(localStorage.getItem('materiasList'));
        const materias_container = document.getElementById('lista_materias');

        lista_materias.forEach(materia => {

            const container = document.createElement('div')
            const h4 = document.createElement('h4');
            const btn = document.createElement('button');
            const p_docente = document.createElement('p')
            const p_horario = document.createElement('p')

            container.className = 'card_materia'

            h4.innerHTML = materia.nombre;
            p_docente.innerHTML = materia.docente;
            p_horario.innerHTML = materia.dia + ' ' + materia.horario + 'hrs ARG';

            btn.innerHTML = 'Editar';

            btn.value = materia.id  // Aca va el id de cada materia

            btn.addEventListener('click', e => {
                // Toma el id de la materia seleccionada
                const selectedID = e.target.value;
                // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            });

            container.appendChild(h4);
            container.appendChild(p_docente);
            container.appendChild(p_horario);
            container.appendChild(btn)
            materias_container.appendChild(container)

        });
        
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

if (window.location.href.toString().includes('materias.html')) {
    const materia1 = new Materias();
}
