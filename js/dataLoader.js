// D:\enviromentDev\Proyects\html\5\Data\src\js\dataLoader.js

// Encargado de cargar las preguntas desde el archivo JSON.

// Ruta del archivo JSON (ajusta si cambias la estructura)
const QUESTIONS_PATH = "data/questions.json";

/**
 * Carga el archivo JSON con las preguntas del juego.
 * @returns {Promise<Array>} Promesa que resuelve con un array de preguntas.
 */
export async function loadQuestions() {
    try {
        const response = await fetch(QUESTIONS_PATH);

        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
        }

        const questions = await response.json();

        // Validación rápida para asegurar que el formato sea correcto
        if (!Array.isArray(questions)) {
            throw new Error("El formato del archivo JSON no es válido (debe ser un array).");
        }

        return questions;
    } catch (error) {
        console.error("❌ No se pudieron cargar las preguntas:", error);
        return []; // Devuelve un array vacío para evitar que el juego se rompa
    }
}
