import { firebaseConfig } from './key/firebaseConfig.js';
import { ROUTES } from './routes/routes.js';
import { go_to } from './routes/functions.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if (window.location.href === ROUTES.signIn) {
            go_to.dashboard();
        }
        console.log('zalogowano');
    } else {
        if (window.location.href === ROUTES.dashboard) {
            go_to.homePage();
        }
        console.log('nie zalogowano');
    }
});
