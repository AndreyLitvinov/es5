'use strict';

import Question from "./question";
import { HtmlHelper, Base64Helper } from "../helpers/core";

export default class RadioQuestion extends Question {
    constructor(answers
        , options
        , text) {
        super(answers, options, text);
    }

    handleNext() {
        const selector = document.querySelector('#radio-question input[name="radio-question"]:checked');
        if (selector) {
            super.handleNext(selector.value);
        }
    }

    init(container, button) {
        let html = `<form action="#n" id="radio-question">
                        <h6>${this.text}</h6>`;
        for (let i = 0; i < this.options.length; i++) {
            html += `
            <div class="row">
                <div class="custom-control custom-radio">
                    <input type="radio" class="custom-control-input" id="defaultUnchecked${i}" name="radio-question"${(i == 0 ? 'checked' : '') + ` value="` + Base64Helper.encodeUnicode(this.options[i])}">
                    <label class="custom-control-label" for="defaultUnchecked${i}">${this.options[i]}</label>
                 </div>
            </div>`;
        }
        html += '</form>';
        HtmlHelper.SetHtml(container, html);

        return new Promise((resolve, reject) => {
            document.querySelector(button).onclick = () => {
                this.handleNext();
                resolve(this);
            };
        });;
    }
}
