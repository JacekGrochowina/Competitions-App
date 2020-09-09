export const fbWriteData = (ref, data, fncSucces, fncFailed) => {
    firebase
        .database()
        .ref(ref)
        .set(data, function (error) {
            if (error) {
                // The write failed...
                fncFailed();
            } else {
                // Data saved successfully!
                fncSucces();
            }
        });
};
