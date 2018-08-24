'use strict';

import CheckboxQuestion from '../classes/checkboxQuestion';
import RadioQuestion from '../classes/radioQuestion';
import "whatwg-fetch";
import { HtmlHelper, Base64Helper } from '../helpers/core';

const privateMembers = new WeakMap();

class TestControllerClass {
    constructor() {
        const privateProperties = {
            questionCount: 0,
            questionIndex: -1,
            questionList: [],
            serviceUrl: '',

            currentQuestion: null,
            selectorCurrentConteiner: '',
            loadHtml: '<div class="row justify-content-md-center"><div class="loader"></div></div>',

            ajaxToService(url) {
                HtmlHelper.SetHtml(this.selectorCurrentConteiner, this.loadHtml);
                return fetch(this.serviceUrl + url, { credentials: "include" })
                    .then(response => {
                        if (response.ok) {
                            response.text()
                        } else {
                            throw new Error(response.statusText);
                        }
                    })
                    .catch(ex => document.querySelector(this.selectorCurrentConteiner).innerHTML = '<h4 id="error" class="text-danger">' + ex + '</h4>');
            },

            questionFactory(questionData) {
                const answers = questionData.answers.split('#;')
                    .map(x => x);
                const options = questionData.options.split('#;')
                    .map(x => Base64Helper.decodeUnicode(x));
                const text = Base64Helper.decodeUnicode(questionData.text);

                // кнопки перезапустить и следующий/закончить
                HtmlHelper.SetHtml(this.selectorCurrentConteiner, `
                <div id='question-container'>
                </div>                
                <div class="row">
                    <div class="col-sm text-right">
                        <button id="test-controller-next" type="button" class="mx-auto btn btn-lg btn-primary">${(this.questionIndex == this.questionCount - 1 ? 'Закончить' : 'Следующий')}</button>
                    </div>
                </div>
                <div class="row row justify-content-md-center">
                    <div class="col-md-auto">
                        <button id="test-controller-restart" type="button" class="mx-auto btn btn-lg btn-primary">Начать заново</button>
                    </div>
                </div>
            `);

                document.getElementById("test-controller-restart").onclick = this.startTest;

                if (answers.length > 1) {
                    return new CheckboxQuestion(answers
                        , options
                        , text);
                } else {
                    return new RadioQuestion(answers
                        , options
                        , text);
                }
            },
            createNewQuestionObject: index =>
                this.ajaxToService('GetNext/' + index)
                    .then(questionData => this.questionFactory(questionData))
                    .then(question => question.init('#question-container', '#test-controller-next'))
            ,
            questionGenerator: async function* () {
                this.questionCount = await this.ajaxToService('TestInit');
                for (this.questionIndex = 0;
                    this.questionIndex < this.questionCount;
                    this.questionIndex++) {
                    yield await this.createNewQuestionObject(this.questionIndex);
                }
            },
            startTest: async () => {
                privateMembers.get(this).questionList = [];
                for await (const question of privateMembers.get(this).questionGenerator()) {
                    privateMembers.get(this).questionList.push(question);
                }

                if (!document.getElementById('error'))
                    privateMembers.get(this).showResult();
            },
            showResult: () => { 
                let result = 0;
                for (let i = 0; i < privateMembers.get(this).questionList.length; i++) {
                    result += privateMembers.get(this).questionList[i].getScore();
                }
                
                HtmlHelper.SetHtml(privateMembers.get(this).selectorCurrentConteiner, `
                <div id='question-container'>
                </div>                
                <div class="row">
                    <h6> Ваши баллы: ${result}</h6>
                </div>
                <div class="row row justify-content-md-center">
                    <div class="col-md-auto">
                        <button id="test-controller-restart" type="button" class="mx-auto btn btn-lg btn-primary">Пройти еще раз</button>
                    </div>
                </div>
            `);

                document.getElementById("test-controller-restart").onclick = privateMembers.get(this).startTest;
            }
        };

        privateMembers.set(this, privateProperties)
    }

     init(urlService, selectorConteiner) {

        privateMembers.get(this).serviceUrl = urlService;
        privateMembers.get(this).selectorCurrentConteiner = selectorConteiner;

        HtmlHelper.SetHtml(privateMembers.get(this).selectorCurrentConteiner, `
                <div class="row justify-content-md-center">
                    <div class="col-md-auto">
                        <button id="test-controller-start" type="button" class="mx-auto btn btn-lg btn-primary">Начать тест</button>
                    </div>
                </div>
            `);

        document.getElementById("test-controller-start").onclick = privateMembers.get(this).startTest;
    }
}

export default new TestControllerClass();
