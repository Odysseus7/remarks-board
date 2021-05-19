const db = firebase.firestore();

const timeOptions = {
    year: 'numeric', month: 'numeric', day: 'numeric',
};

window.onload = () => {
    db.collection("remarks").orderBy("time", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const number = doc.data().number;
            const remark = doc.data().remark;
            const time = new Date(doc.data().time);


            document.querySelector(".remarks").insertAdjacentHTML("beforeend", `
                <article class="remarks__remark">
                    <h2 class="remarks__number">${number}</h2>
                    <p class="remarks__paragraph">${remark}<span class="remarks__time">${time.toLocaleTimeString('nl-NL')}</span></p>
                </article>
            `);
        });
    });
}

document.querySelector(".form").addEventListener("submit", (event) => {
    event.preventDefault();
    const number = document.querySelector(".form__number").value;
    const remark = document.querySelector(".form__remark").value;
    const time = new Date().getTime();
    // post to database
    db.collection("remarks").add({
        number,
        remark,
        time
    })
    .then((docRef) => {
        window.alert("Remark succesfully posted");
        window.location.reload();
    })
    .catch((error) => {
        window.alert("Something went wrong.");
    });
});