// ui.js
// Controla animaciones, transiciones y feedback visual del juego.

/**
 * Aplica un efecto visual temporal (como un destello o vibración)
 * al contenedor del juego cuando se responde una pregunta.
 * @param {boolean} isCorrect - Indica si la respuesta fue correcta.
 */
export function flashFeedback(isCorrect) {
    const gameScreen = document.getElementById("game-screen");
    const className = isCorrect ? "flash-correct" : "flash-incorrect";

    gameScreen.classList.add(className);

    // Remueve la clase luego de la animación para poder reutilizarla
    setTimeout(() => {
        gameScreen.classList.remove(className);
    }, 600);
}

/**
 * Añade una pequeña animación al botón presionado.
 * @param {HTMLElement} button - Botón seleccionado.
 */
export function animateButton(button) {
    button.classList.add("btn-clicked");
    setTimeout(() => button.classList.remove("btn-clicked"), 200);
}

/**
 * Muestra una transición suave entre pantallas.
 * @param {HTMLElement} from - Sección actual a ocultar.
 * @param {HTMLElement} to - Sección destino a mostrar.
 */
export function transitionScreen(from, to) {
    from.classList.add("fade-out");
    setTimeout(() => {
        from.style.display = "none";
        from.classList.remove("fade-out");
        to.style.display = "block";
        to.classList.add("fade-in");

        setTimeout(() => to.classList.remove("fade-in"), 300);
    }, 300);
}


export function handleOptionSelection(button, isCorrect) {
    // Deshabilita todos los botones después de seleccionar una opción
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add("disabled");
    });

    // Marca la opción seleccionada visualmente
    button.classList.add("selected");

    // Colorea la respuesta según sea correcta o no
    if (isCorrect) {
        button.classList.add("correct");
    } else {
        button.classList.add("incorrect");
    }
}
