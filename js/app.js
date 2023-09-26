const API = 'https://wally-backend-api-render.onrender.com/producciones'




function cargarPortadasDom() {

    fetch(API)
        .then(res => {
            return res.json();
        })
        .then(data => {

            const dataProd = data.producciones;

            const containerPortadas = document.querySelector(".container-mastering__img");
            const divPortadas = document.createElement('div');
            divPortadas.classList.add('portadas');



            function convertirFecha(fecha) {
                const partes = fecha.split('/');
                const fechaFormateada = `${partes[2]}-${partes[1]}-${partes[0]}`;
                return new Date(fechaFormateada);
            }

            // dataProd.sort((a, b) => {
            //     const fechaA = convertirFecha(a.fechaLanzamiento);
            //     const fechaB = convertirFecha(b.fechaLanzamiento);
            //     return fechaB - fechaA;
            // });


             dataProd.sort((a, b) => a.orden - b.orden);



            document.querySelector('.loader').style.display = 'block';



            // Función para mostrar las imágenes en la página actual
            const showImages = () => {
                divPortadas.innerHTML = '';

                // for (let i = 1; i < dataProd.length; i++) {
                for (let i = 1; i < dataProd.length; i++) {

            


                    const img = document.createElement('img');
                    img.src = dataProd[i].linkPortada;
                    img.classList.add("img-portadas")
                    img.alt = `${dataProd[i].nombreProducto}`;


                    img.style.opacity = 0;


                    divPortadas.appendChild(img);


                    //? popup

                    img.addEventListener("click", () => {
                        artista = dataProd[i].artista;
                        comentario = dataProd[i].comentario;
                        trabajoRealizado = dataProd[i].trabajoRealizado;
                        nombreLanzamiento = dataProd[i].nombreProducto;
                        fechaLanzamiento = dataProd[i].fechaLanzamiento;
                        linkSpotify = dataProd[i].linkSpotify;
                        linkInstagram = dataProd[i].linkInstagram;
                        currentImg = dataProd[i].linkPortada;


                        popupPortadas(artista, comentario, trabajoRealizado, nombreLanzamiento, fechaLanzamiento, linkSpotify, linkInstagram, currentImg);
                    });

                }


                document.querySelector('.loader').style.display = 'none';


                // Agregar el contenedor de imágenes al contenedor principal
                containerPortadas.appendChild(divPortadas);

                setTimeout(() => {
                    for (const img of divPortadas.querySelectorAll('.img-portadas')) {
                        img.style.opacity = 1;
                    }
                }, 100);
            };

            // window.addEventListener('scroll', function () {
            //     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //     const windowHeight = window.innerHeight;
            //     const documentHeight = document.documentElement.scrollHeight;

            //     const pixelsDesdeElFinal = 200;

            //     if (scrollTop + windowHeight >= documentHeight - pixelsDesdeElFinal) {
            //     }
            // });


            showImages();

        })
        .catch(err => {
            console.log(err)
        });
    // popupPortadas()
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





