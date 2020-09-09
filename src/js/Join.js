import { JOIN_COMPETITIONS } from './elements/Elements.js';
import { fbJoinCompetitions } from './functions/fbJoinCompetitions.js';
import {
    SuccessPopup,
    WarningPopup,
    ConfirmDialog,
} from './functions/SweetAlertPopup.js';
import { isEmpty, isValidEmail } from './functions/Validation.js';

const handleJoinCompetitions = () => {
    const form = JOIN_COMPETITIONS.form;
    const name = JOIN_COMPETITIONS.name;
    const surName = JOIN_COMPETITIONS.surName;
    const email = JOIN_COMPETITIONS.email;
    const phone = JOIN_COMPETITIONS.phone;

    const isValid = () => {
        if (isEmpty(name.value)) {
            name.focus();
            WarningPopup('Podaj swoje imię.');
            return false;
        }
        if (isEmpty(surName.value)) {
            surName.focus();
            WarningPopup('Podaj swoje nazwisko.');
            return false;
        }
        if (!isValidEmail(email.value)) {
            email.focus();
            WarningPopup('Podaj swój email.');
            return false;
        }
        return true;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (isValid()) {
            const data = {
                name: name.value,
                surName: surName.value,
                email: email.value,
                phone: phone.value,
            };
            ConfirmDialog(
                'Czy chcesz zgłosić swój udział w konkursie?',
                'Na podany email zostanie wysłany link weryfikacyjny.',
                'Tak, biorę udział.',
                'Anuluj',
                () => {
                    fbJoinCompetitions(
                        data.name,
                        data.surName,
                        data.email,
                        data.phone,
                    );
                    SuccessPopup('Zapisałeś się na zawody!');
                    form.reset();
                },
            );
        }
    });
};

handleJoinCompetitions();
