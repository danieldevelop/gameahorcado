const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

// tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el)); // Funciona sin problemas
export const tooltipList = [...tooltipTriggerList].map((el) => new bootstrap.Tooltip(el)); // Funciona sin problemas


export const youWin = (icon, message) => {
    Swal.fire({
        icon: icon,
        title: message,
    });
};

export const gameOver = (icon, message, text) => {
    Swal.fire({
        icon: icon,
        title: message,
        text: text,
    });
};