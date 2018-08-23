class HtmlHelperClass {
    constructor() { }
    SetHtml(selector, html) {
        const element = document.querySelector(selector);
        if (element) element.innerHTML = html;
    }
}

class Base64HelperClass
{
    constructor() { }
    decodeUnicode(str) {
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

const HtmlHelper = new HtmlHelperClass();
const Base64Helper = new Base64HelperClass();

export { HtmlHelper, Base64Helper }