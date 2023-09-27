
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


