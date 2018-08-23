import controller from './controllers/TestController';
import "whatwg-fetch";

document.addEventListener("DOMContentLoaded", function () {
    fetch('serviceconfig/')
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => controller.init(data, '#content'))
        .catch(ex => document.getElementById('content').innerHTML = '<h4 class="text-danger">' + ex + '</h4>');
});
