import { RESET_PASSWORD } from './elements/Elements.js';
import { fbResetPassword } from './functions/fbResetPassword.js';
import { isValidEmail } from './functions/Validation.js';
import { WarningPopup } from './functions/SweetAlertPopup.js';

const handleResetPassword = () => {
    const form = RESET_PASSWORD.form;
    const email = RESET_PASSWORD.email;

    const isValid = () => {
        if (!isValidEmail(email.value)) {
            email.focus();
            WarningPopup('Wpisz prawidłowo swój email.');
            return false;
        }
        return true;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fbResetPassword(email.value, isValid);
    });
};

handleResetPassword();
