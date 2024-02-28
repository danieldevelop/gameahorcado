import { palabras } from './words.js';

let $html = 
{
    hombre: document.getElementById('al-hombre'),
    adivinado: document.querySelector('.al-adivinado'),
    errado: document.querySelector('.al-errado')
}

export const escojerPalabraSecreta = () => 
{
    let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    return palabraSecreta;
};

const escribirLetraCorrecta = (palabra, adivinado, $elem) => 
{
    $elem = $html.adivinado; // Actualizamos la palabra a adivinar
    $elem.innerHTML = ''; // Borramos los elementos anteriores

    for (let letra of palabra) {
        let $span = document.createElement('span');
        let $txt = document.createTextNode('');

        if (adivinado.has(letra)) {
            $txt.nodeValue = letra;
        }

        $span.setAttribute('class', 'al-adivinada d-inline-block text-center align-middle')
        $span.appendChild($txt);
        $elem.appendChild($span);
    }
};

const escribirLetraIncorrecta = (errado, $elem) => 
{
    $elem = $html.errado; // Actualizamos las letras incorrectas
    $elem.innerHTML = ''; // Borramos los elementos anteriores
    
    for (let letra of errado) {
        let $span = document.createElement('span');
        let $txt = document.createTextNode(letra);
        $span.setAttribute('class', 'al-errada d-inline-block text-center')
        $span.appendChild($txt);
        $elem.appendChild($span);
    }
};

export const dibujarLineas = (juego) => 
{
    let $elem = $html.hombre; // Actualizamos la imagen del hombre
    let estado = juego.states; // Obtenemos el estado actual del juego, que referencia a la imagen a mostrar

    if (estado === 8) {
        estado = juego.previo; // Si el estado es 8, entonces mostramos la imagen anterior
    }
    $elem.src = `assets/img/states/0${estado}.png`;

    escribirLetraCorrecta(juego.palabra, juego.adivinado);
    (juego.errado.size > 0) ? escribirLetraIncorrecta(juego.errado) : $html.errado.innerHTML = '';
};

export const adivinarLetra = (juego, letra) => {
    const estado  = juego.states;

    // Si ya se ha perdido, o ganado, no hay que hacer nada
    if (estado === 1 || estado === 0) return;

    const adivinado = juego.adivinado;
    const errado = juego.errado;
    // Si ya hemos adivinado o errado la letra,, no hay que hacer nada
    if (adivinado.has(letra) || errado.has(letra)) return;

    const letras = juego.letras;
    // Si es letra de la palabra
    if (letras.has(letra)) {
        adivinado.add(letra); // Agregamos a la lista de letras adivinadas
        juego.restante--; // Actualizamos las letras restantes

        // Si ya se ha ganado, debemos indicarlo
        if (juego.restante === 0) {
            juego.previo = juego.states; // Guardamos el estado actual
            juego.states = 8; // Actualizamos el estado
        } 
    } else {
        // Si no es letra de la palabra, acercamos al hombre un paso más de su horca
        juego.states--;
        // Agregamos la letra, a la lista de letra erradas
        errado.add(letra);
    }
}