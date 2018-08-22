'use strict';

import Question from "./question";

export default class CheckboxQuestion extends Question {
    constructor(answers
        , options
        , text) {
        super(answers, options, text);
    }

    getScore() {
        console.log('hello');
    }

    handleNext() {
        console.log('handleNext');
    }
}

/*
function CheckboxQuestion(
    answers
    , options
    , text) {

    Question.call(this, answers
        , options
        , text)

    var self = this;
    var handleNext = function (callbackNext, callbackAdd) {
        return function () {
            var selector = document.querySelectorAll('#checkbox-question input[name="checkbox-question"]:checked');
            if (selector) {
                var results = [];
                for (var i = 0; i < selector.length; i++) {
                    results.push(selector[i].value);
                }
                self.handleNext(results);
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

        // тут видимо нужно заставить рисовать его
        var html = '<form action="#n" id="checkbox-question">';
        html += '<h6>' + this.text + '</h6>';
        for (var i = 0; i < this.options.length; i++) {
            html += `
            <div class="row">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="defaultChecked`+ i + `"  name="checkbox-question"` + (i == 0 ? 'checked' : '') + ` value="` + b64EncodeUnicode(this.options[i]) +`">
                  <label class="custom-control-label" for="defaultChecked`+ i + `">` + this.options[i] + `</label>
                </div>
            </div>`;
        }
        html += '</form>';
        HtmlHelper.SetHtml(container, html);
        document.querySelector(button).onclick = handleNext(callbackNext, callbackAdd);
    };
}

CheckboxQuestion.prototype = Object.create(Question.prototype);
CheckboxQuestion.prototype.constructor = Question;
*/
