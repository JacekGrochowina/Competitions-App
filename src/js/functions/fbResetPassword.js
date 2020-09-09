import { SuccessPopup, ErrorPopup } from './SweetAlertPopup.js';

export const fbResetPassword = (email, isValid) => {
    if (isValid()) {
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(function () {
                SuccessPopup(
                    `Wysłano email z linkiem resetującym hasło na adres ${email}.`,
                );
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(`${errorCode} | ${errorMessage}`);

                ErrorPopup(
                    `Nie udało się wysłać emaila z linkiem resetującym hasło na adres ${email}.`,
                );
            });
    }
};
