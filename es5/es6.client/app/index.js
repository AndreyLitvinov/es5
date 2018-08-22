import { TestController } from './controllers/TestController';
import "whatwg-fetch";

document.addEventListener("DOMContentLoaded", function () {
    const controller = new TestController();
    fetch('serviceconfig/')
        .then(response => controller.init(response, '#content'))
        .catch(ex => document.getElementById('content').innerHTML = '<h4 class="text-danger">'+ ex +'</h4>');
});
