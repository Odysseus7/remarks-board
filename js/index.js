const db = firebase.firestore();


document.querySelector(".form").addEventListener("submit", (event) => {
    event.preventDefault();
    const number = document.querySelector(".form__number").value;
    const remark = document.querySelector(".form__remark").value;
    
    
    db.collection("remarks").add({
        number,
        remark,
    })
    .then((docRef) => {
        window.alert("Remark succesfully posted");
    })
    .catch((error) => {
        window.alert("Something went wrong.");
    });
});