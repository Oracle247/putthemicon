const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

const API_URL = '/signin'

function toggle() {
    var header = document.getElementById("header");
    header.classList.toggle('active');

}

const adminDashboard = function() {
    console.log("hello");
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = username.value;
    const pword = password.value;
    // console.log(pword + " " + name);
    fetch('/signin', {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                username: name,
                password: pword
            }),
            // redirect:
        })
        .then((response) => response.json())
        .then(data => {

            if (data.message == "success") {
                console.log(data);
                localStorage.setItem('token', data.token)
                dashboardRedirect(localStorage.getItem('token'));
            } else {
                alert("wrong password or username")
            }
        })


})




const dashboardRedirect = (token) => {
    const myHeaders = new Headers({
        "content-type": "text/html; charset=UTF-8",
        "x-access-token": token
    })
    fetch('/dashboard', {
            withCredentials: true,
            credentials: "include",
            redirect: "follow",
            headers: myHeaders,
            mode: "no-cors"
        })
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, 'text/html');
            console.log(data);

            window.location.replace('/dashboard');
            // if (response.redirected) {
            //     window.location.hrefreplace = response.url;
            // }
        })
        .catch(err => {
            console.log("error: " + err.message);
        })

}