const accesKey = 'CKezNCaFFLOtajyGUXslkTVS7WIRzLuz1iOymmCkIco';
const endPoint = 'https://api.unsplash.com/';///search/photos

async function getImages(query, search = false) {
    let response = await fetch(endPoint + query +
        '&client_id=' + accesKey);
    let jsonResponse = await response.json();
    if (search == true) {
        jsonResponse = jsonResponse.results;
    }
    let imagesList = await jsonResponse;
    createImages(imagesList);

}
document.addEventListener('DOMContentLoaded', function () {
    getImages('photos/random?count=20');
})



function createImages(imagesList) {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 0; i < imagesList.length; i++) {
        const image = document.createElement('IMG');
        image.src = imagesList[i].urls.thumb;
        image.classList.add(imagesList[i].id);
        image.onclick = mostrarImagen;
        const contimg = document.createElement('DIV');
        contimg.classList.add('imagenes');
        contimg.appendChild(image);

        galeria.appendChild(contimg);
    }
}

function mostrarImagen(e) {
    const id = e.target.classList.value;
    const imagen = document.createElement('IMG');
    imagen.src = `https://source.unsplash.com/${id}`;
    const imgGr = document.createElement('DIV');
    imgGr.classList.add('img-grande');
    imgGr.appendChild(imagen);
    const overlay = document.createElement('DIV');
    overlay.appendChild(imgGr);
    overlay.classList.add('overlay');

    overlay.onclick = function () {
        overlay.remove();
    }

    // Boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    // Cuando se presiona, se cierra la imagen
    cerrarImagen.onclick = function () {
        overlay.remove();
    }
    overlay.appendChild(cerrarImagen)


    // Mostrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}

// const search = document.getElementById("search");

function send() {

    if (search.value == "") {

    } else {
        getImages('search/photos?query=' + search.value, true);
        search.value = "";
    }
}

search.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        send();
    }
}, false);