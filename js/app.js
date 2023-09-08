const API = 'https://wally-backend-api-render.onrender.com/producciones'

function cargarPortadasDom() {

    fetch(API)
        .then(res => {
            return res.json();
        })
        .then(data => {
            // console.table(data.mastering)
            const dataMaster = data.producciones;
            const containerPortadas = document.querySelector(".container-mastering__img");
            // const popupImg = document.querySelector(".popup-portada");
            const divPortadas = document.createElement('div');
            divPortadas.classList.add('portadas');


            // Inicializar la página actual y el límite de imágenes por página
            let currentPage = 0;
            let limitPerPage = 24;

            //Cambiar para versión mobile
            const mediaQuery = window.matchMedia("(max-width: 426px)");
            if (mediaQuery.matches) {
                limitPerPage = 12;
            }

            // if (window.innerWidth < 768) {
            //     limitPerPage = 16;
            //   }


            //Aplicar portadas de forma random antes de mostrarlas
            dataMaster.sort(() => Math.random() - 0.5);


            document.querySelector('.loader').style.display = 'block';



            // Función para mostrar las imágenes en la página actual
            const showImages = () => {
                // Eliminar las imágenes anteriores
                divPortadas.innerHTML = '';
                // popupImg.innerHTML = '';

                // Calcular los índices de las imágenes a mostrar
                const startIndex = currentPage * limitPerPage;
                const endIndex = startIndex + limitPerPage;


                // Mostrar las imágenes en el rango calculado
                for (let i = startIndex; i < endIndex && i < dataMaster.length; i++) {
                    const img = document.createElement('img');
                    img.src = dataMaster[i].linkPortada;
                    img.classList.add("img-portadas")
                    img.alt = `${dataMaster[i].nombreProducto} (${dataMaster[i].discoTipo})`;
                    divPortadas.appendChild(img);

                    //? popup
                    // Agrega el evento click para mostrar el popup
                    img.addEventListener("click", () => {
                        currentImg = dataMaster[i].linkPortada;
                        currentArtista = dataMaster[i].artista;
                        currentLanzamiento = dataMaster[i].nombreProducto;
                        discoTipo = dataMaster[i].discoTipo;
                        fechaLanzamiento = dataMaster[i].fechaLanzamiento;
                        linkSpotify = dataMaster[i].linkSpotify;


                        popupPortadas(currentImg, currentArtista, currentLanzamiento, discoTipo, fechaLanzamiento, linkSpotify);
                    });
                    //  popupImg.appendChild(img);

                }

                // Ocultar el loader después de cargar las imágenes
                document.querySelector('.loader').style.display = 'none';


                // Agregar el contenedor de imágenes al contenedor principal
                containerPortadas.appendChild(divPortadas);
            };

            // Mostrar las imágenes iniciales

            showImages();

            const derechaBtn = document.getElementById('derecha');
            const izquierdaBtn = document.getElementById('izquierda');

            // Función para ir a la página siguiente
            const nextPage = () => {

                if ((currentPage + 1) * limitPerPage < dataMaster.length) {
                    currentPage++;
                    showImages();
                   // console.log(currentPage)
                    if ((currentPage + 1) * limitPerPage >= dataMaster.length) {
                        derechaBtn.classList.add("ocultar-botones")
                       // console.log(currentPage)
                    }
                }
            };

            // Función para ir a la página anterior
            const prevPage = () => {
                if (currentPage > 0) {
                    currentPage--;
                    showImages();
                   // console.log(currentPage)

                    if (currentPage == 0) {
                        izquierdaBtn.classList.add("ocultar-botones")
                      //  console.log(currentPage)
                    }
                }
            };
            // Asignar la función de ir a la página siguiente al botón "derecha"

            // derechaBtn.addEventListener('click', nextPage);
            derechaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextPage();
                // popupPortadas();
                if (currentPage >= 1) {
                    izquierdaBtn.classList.remove("ocultar-botones")
                }
            })

            // Asignar la función de ir a la página anterior al botón "izquierda"

            izquierdaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevPage();
                // popupPortadas();

                if ((currentPage + 1) * limitPerPage < dataMaster.length) {
                    derechaBtn.classList.remove("ocultar-botones")
                }
            });
        })
        .catch(err => {
            console.log(err)
        });
    // popupPortadas()
}


//TODO Popup

function popupPortadas(img, artista, nombreLanzamiento, discoTipo, fechaLanzamiento, linkSpotify) {

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
    imgElement.src = img;
    imgElement.alt = nombreLanzamientoElement.textContent;
    popupImg.appendChild(imgElement);


    const fechaLanzamientoElement = document.createElement('p');
    fechaLanzamientoElement.textContent = fechaLanzamiento;
    popupDescripcion.appendChild(fechaLanzamientoElement);

    const linkSpotifyElement = document.createElement('a');
    linkSpotifyElement.href = linkSpotify;
    linkSpotifyElement.target = "_blank"
    // linkSpotifyElement.textContent = 'Escucha aquí! ';
    linkSpotifyElement.innerHTML = ` <i class="bi bi-spotify"></i> Escucha en Spotify!`;

    popupDescripcion.appendChild(linkSpotifyElement);

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





