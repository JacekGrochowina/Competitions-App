import {
    NEW_COMPETITIONS,
    REMOVE_COMPETITIONS,
    TABLE_MEMBERS,
} from './elements/Elements.js';
import { WarningPopup, ConfirmDialog } from './functions/SweetAlertPopup.js';
import { isEmpty } from './functions/Validation.js';
import { fbWriteData } from './functions/fbWriteData.js';
import { readData } from './ReadData.js';

const handleNewCompetitions = () => {
    const form = NEW_COMPETITIONS.form;
    const name = NEW_COMPETITIONS.name;
    const city = NEW_COMPETITIONS.city;
    const street = NEW_COMPETITIONS.street;
    const date = NEW_COMPETITIONS.date;
    const hour = NEW_COMPETITIONS.hour;

    const setMinDateToday = (date) => {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }
        today = `${year}-${month}-${day}`;
        date.setAttribute('min', today);
    };
    setMinDateToday(date);

    const isValid = () => {
        if (isEmpty(name.value)) {
            name.focus();
            WarningPopup('Podaj nazwę konkursu.');
            return false;
        }
        if (isEmpty(city.value)) {
            city.focus();
            WarningPopup('Podaj nazwę miasta w którym będzie konkurs.');
            return false;
        }
        if (isEmpty(street.value)) {
            street.focus();
            WarningPopup('Podaj dokładny adres odbywania się konkursu.');
            return false;
        }
        if (isEmpty(date.value)) {
            date.focus();
            WarningPopup('Podaj datę odbywania się konkursu.');
            return false;
        }
        if (isEmpty(hour.value)) {
            hour.focus();
            WarningPopup('Podaj godzinę odbywania się konkursu.');
            return false;
        }
        return true;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (isValid()) {
            const data = {
                name: name.value,
                city: city.value,
                street: street.value,
                date: date.value,
                hour: hour.value,
                isComp: true,
            };
            ConfirmDialog(
                'Czy chcesz dodać nowy konkurs?',
                'Obecny konkurs zostanie usunięty!',
                'Tak, chcę dodać.',
                'Anuluj',
                () => {
                    fbWriteData('competitions', data);
                    window.location.reload(true);
                },
            );
        }
    });
};

const handleRemoveCompetitions = () => {
    const button = REMOVE_COMPETITIONS;

    button.addEventListener('click', () => {
        const data = {
            name: '-- : --',
            city: '-- : --',
            street: '-- : --',
            date: '-- : --',
            hour: '-- : --',
            isComp: false,
        };
        ConfirmDialog(
            'Czy chcesz usunąć obecny konkurs?',
            'Nie będziesz mógł  tego cofnąć!',
            'Tak, chcę usunąć.',
            'Anuluj',
            () => {
                fbWriteData('competitions', data);
                window.location.reload(true);
            },
        );
    });
};

const readMembers = () => {
    async function getDataFromFirebase() {
        let promise = new Promise((resolve) => {
            firebase
                .database()
                .ref('members')
                .once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        let childKey = childSnapshot.key;
                        let childData = childSnapshot.val();
                        createNewMember(
                            childKey,
                            childData.name,
                            childData.surName,
                            childData.email,
                            childData.phone,
                        );
                    });
                });
        });
    }

    const createNewMember = (childKey, name, surName, email, phone) => {
        const table = TABLE_MEMBERS;

        const row = document.createElement('tr');
        row.classList.add('table__row');

        const createCell = (textContent = '') => {
            const cell = document.createElement('td');
            cell.classList.add('table__cell');
            cell.textContent = textContent;
            return cell;
        };

        const cellName = createCell(name);
        const cellSurName = createCell(surName);
        const cellEmail = createCell(email);
        const cellPhone = createCell(phone);
        const cellRemove = createCell();

        cellPhone.classList.add('table__cell--phone');
        cellPhone.textContent = phone;

        cellRemove.classList.add('table__cell--remove');
        cellRemove.innerHTML = '<i class="fas fa-trash-alt"></i>';

        cellRemove.addEventListener('click', () => {
            table.innerHTML = `
                <tr class="table__row table__row--heading">
                    <td class="table__cell table__cell--heading">Imię</td>
                    <td class="table__cell table__cell--heading">Nazwisko</td>
                    <td class="table__cell table__cell--heading">Email</td>
                    <td class="table__cell table__cell--heading table__cell--phone">Nr tel.</td>
                    <td class="table__cell table__cell--heading table__cell--remove"></td>
                </tr>
            `;
            firebase.database().ref('members').child(childKey).remove();
            getDataFromFirebase();
        });

        row.appendChild(cellName);
        row.appendChild(cellSurName);
        row.appendChild(cellEmail);
        row.appendChild(cellPhone);
        row.appendChild(cellRemove);

        table.appendChild(row);
    };

    getDataFromFirebase();
};

readData();
readMembers();
handleNewCompetitions();
handleRemoveCompetitions();
