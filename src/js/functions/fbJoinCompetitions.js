export const fbJoinCompetitions = (name, surName, email, phone) => {
    const memberData = {
        name,
        surName,
        email,
        phone,
    };

    const newMemberKey = firebase.database().ref().child('members').push().key;

    let updates = {};
    updates['/members/' + newMemberKey] = memberData;

    return firebase.database().ref().update(updates);
};
