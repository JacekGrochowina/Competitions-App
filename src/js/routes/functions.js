import { ROUTES } from './routes.js';

export const go_to = {
    homePage: () => (window.location.href = ROUTES.homePage),
    signIn: () => (window.location.href = ROUTES.signIn),
    dashboard: () => (window.location.href = ROUTES.dashboard),
    forgotPassword: () => (window.location.href = ROUTES.forgotPassword),
};
