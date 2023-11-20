class Materias{
    MATERIA_SELECCIONADA;
    
    constructor(){
        const btn_alta = document.getElementById('btn-alta');
        const btn_modificar=document.getElementById('btn-modificar');
        const in_docente= document.getElementById('input-docente');
        const in_dia= document.getElementById('select-dias');
        const in_horarioIni= document.getElementById('input-horario');
        const in_horarioFin= document.getElementById('input-horario-fin');

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
            storageMaterias.push(this.crearMateria('Frontend','Mariana','Lunes', 19, 21, 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Backend','Luis','Martes', 14, 16, 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Base de Datos','Laura','Miércoles', 18, 20, 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Testing','Jose','Jueves', 18, 20, 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Infraestructura','Belen','Viernes', 14, 18, 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Seguridad','Gaston','Lunes', 14, 16, 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Agile','Celeste','Martes', 20, 22, 'por hacer', 1, ['Pepe'] , ['pepeg@gmail.com']));

            localStorage.setItem('materiasList', JSON.stringify(storageMaterias));
        }

        // Se muestran las materias
        this.listarMaterias();
       
        btn_alta.addEventListener('click', e => {
            e.preventDefault();

            if (this.MATERIA_SELECCIONADA) {
                console.log(this.MATERIA_SELECCIONADA);
                this.editarMateria(this.MATERIA_SELECCIONADA, in_docente.value, in_dia.value, in_horarioIni.value, in_horarioFin.value);
                this.listarMaterias();
            } else {
                this.darAltaMateria();
                this.listarMaterias();
            }
        });
    }

    //funciones del Admin
    crearMateria(nombre, docente, dia, horarioIni, horarioFin, habilitacion, cantInscritos, nombInscritos, emailInscritos){
        const materia = { id: Materias.generarID(), nombre, docente, dia, horarioIni, horarioFin, habilitacion, 
            cantInscritos, nombInscritos, emailInscritos};
        return materia;
    }

    darAltaMateria() {
        const materia= document.getElementById('input-materia').value;
        const docente= document.getElementById('input-docente').value;
        const horarioIni= document.getElementById('input-horario').value;
        const horarioFin= document.getElementById('input-horario-fin').value;
        const dia= document.getElementById('select-dias').value;
        const mensaje = document.getElementById('div-mensajes');
        
        const storageMaterias = JSON.parse(localStorage.getItem('materiasList'));
        
        if (storageMaterias && materia !== '' && docente !== '' && horarioIni && horarioFin ) {
            
            const nuevaMateria = this.crearMateria(materia, docente, dia, horarioIni, horarioFin, 'por hacer', 0, [], []);
            const materiaEncontrada = storageMaterias.find(m => m.nombre === materia && m.docente === docente && m.horarioIni === horarioIni && m.horarioFin === horarioFin);

            console.log(materiaEncontrada)

            // Si existe una materia identica a la que se desea crear, no permite crearla
            if (materiaEncontrada) {
                mensaje.style = 'background-color: red';
                mensaje.innerHTML = 'YA EXISTE UNA MATERIA CON ESOS DATOS'
                return;
            }

            storageMaterias.push(nuevaMateria);
            localStorage.setItem('materiasList', JSON.stringify(storageMaterias));

            mensaje.style = 'background-color: green';
            mensaje.innerHTML = 'MATERIA REGISTRADA EXITOSAMENTE'

        } else {
            mensaje.style = 'background-color: red';
            mensaje.innerHTML = 'NO SE REGISTRÓ LA MATERIA'
        }
    };

    editarMateria(id, docente, dia, horarioIni, horarioFin){
        const div_mensaje = document.getElementById('div-mensajes');
        const storageMaterias = JSON.parse(localStorage.getItem('materiasList'));
        let materia = storageMaterias.find(mat => mat.id === id);

        // se puede editar el docente y el horario
        if (materia && docente && dia && horarioIni && horarioFin) {
            materia.docente = docente;
            materia.dia = dia;
            materia.horarioIni = horarioIni;
            materia.horarioFin = horarioFin;

            localStorage.setItem('materiasList', JSON.stringify(storageMaterias));

            div_mensaje.style = 'background-color: green';
            div_mensaje.innerHTML = 'Materia editada correctamente';
        } else {

        }
    };

    listarMaterias() {
        console.log('Listando...');
        const lista_materias = JSON.parse(localStorage.getItem('materiasList'));
        const materias_container = document.getElementById('lista_materias');

        // Se limpian los datos que tenia la lista
        materias_container.innerHTML = '';

        // Se listan las materias
        lista_materias.forEach(materia => {

            const container = document.createElement('div')
            const h4 = document.createElement('h4');
            const btn = document.createElement('button');
            const p_docente = document.createElement('p')
            const p_horario = document.createElement('p')

            container.className = 'card_materia'

            h4.innerHTML = materia.nombre;
            p_docente.innerHTML = materia.docente;
            p_horario.innerHTML = `${materia.dia} de ${materia.horarioIni} a ${materia.horarioFin} hrs ARG`;

            btn.innerHTML = 'Ver mas';

            btn.value = materia.id  // Aca va el id de cada materia

            btn.addEventListener('click', e => {
                // Toma el id de la materia seleccionada
                const selectedID = e.target.value;

                // Si la materia seleccionada ya se encontraba seleccionada, se elimina la seleccion
                if (selectedID === this.MATERIA_SELECCIONADA) {
                    this.MATERIA_SELECCIONADA = undefined;
                    this.cargarDatosForm();
                } else {
                    this.MATERIA_SELECCIONADA = selectedID;
                    this.cargarDatosForm(materia.nombre, materia.docente, materia.horarioIni, materia.horarioFin, materia.dia, materia.nombInscritos, materia.emailInscritos);
                }
                console.log(`Selected id ${selectedID}, MATERIA_SELECCIONADA ${this.MATERIA_SELECCIONADA}`);
            });

            container.appendChild(h4);
            container.appendChild(p_docente);
            container.appendChild(p_horario);
            container.appendChild(btn)
            materias_container.appendChild(container)
        });
    }

    cargarDatosForm(nombre, docente, horarioIni, horarioFin, dia, nombInscritos, emailInscritos) {
        const in_materia = document.getElementById('input-materia');
        const in_docente = document.getElementById('input-docente');
        const in_horarioIni = document.getElementById('input-horario');
        const in_horarioFin = document.getElementById('input-horario-fin');
        const in_dia = document.getElementById('select-dias');
        const div_listaAlumnos = document.getElementById('lista-alumnos');
    
        if (nombre && docente && horarioIni && horarioFin && dia && nombInscritos && emailInscritos) {
            in_materia.value = nombre;
            in_docente.value = docente;
            in_horarioIni.value = horarioIni;
            in_horarioFin.value = horarioFin;
            in_dia.value = dia;
            
            // Se genera el encabezado
            const h5 = document.createElement('h5');
            h3.innerHTML = 'Alumnos';
            div_listaAlumnos.appendChild(h5);

            // Se listan los datos de los alumnos 
            for (let i = 0; i < nombInscritos.length; i++) {
                const p_datos_alumno = document.createElement('p');
                p_datos_alumno.innerHTML = `${nombInscritos[i]} - ${emailInscritos[i]}`;
                div_listaAlumnos.append(p_datos_alumno);
            }
        } else {
            in_materia.value = '';
            in_docente.value = '';
            in_horarioIni.value = '';
            in_horarioFin.value = '';
            in_dia.value = 'Lunes';
            div_listaAlumnos.innerHTML = '';
        }
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
