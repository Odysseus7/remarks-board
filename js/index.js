const db = firebase.firestore();

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

        document.querySelector(".remarks").insertAdjacentHTML("afterbegin", `
                <article class="remarks__remark animate__animated animate__fadeInUpBig">
                    <h2 class="remarks__number">${number}</h2>
                    <p class="remarks__paragraph">${remark}<span class="remarks__time">${new Date(time).toLocaleTimeString('nl-NL')}</span></p>
                </article>
            `);
    })
    .catch((error) => {
        window.alert("Something went wrong.");
        console.log(error);
    });
});