import { go_to } from '../routes/functions.js';
import { ErrorPopup } from './SweetAlertPopup.js';

export const fbSignIn = (email, password, isValid) => {
    if (isValid()) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function () {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        go_to.dashboard();
                    } else {
                        go_to.signIn();
                    }
                });
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(`${errorCode} | ${errorMessage}`);

                ErrorPopup('Podałeś zły email lub hasło.');
            });
    }
};
