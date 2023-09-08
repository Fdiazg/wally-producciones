
// ? API PAISES
const APIPAISES = 'https://restcountries.com/v2/all';

function llamadaPaises() {
    const seleccionPaises = document.querySelector('#country');
    fetch(APIPAISES)

        .then(res => {
            return res.json();
        })
        .then(data => {
            let output = '';
            output = `<option disabled selected> Seleccione su país</option> `
            data.forEach(pais => {
                output += `<option value="${pais.name}"> ${pais.name} </option>`;
            });
            seleccionPaises.innerHTML = output;
        })
        .catch(err => {
            console.log(err);
        })
}

llamadaPaises();


//? Fecha actual


// Obtener el elemento de entrada de fecha de inicio y final
const fechaInicio = document.querySelector("#dateMix");
const fechaFin = document.querySelector("#dateMaster");

// Establecer la fecha mínima en el campo de entrada de fecha de inicio
const fechaActual = new Date();
const fechaActualISO = fechaActual.toISOString().split("T")[0];
fechaInicio.setAttribute("min", fechaActualISO);

// Agregar un controlador de eventos change al campo de entrada de fecha de inicio
fechaInicio.addEventListener("change", function () {
    // Obtener la fecha seleccionada en el campo de entrada de fecha de inicio
    const fechaInicioSeleccionada = new Date(this.value);

    // Establecer la fecha mínima en el campo de entrada de fecha de final
    const fechaInicioISO = fechaInicioSeleccionada.toISOString().split("T")[0];
    fechaFin.setAttribute("min", fechaInicioISO);

    if (fechaInicio.value === '') {
        fechaFin.disabled = true;
    } else {
        fechaFin.disabled = false;
    }

});


