'use strict';

import Question from "./question";
import { HtmlHelper, Base64Helper } from "../helpers/core";

export default class CheckboxQuestion extends Question {
    constructor(answers
        , options
        , text) {
        super(answers, options, text);
    }

    handleNext() {
        const selector = document.querySelectorAll('#checkbox-question input[name="checkbox-question"]:checked');
        if (selector) {
            const results = [];
            for (let i = 0; i < selector.length; i++) {
                results.push(selector[i].value);
            }
            super.handleNext(results);
        }
    }

    init(container, button) {
        let html = `<form action="#n" id="checkbox-question">
                    <h6>${this.text}</h6>`;
        for (let i = 0; i < this.options.length; i++) {
            html += `
            <div class="row">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="defaultChecked${i}"  name="checkbox-question" ${(i == 0 ? 'checked' : '')} value="${Base64Helper.encodeUnicode(this.options[i])}">
                  <label class="custom-control-label" for="defaultChecked${i}">${this.options[i]}</label>
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
