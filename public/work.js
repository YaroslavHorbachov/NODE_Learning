/* UTILS SECTOR */
var $ = document.querySelector.bind(document);
var log = console.log;
var objSession = {};
var result = $('.resultAuth');
var Root = document.querySelector('.preRoot');

/* WORK WITH COOKIES LOGGER */
function createCookie() {
    document.cookie = 'isAdmin=true';
    objSession.key = 'true'
}
function deleteCookie() {
    document.cookie = 'isAdmin' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    objSession.key = '';
}
/* WORK WITH WINSTON LOGGER */
function getLog() {
    Root.innerHTML = '';
    var ul = document.createElement('ul');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE && objSession.key === 'true') {
            xhr.responseText.split('\n').filter(row => row.length).forEach(row => {
                let li = document.createElement('li');
                li.innerText = row;
                ul.appendChild(li)
            });
            Root.appendChild(ul)
        }
    };
    xhr.open('get', '/log');
    xhr.send()
}

/* WORK WITH DATABASE INTERACTIONS */
if ($('form.XHRRegisterForm')) {
    $('form').addEventListener('submit', handlerFormReq);

    function handlerFormReq(e) {
        var stateValidity = true;
        result.innerHTML = '';
        e.preventDefault();
        var elementsForm = Array.prototype.slice.call($('form').elements, 0, -1);
        elementsForm.forEach(input => {
            if (input.value.length < 4 || input.value.length > 30) stateValidity = false
        });
        var uniquePassword = new Set(elementsForm
            .filter(item => item.name === 'password' || item.name === 'passwordC')
            .map(item => item.value)).size;
        if (stateValidity && uniquePassword === 1) {
            var uriEncodedString = encodeURI(elementsForm.map(input => input.name + '=' + input.value).join('&'));
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/register');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                console.log(typeof xhr.response);
                if (xhr.response === 'confirm') {
                    result.innerHTML = '<h1 style="color:darkgreen">You are logged now. Welcome.</h1><br>';
                }
                else {
                    result.innerHTML = '<h1 style="color:red">You logging is invalid. Try arain.</h1><br>';
                    setTimeout(empty => result.innerHTML = '', 5000)
                }
                console.log(result.innerHTML)
            };
            xhr.send(uriEncodedString);
        } else {
            result.innerHTML = '<h1 style="color:red">You logging is invalid. Try arain.</h1><br>';
            setTimeout(empty => result.innerHTML = '', 5000)
        }
    }
}
