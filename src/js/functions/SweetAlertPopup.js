// ----------------------------------------------------------
// Using Sweet Alert Library (https://sweetalert2.github.io/)
// ----------------------------------------------------------

export const SuccessPopup = (message) => {
    Swal.fire('Sukces', message, 'success');
};

export const ErrorPopup = (message) => {
    Swal.fire('Błąd', message, 'error');
};

export const WarningPopup = (message) => {
    Swal.fire('Uwaga', message, 'warning');
};

export const InfoPopup = (message) => {
    Swal.fire('Informacja', message, 'info');
};

export const QuestionPopup = (message) => {
    Swal.fire('Zapytanie', message, 'question');
};

export const ConfirmDialog = (
    title = 'Czy jesteś pewien?',
    text = 'Nie będziesz mógł tego cofnąć!',
    confirmButtonText = 'Tak, jestem pewien.',
    cancelButtonText = 'Anuluj',
    fncSuccess,
) => {
    Swal.fire({
        title,
        text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
    }).then((result) => {
        if (result.value) {
            // Success
            fncSuccess();
        }
    });
};
