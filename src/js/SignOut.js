import { SIGN_OUT } from './elements/Elements.js';

const handleSignOut = () => {
    const button = SIGN_OUT;

    button.addEventListener('click', () => {
        firebase.auth().signOut();
    });
};

handleSignOut();
