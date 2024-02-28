import { tooltipList, youWin, gameOver } from './utils.js';
import { escojerPalabraSecreta, dibujarLineas, adivinarLetra } from './ahorcado.js';

;(() => {
    'use strict';

    tooltipList;

    let juego = null; // Variable para almacenar la configuracion actual
    let finalizado = false; // Para ver si ya se ha enviado alguna alerta

    window.nuevoJuego = () => {
        const palabra = escojerPalabraSecreta();
        juego = {};
        juego.palabra = palabra;
        juego.states = 7;
        juego.adivinado = new Set();
        juego.errado = new Set();
        finalizado = false;
        let letras = new Set();
        
        for (let letra of palabra) {
            letras.add(letra);
        }
        juego.letras = letras;
        juego.restante = letras.size;

        dibujarLineas(juego);
    };

    window.addEventListener('keydown', (e) => {
        const letra = e.key.toUpperCase();

        if (!/^[A-ZÑ]$/.test(letra)) return;
        
        adivinarLetra(juego, letra);
        const estado = juego.states;

        if (estado === 8 && !finalizado) {
            setTimeout(youWin('success', 'Ganaste, felicidades'), 0);
            finalizado = true;
        } else if (estado === 1 && !finalizado) {
            const palabra = juego.palabra;
            let fn = gameOver.bind(null, 'error', 'Perdiste', `La palabra era: ${palabra}`);
            setTimeout(fn, 0);
            finalizado = true;
        }

        dibujarLineas(juego);
    });
    
    nuevoJuego();
})();