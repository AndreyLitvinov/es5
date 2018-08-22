const HtmlHelper = new HtmlHelperClass();

class HtmlHelperClass {
    SetHtml = function (selector, html) {
        var element = document.querySelector(selector);
        if (element) element.innerHTML = html;
    }
}

const Base64Helper = new Base64HelperClass();

class Base64HelperClass
{
    decodeUnicode = function (str) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    encodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }
}

export { HtmlHelper, Base64Helper }