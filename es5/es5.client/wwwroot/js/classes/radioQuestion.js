'use strict';

function RadioQuestion(
        answers
    , options
    , text) {
        Question.call(this, answers
            , options
            , text)
    var self = this;

    var handleNext = function (callbackNext, callbackAdd) {
        return function () {
            var selector = document.querySelector('#radio-question input[name="radio-question"]:checked');
            if (selector) {
                self.handleNext(selector.value);
            }

            if (callbackAdd) callbackAdd(self);
            if (callbackNext) callbackNext();
        }
    };

    function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    this.init = function (container, button, callbackNext, callbackAdd) {
        
        var html = '<form action="#n" id="radio-question">';
        html += '<h6>' + this.text + '</h6>';
        for (var i = 0; i < this.options.length; i++) {
            html += `
            <div class="row">
                <div class="custom-control custom-radio">
                    <input type="radio" class="custom-control-input" id="defaultUnchecked`+ i + `" name="radio-question"` + (i == 0 ? 'checked' : '') + ` value="` + b64EncodeUnicode(this.options[i]) +`">
                    <label class="custom-control-label" for="defaultUnchecked`+ i + `">` + this.options[i] + `</label>
                 </div>
            </div>`;
        }
        html += '</form>';
        HtmlHelper.SetHtml(container, html);
        document.querySelector(button).onclick = handleNext(callbackNext, callbackAdd);
    };
}

// наследование
RadioQuestion.prototype = Object.create(Question.prototype);
RadioQuestion.prototype.constructor = Question;
