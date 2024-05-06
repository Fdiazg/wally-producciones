// const API = 'https://wally-backend-api-render.onrender.com/producciones';
const API = 'https://wally-backend-production.up.railway.app/producciones/'


const perPage = 20;
let loading = false;
let page = 1;
let dataProd = [];

function cargarPortadasDom() {
    const containerPortadas = document.querySelector(".container-mastering__img");
    const divPortadas = document.createElement('div');
    divPortadas.classList.add('portadas');

    const loadData = async () => {
        if (loading) return;

        loading = true;

        try {
            const response = await fetch(API);

            const data = await response.json();
            dataProd = data.producciones;


            document.querySelector('.loader').style.display = 'none';
            // dataProd.sort((a, b) => a.orden - b.orden);

            const orderedData = dataProd.sort((a, b) => a.orden - b.orden);

            const finalResponse = dataProd.sort((a, b) => {
                const ordenDiff = a.orden - b.orden;
                if (ordenDiff !== 0) return ordenDiff;

                const dateA = new Date(a.fechaLanzamiento.split('/').reverse().join('-'));
                const dateB = new Date(b.fechaLanzamiento.split('/').reverse().join('-'));
                return dateB - dateA;
            });

            console.log('orderedData', orderedData);
            console.log('finalResponse', finalResponse);
            // Mostrar los primeros elementos
            showPage(finalResponse, page);

            loading = false;
        } catch (error) {
            console.error(error);
            loading = false;
        }
    };

    // Función para mostrar una página de elementos
    const showPage = (data, pageNumber) => {
        const startIndex = (pageNumber - 1) * perPage;
        const endIndex = startIndex + perPage;
        const pageData = data.slice(startIndex, endIndex);



        pageData.forEach((item) => {
            const img = document.createElement('img');
            img.src = item.linkPortada;
            img.classList.add("img-portadas");
            img.alt = item.nombreProducto;
            img.style.opacity = 0;



            img.addEventListener("click", () => {
                const {
                    artista,
                    comentario,
                    trabajoRealizado,
                    nombreProducto,
                    fechaLanzamiento,
                    linkSpotify,
                    linkInstagram,
                    linkPortada
                } = item;

                popupPortadas(artista, comentario, trabajoRealizado, nombreProducto, fechaLanzamiento, linkSpotify, linkInstagram, linkPortada);
            });

            divPortadas.appendChild(img);
        });

        containerPortadas.appendChild(divPortadas);

        setTimeout(() => {
            for (const img of divPortadas.querySelectorAll('.img-portadas')) {
                img.style.opacity = 1;
            }
        }, 100);
    };

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const pixelsDesdeElFinal = 200;



        if (scrollTop + windowHeight >= documentHeight - pixelsDesdeElFinal) {
            page++;
            showPage(dataProd, page);
        }
    });

    loadData();
}



//TODO Popup

function popupPortadas(artista, comentario, trabajoRealizado, nombreLanzamiento, fechaLanzamiento, linkSpotify, linkInstagram, currentImg) {

    // Obtenemos los elementos del DOM del popup
    const popupImg = document.querySelector(".popup-portada");
    const popupDescripcion = document.querySelector(".popup-descripcion");

    // Borramos el contenido anterior del popup
    popupImg.innerHTML = '';
    popupDescripcion.innerHTML = '';

    const artistaElement = document.createElement('p');
    artistaElement.textContent = artista;
    popupDescripcion.appendChild(artistaElement);

    // Creamos los nuevos elementos para mostrar la información de la imagen seleccionada
    const nombreLanzamientoElement = document.createElement('p');
    nombreLanzamientoElement.textContent = `${nombreLanzamiento}`;
    popupDescripcion.appendChild(nombreLanzamientoElement);


    const imgElement = document.createElement('img');
    imgElement.src = currentImg;
    imgElement.alt = nombreLanzamientoElement.textContent;
    popupImg.appendChild(imgElement);


    const fechaLanzamientoElement = document.createElement('p');
    fechaLanzamientoElement.textContent = fechaLanzamiento;
    popupDescripcion.appendChild(fechaLanzamientoElement);


    //comentario,trabajoRealizado

    const trabajoRealizadoElement = document.createElement('p');
    trabajoRealizadoElement.textContent = `Trabajo: ${trabajoRealizado}`;
    popupDescripcion.appendChild(trabajoRealizadoElement);

    const comentarioElement = document.createElement('p');
    comentarioElement.textContent = `Extra: ${comentario}`;
    if (comentario != '') {
        popupDescripcion.appendChild(comentarioElement);
    }






    const linkSpotifyElement = document.createElement('a');
    linkSpotifyElement.href = linkSpotify;
    linkSpotifyElement.target = "_blank"
    // linkSpotifyElement.textContent = 'Escucha aquí! ';
    // linkSpotifyElement.innerHTML = ` <i class="bi bi-spotify"></i> Escucha en Spotify!`;
    linkSpotifyElement.innerHTML = ` <i class="bi bi-spotify"></i>`;

    const linkInstagramElement = document.createElement('a');
    linkInstagramElement.href = linkInstagram;
    linkInstagramElement.target = '_blank'
    linkInstagramElement.innerHTML = `<i class="bi bi-instagram"></i>`


    const rrssElementos = document.createElement('div');

    rrssElementos.classList.add('contenedorRRSS');
    rrssElementos.appendChild(linkSpotifyElement)
    rrssElementos.appendChild(linkInstagramElement)

    popupDescripcion.appendChild(rrssElementos);



    // popupDescripcion.appendChild(linkSpotifyElement);
    // popupDescripcion.appendChild(linkInstagramElement)

    // Mostramos el popup
    const popup = document.querySelector("#popup");

    // Evitar que se abra si el menú está abierto
    const clickx = document.querySelector('.drop-menu');
    if (!clickx.classList.contains('open-menu')) {

        popup.classList.remove("hidden");

    }

    //Cerrar el popup apretando fuera
    const popupContainer = document.querySelector(".popup-container__main");

    popup.addEventListener("click", (e) => {
        if (e.target === popup || popupContainer.contains(e.target)) {
            return;
        } else {
            popup.classList.add("hidden");
        }
    });
}


function closePortadas() {
    const popup = document.querySelector("#popup");
    const closePopup = document.querySelector(".bi-x");
    closePopup.addEventListener("click", () => {
        popup.classList.add("hidden");
    });
}

closePortadas();




cargarPortadasDom()


