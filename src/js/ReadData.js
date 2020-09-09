import { DATA_COMPETITIONS } from './elements/Elements.js';
import { Countdown } from './classes/Countdown.js';

export const readData = () => {
    const name = DATA_COMPETITIONS.name;
    const adress = DATA_COMPETITIONS.adress;
    const date = DATA_COMPETITIONS.date;
    const hour = DATA_COMPETITIONS.hour;
    const countdownSelector = DATA_COMPETITIONS.countdown;

    async function getDataFromFirebase() {
        let promise = new Promise((resolve) => {
            firebase
                .database()
                .ref('competitions')
                .once('value')
                .then(function (snapshot) {
                    name.textContent = snapshot.val().name;
                    adress.textContent = `${snapshot.val().city}, ${
                        snapshot.val().street
                    }`;
                    date.textContent = snapshot.val().date;
                    hour.textContent = snapshot.val().hour;

                    if (snapshot.val().isComp) {
                        const data = {
                            name: null,
                            adress: null,
                            date: null,
                            hour: null,
                        };

                        data.name = snapshot.val().name;
                        data.adress = `${snapshot.val().city}, ${
                            snapshot.val().street
                        }`;
                        data.date = snapshot.val().date;
                        data.hour = snapshot.val().hour;

                        resolve(data);
                    } else {
                        resolve(null);
                    }
                });
        });
        let fbData = await promise;

        const countdown = new Countdown(
            countdownSelector,
            `${fbData.date} ${fbData.hour}`,
        );

        countdown.start();
    }

    getDataFromFirebase();
};
