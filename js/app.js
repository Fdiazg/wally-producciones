const API = 'https://wally-backend-api-render.onrender.com/producciones'

function cargarPortadasDom() {

    fetch(API)
        .then(res => {
            return res.json();
        })
        .then(data => {

            const dataProd = data.producciones;

            const containerPortadas = document.querySelector(".container-mastering__img");
            // const popupImg = document.querySelector(".popup-portada");
            const divPortadas = document.createElement('div');
            divPortadas.classList.add('portadas');

            dataProd.sort((a, b) => a.orden - b.orden);

            console.log(dataProd);




            // Inicializar la página actual y el límite de imágenes por página
            // let currentPage = 0;
            // let limitPerPage = 24;

            //Cambiar para versión mobile
            // const mediaQuery = window.matchMedia("(max-width: 426px)");
            // if (mediaQuery.matches) {
            //     limitPerPage = 12;
            // }

            // if (window.innerWidth < 768) {
            //     limitPerPage = 16;
            //   }


            //Aplicar portadas de forma random antes de mostrarlas
            // dataMaster.sort(() => Math.random() - 0.5);


            document.querySelector('.loader').style.display = 'block';



            // Función para mostrar las imágenes en la página actual
            const showImages = () => {
                // Eliminar las imágenes anteriores
                divPortadas.innerHTML = '';
                // popupImg.innerHTML = '';

                // Calcular los índices de las imágenes a mostrar
                // const startIndex = currentPage * limitPerPage;
                // const endIndex = startIndex + limitPerPage;4




                // Mostrar las imágenes en el rango calculado
                for (let i = 1; i < dataProd.length; i++) {


                    const img = document.createElement('img');
                    img.src = dataProd[i].linkPortada;
                    img.classList.add("img-portadas")
                    img.alt = `${dataProd[i].nombreProducto}`;
                    

                    img.style.opacity = 0;


                    divPortadas.appendChild(img);
                     

                    //? popup
                    // Agrega el evento click para mostrar el popup
                    img.addEventListener("click", () => {
                        artista = dataProd[i].artista;
                        comentario = dataProd[i].comentario;
                        trabajoRealizado = dataProd[i].trabajoRealizado;
                        nombreLanzamiento = dataProd[i].nombreProducto;
                        fechaLanzamiento = dataProd[i].fechaLanzamiento;
                        linkSpotify = dataProd[i].linkSpotify;
                        linkInstagram = dataProd[i].linkInstagram;
                        currentImg = dataProd[i].linkPortada;


                        popupPortadas(artista, comentario,trabajoRealizado, nombreLanzamiento, fechaLanzamiento, linkSpotify, linkInstagram,currentImg);
                    });
                    //  popupImg.appendChild(img);

                }

                // Ocultar el loader después de cargar las imágenes



                document.querySelector('.loader').style.display = 'none';


                // Agregar el contenedor de imágenes al contenedor principal
                containerPortadas.appendChild(divPortadas);

                setTimeout(() => {
                    for (const img of divPortadas.querySelectorAll('.img-portadas')) {
                      img.style.opacity = 1; // Cambia la opacidad a 1 para mostrar gradualmente con transición
                    }
                  }, 100);
            };

            // Mostrar las imágenes iniciales

            showImages();

            // const derechaBtn = document.getElementById('derecha');
            // const izquierdaBtn = document.getElementById('izquierda');

            // Función para ir a la página siguiente
            // const nextPage = () => {

            //     if ((currentPage + 1) * limitPerPage < dataMaster.length) {
            //         currentPage++;
            //         showImages();
            //         if ((currentPage + 1) * limitPerPage >= dataMaster.length) {
            //             derechaBtn.classList.add("ocultar-botones")
            //         }
            //     }
            // };

            // Función para ir a la página anterior
            // const prevPage = () => {
            //     if (currentPage > 0) {
            //         currentPage--;
            //         showImages();

            //         if (currentPage == 0) {
            //             izquierdaBtn.classList.add("ocultar-botones")
            //         }
            //     }
            // };
            // Asignar la función de ir a la página siguiente al botón "derecha"

            // derechaBtn.addEventListener('click', nextPage);
            // derechaBtn.addEventListener('click', (e) => {
            //     e.preventDefault();
            //     nextPage();
            //     if (currentPage >= 1) {
            //         izquierdaBtn.classList.remove("ocultar-botones")
            //     }
            // })

            // Asignar la función de ir a la página anterior al botón "izquierda"

            // izquierdaBtn.addEventListener('click', (e) => {
            //     e.preventDefault();
            //     prevPage();

            //     if ((currentPage + 1) * limitPerPage < dataMaster.length) {
            //         derechaBtn.classList.remove("ocultar-botones")
            //     }
            // });
        })
        .catch(err => {
            console.log(err)
        });
    // popupPortadas()
}


//TODO Popup
// popupPortadas(currentArtista, comentario,trabajoRealizado, currentLanzamiento, fechaLanzamiento, linkSpotify, linkInstagram,currentImg);

function popupPortadas(artista, comentario,trabajoRealizado, nombreLanzamiento, fechaLanzamiento, linkSpotify,linkInstagram, currentImg) {

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
    trabajoRealizadoElement.textContent =`Trabajo: ${trabajoRealizado}` ;
    popupDescripcion.appendChild(trabajoRealizadoElement);

    const comentarioElement = document.createElement('p');
    comentarioElement.textContent =`Extra: ${comentario}`  ;
    popupDescripcion.appendChild(comentarioElement);





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





