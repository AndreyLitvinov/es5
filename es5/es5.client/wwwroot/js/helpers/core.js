var HtmlHelper = {};
HtmlHelper.SetHtml = function (selector, html) {
    var element = document.querySelector(selector);
    if (element) element.innerHTML = html;
}

HtmlHelper.getJson = function (url, callback, errorCallback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.withCredentials = true;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                callback(JSON.parse(xmlhttp.responseText))
            }
            else if (xmlhttp.status == 400) {
                errorCallback(xmlhttp.responseText);
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

HtmlHelper.get = function (url, callback, errorCallback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.withCredentials = true;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                callback(xmlhttp.responseText)
            }
            else if (xmlhttp.status == 400) {
                errorCallback(xmlhttp.responseText);
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
