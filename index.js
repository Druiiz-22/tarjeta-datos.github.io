//Arreglo para almacenar objetos "Alumnos" con sus atributos
let alumnos = []

/**
 * Función para agregar los datos del alumno ingresado por los input
 */
const agregar = function () {

    //Obtener los valores del input
    const txtNombre = document.getElementById("txtNombre").value;
    const txtCedula = document.getElementById("txtCedula").value;
    const txtMates = document.getElementById("txtMates").value;
    const txtFisica = document.getElementById("txtFisica").value;
    const txtProgr = document.getElementById("txtProgr").value;

    //Convertir los valores numericos en tipo 'Number'
    const cedula = Number(txtCedula)
    const matematicas = Number(txtMates)
    const fisica = Number(txtFisica)
    const programacion = Number(txtProgr)
    //Convertir el nombre en tipo 'String'
    const nombre = txtNombre.toString()

    //Validar los datos ingresados
    if (validarDatos(cedula, matematicas, fisica, programacion) && validarNombre(nombre)) {

        alumnos.push(
            {
                cedula: cedula,
                nombre: nombre,
                matematicas: matematicas,
                fisica: fisica,
                programacion: programacion
            }
        )

        //Mostrar mensaje de éxito
        alert(`El alumno ${alumnos.length} fue agregado exitosamente.`)

        //Reescribir el subtitulo para indicar el número del alumno nuevo que se le ingresarán sus datos
        document.getElementById("lblAlumno").innerText = `Ingese los datos del alumno ` + (alumnos.length + 1) + `:`

        //Vaciar los inputs
        document.getElementById("txtCedula").value = "";
        document.getElementById("txtNombre").value = "";
        document.getElementById("txtMates").value = "";
        document.getElementById("txtFisica").value = "";
        document.getElementById("txtProgr").value = "";

        //Enfocar el primer input
        document.getElementById("txtCedula").focus();

    }

}

/**
 * Función para realizar los calculos de las materias y los alumnos
 */
const calculos = function () {

    //Validar que el registro de alumnos NO esté vacío
    if (alumnos.length == 0) {

        //Mensaje de error
        alert("¡Debe haber al menos 1 alumno registrado!\nIngrese los datos del primer alumno.");
        //Enfocar el input
        document.getElementById("txtCedula").focus();

    } else {
        //================================== CALCULAR CADA ALUMNO ==================================

        let matesPromedio = 0
        let matesMax = 0
        let matesPasada = 0
        let matesAplazada = 0

        let fisicaPromedio = 0
        let fisicaMax = 0
        let fisicaPasada = 0
        let fisicaAplazada = 0

        let prograPromedio = 0
        let prograMax = 0
        let prograPasada = 0
        let prograAplazada = 0

        let materiaUna = 0
        let materiaDos = 0
        let materiaTodas = 0

        //CICLO FOREACH para evaluar cada alumno
        alumnos.forEach(alumno => {

            //Variables para las notas del alumno y las materias pasadas
            const mateNota = alumno.matematicas;
            const fisicaNota = alumno.fisica;
            const progNota = alumno.programacion;
            let pasadas = 0;

            //Evaluar si el alumno aprobó o aplazó en cada materia (y contar cuántas materias ha pasado)
            (mateNota >= 10) ? (matesPasada++, pasadas++) : matesAplazada++;
            (fisicaNota >= 10) ? (fisicaPasada++, pasadas++) : fisicaAplazada++;
            (progNota >= 10) ? (prograPasada++, pasadas++) : prograAplazada++;

            //Validar si el alumno pasó una, dos o todas las materias
            if (pasadas == 1) materiaUna++;
            if (pasadas == 2) materiaDos++;
            if (pasadas == 3) materiaTodas++;

            //Calcular la nota promedio en cada una de las materias
            matesPromedio += mateNota / alumnos.length
            fisicaPromedio += fisicaNota / alumnos.length
            prograPromedio += progNota / alumnos.length

            //Validar si la nota del alumno actual es la mayor de todas en cada materia
            if (mateNota > matesMax) matesMax = mateNota;
            if (fisicaNota > fisicaMax) fisicaMax = fisicaNota;
            if (progNota > prograMax) prograMax = progNota;
        });

        //================================== MOSTRAR LOS ELEMENTOS BÁSICOS ==================================
        //Elemento padre que contendrá los cálculos
        const boxCalculos = document.getElementById('calculos')
        boxCalculos.innerText = ""
        //Elemento para una barra <hr>
        const barra = document.createElement('hr')
        //Elemento para un subtitulo <h2>
        const subtitulo = document.createElement('h2')
        //Elemento para un sub-subtitulo <h3> que mostrará la cantidad de alumnos
        const cantidadAlumnos = document.createElement('h4')

        //AGREGAR LOS ELEMENTOS
        //Agregar la barra
        boxCalculos.appendChild(barra)

        //Agregar el subtitulo
        subtitulo.innerText = "Resultados"
        boxCalculos.appendChild(subtitulo)

        //Agregar la cantidad de alumnos
        cantidadAlumnos.innerText = `Cantidad de alumnos: ${alumnos.length}\n`
        boxCalculos.appendChild(cantidadAlumnos)

        //================================== MOSTRAR LOS CÁLCULOS  ==================================
        //Elementos para los promedios
        const promedioMate = document.createElement('p')
        const promedioFisica = document.createElement('p')
        const promedioProg = document.createElement('p')

        //Elementos para los aprobados
        const aprobadoMate = document.createElement('p')
        const aprobadoFisica = document.createElement('p')
        const aprobadoProg = document.createElement('p')

        //Elementos para los aplazados
        const aplazadoMate = document.createElement('p')
        const aplazadoFisica = document.createElement('p')
        const aplazadoProg = document.createElement('p')

        //Elementos para los que aprobaron una, dos o todas las materias
        const aprobadoUno = document.createElement('p')
        const aprobadoDos = document.createElement('p')
        const aprobadoTres = document.createElement('p')

        //Elementos para las notas máximas en cada materia
        const maximoMate = document.createElement('p')
        const maximoFisica = document.createElement('p')
        const maximoProg = document.createElement('p')

        //ASIGNAR LOS VALORES
        promedioMate.innerText = `Nota promedio de matemáticas: ${matesPromedio.toFixed(2)} pts.`
        promedioMate.className = "mb-5"
        promedioFisica.innerText = `Nota promedio de física: ${fisicaPromedio.toFixed(2)} pts.`
        promedioFisica.className = "mb-5"
        promedioProg.innerText = `Nota promedio de programación: ${prograPromedio.toFixed(2)} pts.`
        promedioProg.className = "mb-20"

        aprobadoMate.innerText = `Cantidad de alumnos que aprobaron matemáticas: ${matesPasada} alumnos.`
        aprobadoMate.className = "mb-5"
        aprobadoFisica.innerText = `Cantidad de alumnos que aprobaron física: ${fisicaPasada} alumnos.`
        aprobadoFisica.className = "mb-5"
        aprobadoProg.innerText = `Cantidad de alumnos que aprobaron programación: ${prograPasada} alumnos.`
        aprobadoProg.className = "mb-20"

        aplazadoMate.innerText = `Cantidad de alumnos que aplazaron matemáticas: ${matesAplazada} alumnos.`
        aplazadoMate.className = "mb-5"
        aplazadoFisica.innerText = `Cantidad de alumnos que aplazaron física: ${fisicaAplazada} alumnos.`
        aplazadoFisica.className = "mb-5"
        aplazadoProg.innerText = `Cantidad de alumnos que aplazaron programación: ${prograAplazada} alumnos.`
        aplazadoProg.className = "mb-20"

        aprobadoUno.innerText = `Cantidad de alumnos que aprobaron 1 materia: ${materiaUna} alumnos.`
        aprobadoUno.className = "mb-5"
        aprobadoDos.innerText = `Cantidad de alumnos que aprobaron 2 materia: ${materiaDos} alumnos.`
        aprobadoDos.className = "mb-5"
        aprobadoTres.innerText = `Cantidad de alumnos que aprobaron todas las materia: ${materiaTodas} alumnos.`
        aprobadoTres.className = "mb-20"

        maximoMate.innerText = `Nota máxima en matemáticas: ${matesMax.toFixed(2)} pts.`
        maximoMate.className = "mb-5"
        maximoFisica.innerText = `Nota máxima en física: ${fisicaMax.toFixed(2)} pts.`
        maximoFisica.className = "mb-5"
        maximoProg.innerText = `Nota máxima en programación: ${prograMax.toFixed(2)} pts.`

        //AGREGAR LOS ELEMENTOS
        boxCalculos.appendChild(promedioMate)
        boxCalculos.appendChild(promedioFisica)
        boxCalculos.appendChild(promedioProg)

        boxCalculos.appendChild(aprobadoMate)
        boxCalculos.appendChild(aprobadoFisica)
        boxCalculos.appendChild(aprobadoProg)

        boxCalculos.appendChild(aplazadoMate)
        boxCalculos.appendChild(aplazadoFisica)
        boxCalculos.appendChild(aplazadoProg)

        boxCalculos.appendChild(aprobadoUno)
        boxCalculos.appendChild(aprobadoDos)
        boxCalculos.appendChild(aprobadoTres)

        boxCalculos.appendChild(maximoMate)
        boxCalculos.appendChild(maximoFisica)
        boxCalculos.appendChild(maximoProg)
    }
}

/**
 * Función para validar los datos numéricos ingresados por el input
 * @param {Number} cedula 
 * @param {Number} matematicas 
 * @param {Number} fisica 
 * @param {Number} programacion 
 * @returns Verdadero si todas están correcta, falso si alguna es inválida.
 */
const validarDatos = (cedula, matematicas, fisica, programacion) => {

    //Validar que la cédula esté en un rango entre 1 y 99 millones
    if (cedula < 1 || cedula > 99999999) {
        alert(`La cédula ingresada es inválida.\nPor favor, vuelva a ingresarla`)
        document.getElementById("txtCedula").focus()
        return false
    }

    //Validar que la nota de matemáticas esté en un rango entre 1 y 20 pt
    if (matematicas < 1 || matematicas > 20) {
        alert(`La nota de matemáticas ingresada es inválida.\nPor favor, vuelva a ingresarla`)
        document.getElementById("txtMates").focus()
        return false
    }

    //Validar que la nota de fisica esté en un rango entre 1 y 20 pt
    if (fisica < 1 || fisica > 20) {
        alert(`La nota de física ingresada es inválida.\nPor favor, vuelva a ingresarla`)
        document.getElementById("txtFisica").focus()
        return false
    }

    //Validar que la nota de programacion esté en un rango entre 1 y 20 pt
    if (programacion < 1 || programacion > 20) {
        alert(`La nota de programación ingresada es inválida.\nPor favor, vuelva a ingresarla`)
        document.getElementById("txtProgr").focus()
        return false
    }

    //Booleano para comprobar si hubo una coincidencia con las cédulas
    let coincidencia = false;
    //CICLO EVERY que evaluará cada una de las cédulas y se detendrá
    //si encuentra alguna coincidencia
    alumnos.every(alumno => {

        //Validar que la cédula ingresada por el input NO se encuentre registrada
        if(cedula == alumno.cedula){

            //Mensaje de error
            alert(`La cédula ${cedula} ya se encuentra registrada.\nPor favor, verifique su cédula.`);
            //Enfocar el input de la cédula
            document.getElementById("txtCedula").focus();

            coincidencia = true;

            //Return false para detener el ciclo every
            return false;
        } 

        //Return true para seguir con el ciclo every
        return true;
    });

    //Retornar TRUE en caso de que NO haya ninguna coincidencia
    return !coincidencia;
}

/**
 * Función para validar el nombre ingresado por el input, según el formato establecido
 * por la expresión regular.
 * @param {String} nombre 
 * @returns 
 */
const validarNombre = nombre => {

    //Expresión regular que evalúa una cadena con el siguiente formato:
    // - Debe empezar con 1 letra mayúscula.
    // - Debe seguir con 1, o más letras, en minuscula, luego de la primera en mayuscula.
    // - Puede tener, o no, un espacio
    // - Lo anterior se puede hacer 1 o 2 veces
    let expresion = /^([A-Z]{1}[a-z]+[ ]?){1,2}$/;

    //Validar que el nombre cumpla con el formato correcto
    if (expresion.test(nombre)){
        return true

    } else {
        //Mensaje de error
        alert(`El nombre '${nombre}' es inválido.\nPor favor, ingrese nuevamente el nombre.`)
        document.getElementById("txtNombre").focus()
        return false;
    };
}