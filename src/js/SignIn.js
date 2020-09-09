import { SIGN_IN } from './elements/Elements.js';
import { fbSignIn } from './functions/fbSignIn.js';
import { isValidEmail, isEmpty } from './functions/Validation.js';
import { WarningPopup } from './functions/SweetAlertPopup.js';

const handleSignIn = () => {
    const form = SIGN_IN.form;
    const email = SIGN_IN.email;
    const password = SIGN_IN.password;

    const isValid = () => {
        if (!isValidEmail(email.value)) {
            email.focus();
            WarningPopup('Wpisz prawidłowo swój email.');
            return false;
        }
        if (isEmpty(password.value)) {
            password.focus();
            WarningPopup('Wpisz swoje hasło.');
            return false;
        }
        return true;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fbSignIn(email.value, password.value, isValid);
    });
};

handleSignIn();
