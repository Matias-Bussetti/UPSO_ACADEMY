class Materias{
    MATERIA_SELECCIONADA;
    
    constructor(){
        const btn_alta = document.getElementById('btn-alta');
        const btn_modificar =document.getElementById('btn-modificar');
        const link_registro =document.getElementById('link-registro');
        const in_docente = document.getElementById('input-docente');
        const in_dia = document.getElementById('select-dias');
        const in_habilitacion = document.getElementById('select-habilitacion');
        const in_horarioIni = document.getElementById('input-horario');
        const in_horarioFin = document.getElementById('input-horario-fin');

        // Si el usuario NO esta loggeado redirige a login
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (!loggedUser) {
            window.location.href = 'http://127.0.0.1:5500/modulos/login/login.html';
        }

        if (!localStorage.getItem('materiasList')) {
            // Al instanciarse la clase, se guardan los usuarios en el local storage
            const storageMaterias = [];
            storageMaterias.push(this.crearMateria('Frontend','Mariana','Lunes', 19, 21, 'Por hacer', 1, ['Pepe Gonzalez'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Backend','Luis','Martes', 14, 16, 'Por hacer', 1, ['Pepe Gonzalez'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Base de Datos','Laura','Miércoles', 18, 20, 'Por hacer', 1, ['Pepe Gonzalez'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Testing','Jose','Jueves', 18, 20, 'Por hacer', 1, ['Pepe Gonzalez'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Infraestructura','Belen','Viernes', 14, 18, 'Por hacer', 1, ['Pepe Gonzalez'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Seguridad','Gaston','Lunes', 14, 16, 'Por hacer', 1, ['Pepe Gonzalez'] , ['pepeg@gmail.com']));
            storageMaterias.push(this.crearMateria('Agile','Celeste','Martes', 20, 22, 'Por hacer', 0, [] , []));

            localStorage.setItem('materiasList', JSON.stringify(storageMaterias));
        }

        if (loggedUser.rol === 'STUDENT') {
                document.getElementById('link-registro').hidden = true;
                document.getElementById('ab_materias').hidden = true;
                this.listarMaterias()
                this.cargarPanelUsuario(loggedUser)
        }

        // Se muestran las materias
        this.listarMaterias();
       
        btn_alta.addEventListener('click', e => {
            e.preventDefault();

            if (this.MATERIA_SELECCIONADA) {
                console.log(this.MATERIA_SELECCIONADA);
                this.editarMateria(this.MATERIA_SELECCIONADA, in_docente.value, in_dia.value, in_horarioIni.value, in_horarioFin.value, in_habilitacion.value);
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
            
            const nuevaMateria = this.crearMateria(materia, docente, dia, horarioIni, horarioFin, 'Por hacer', 0, [], []);
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

    editarMateria(id, docente, dia, horarioIni, horarioFin, habilitacion){
        const div_mensaje = document.getElementById('div-mensajes');
        const storageMaterias = JSON.parse(localStorage.getItem('materiasList'));
        let materia = storageMaterias.find(mat => mat.id === id);

        // se puede editar el docente y el horario
        if (materia && docente && dia && horarioIni && horarioFin && habilitacion) {
            materia.docente = docente;
            materia.dia = dia;
            materia.horarioIni = horarioIni;
            materia.horarioFin = horarioFin;
            materia.habilitacion = habilitacion;


            localStorage.setItem('materiasList', JSON.stringify(storageMaterias));

            div_mensaje.style = 'background-color: green';
            div_mensaje.innerHTML = 'Materia editada correctamente';
        } else {

        }
    };

    listarMaterias() {
        console.log('Listando...');
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        const materias_container = document.getElementById('lista_materias');
        let lista_materias = JSON.parse(localStorage.getItem('materiasList'));

        // Se filtan las materias, solo quedan las que tienen el alumno inscrito
        if (loggedUser.rol === 'STUDENT') {
            lista_materias = lista_materias.filter(materia => materia.emailInscritos.includes(loggedUser.email));
        }

        // Se limpian los datos que tenia la lista
        materias_container.innerHTML = '';

        // Se listan las materias
        lista_materias.forEach(materia => {
            const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
            const container = document.createElement('div')
            const h4 = document.createElement('h4');
            const btn = document.createElement('button');
            const p_docente = document.createElement('p')
            const p_horario = document.createElement('p')

            container.className = 'card_materia'

            h4.innerHTML = materia.nombre;
            p_docente.innerHTML = materia.docente;
            p_horario.innerHTML = `${materia.dia} de ${materia.horarioIni} a ${materia.horarioFin} hrs ARG`;
            btn.innerHTML = loggedUser.rol === 'ADMIN' ? 'Ver mas' : 'Darse de baja';
            // btn.innerHTML = 'Ver mas';

            btn.value = materia.id  // Aca va el id de cada materia

            btn.addEventListener('click', e => {
                // Toma el id de la materia seleccionada
                const selectedID = e.target.value;

                if (loggedUser.rol === 'ADMIN') {                 
                    this.cargarDatosForm();
                    // Si la materia seleccionada ya se encontraba seleccionada, se elimina la seleccion
                    if (selectedID === this.MATERIA_SELECCIONADA) {
                        this.MATERIA_SELECCIONADA = undefined;
                        // this.cargarDatosForm();
                    } else {
                        this.MATERIA_SELECCIONADA = selectedID;
                        this.cargarDatosForm(materia);
                    }
                } else {
                    this.darseDeBaja(materia.id);
                    this.listarMaterias();
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

    cargarDatosForm(materia) {
        const in_materia = document.getElementById('input-materia');
        const in_docente = document.getElementById('input-docente');
        const in_horarioIni = document.getElementById('input-horario');
        const in_horarioFin = document.getElementById('input-horario-fin');
        const in_dia = document.getElementById('select-dias');
        const in_habilitacion = document.getElementById('select-habilitacion');
        const div_listaAlumnos = document.getElementById('lista-alumnos');
    
        if (materia) {
            in_materia.value = materia.nombre;
            in_docente.value = materia.docente;
            in_horarioIni.value = materia.horarioIni;
            in_horarioFin.value = materia.horarioFin;
            in_dia.value = materia.dia;
            in_habilitacion.value = materia.habilitacion;
            
            // Se genera el encabezado
            const h5 = document.createElement('h5');
            h5.innerHTML = `Alumnos: ${materia.cantInscritos}`;
            div_listaAlumnos.appendChild(h5);

            // Se listan los datos de los alumnos 
            for (let i = 0; i < materia.nombInscritos.length; i++) {
                const p_datos_alumno = document.createElement('p');
                p_datos_alumno.innerHTML = `${materia.nombInscritos[i]} - ${materia.emailInscritos[i]}`;
                div_listaAlumnos.append(p_datos_alumno);
            }
        } else {
            in_materia.value = '';
            in_docente.value = '';
            in_horarioIni.value = '';
            in_horarioFin.value = '';
            in_dia.value = 'Lunes';
            in_habilitacion.value = 'Por hacer';
            div_listaAlumnos.innerHTML = '';
        }
    }

    cargarPanelUsuario(logUser) {
        const h4 = document.getElementById('titulo-nav');
        const container = document.getElementById('panel-datos-usuario');
        const nombre = document.createElement('p');
        const email = document.createElement('p');

        h4.innerHTML = 'Panel Estudiante';
        nombre.innerHTML = `${logUser.nombre} ${logUser.apellido}`;
        email.innerHTML = logUser.email;

        container.append(nombre, email)
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

    darseDeBaja(id_materia){
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        const div_mensaje = document.getElementById('div-mensajes');
        const storageMaterias = JSON.parse(localStorage.getItem('materiasList'));
        let materia = storageMaterias.find(mat => mat.id === id_materia);

        // se puede editar el docente y el horario
        if (materia) {
            materia.emailInscritos = materia.emailInscritos.filter(email => email !== loggedUser.email);
            materia.nombInscritos = materia.nombInscritos.filter(nombre => nombre !== `${loggedUser.nombre} ${loggedUser.apellido}`);
            materia.cantInscritos -= materia.cantInscritos;
            localStorage.setItem('materiasList', JSON.stringify(storageMaterias));

            div_mensaje.style = 'background-color: green';
            div_mensaje.innerHTML = 'Se dio de baja correctamente';
        } else {
            div_mensaje.style = 'background-color: red';
            div_mensaje.innerHTML = 'Fallo al darse de baja';
        }
        
    };

    visualizarInfoMateriasInscirpitas(){

    };


    // fin de la clase
}

if (window.location.href.toString().includes('materias.html')) {
    const materia1 = new Materias();
}
