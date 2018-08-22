'use strict';

/*import Question from '../classes/question.js';
import CheckboxQuestion from '../classes/checkboxQuestion.js';
import RadioQuestion from '../classes/radioQuestion.js';*/
import "whatwg-fetch";
import { HtmlHelper, Base64Helper } from '../helpers/core';
import { Promise } from "core-js";

const privateMembers = new WeakMap();

class TestController {
    constructor() {
        let privateProperties = {
            questionCount: 0,
            questionList: [],
            questionIndex: -1,
            serviceUrl: '',

            currentQuestion: null,
            selectorCurrentConteiner: '',
            loadHtml: '<div class="row justify-content-md-center"><div class="loader"></div></div>',

            ajaxToService: function (url) {
                HtmlHelper.SetHtml(selectorCurrentConteiner, loadHtml);
                return fetch(this.serviceUrl + url)
            },

            questionFactory: function (questionData) {
                var answers = questionData.answers.split('#;')
                    .map(function (x) { return x; });
                var options = questionData.options.split('#;')
                    .map(function (x) { return Base64Helper.decodeUnicode(x); });

                // кнопки перезапустить и следующий/закончить
                HtmlHelper.SetHtml(selectorCurrentConteiner, `
                <div id='question-container'>
                </div>                
                <div class="row">
                    <div class="col-sm text-right">
                        <button id="test-controller-next" type="button" class="mx-auto btn btn-lg btn-primary">${(questionIndex == questionCount - 1 ? 'Закончить' : 'Следующий')}</button>
                    </div>
                </div>
                <div class="row row justify-content-md-center">
                    <div class="col-md-auto">
                        <button id="test-controller-restart" type="button" class="mx-auto btn btn-lg btn-primary">Начать заново</button>
                    </div>
                </div>
            `);

                document.getElementById("test-controller-restart").onclick = startTest;

                if (answers.length > 1) {
                    var many = new CheckboxQuestion(answers
                        , options
                        , text);
                    currentQuestion = many;
                } else {
                    var one = new RadioQuestion(answers
                        , options
                        , text);
                    currentQuestion = one;
                }
            },
            createNewQuestionObject: async function (index) {
                const questionData = await this.ajaxToService('GetNext /' + index);
                const question = this.questionFactory(questionData);
                return question.init('#question-container', '#test-controller-next', createNextQuestionObject, addQuestionToList);
            },
            questionGenerator: async function* () {
                const response = await this.ajaxToService('/TestInit');
                for (var i = 0; i < response; i++) {
                    yield this.createNewQuestionObject(questionData);
                }
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

export { TestController }
/*
function TestController() {
}

TestController.prototype = (function () {

    var questionCount = 0;
    var questionList = [];
    var questionIndex = -1;

    var currentQuestion = null;
    var serviceUrl = 'localhost';
    var selectorCurrentConteiner = '';

    const loadHtml = '<div class="row justify-content-md-center"><div class="loader"></div></div>';

    var b64DecodeUnicode = function (str) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };

    var addQuestionToList = function (question) {
        questionList.push(question);
    };

    var createNextQuestionObject = function () {

        questionIndex += 1;

        if (questionIndex < questionCount) {
            loadQuestion(questionIndex);
        } else {
            var result = 0;

            for (var i = 0; i < questionList.length; i++) {
                result += questionList[i].getScore();
            }

            showResult(result);
        }
    };

    var loadQuestion = function (index) {
        ajaxToService('GetNext/' + index).then((data) => questionFactory(data));
    };

    var questionFactory = function (data) {

        var answers = data.answers.split('#;')
            .map(function (x) { return x; });
        var options = data.options.split('#;')
            .map(function (x) { return b64DecodeUnicode(x); });
        var text = b64DecodeUnicode(data.text);

        // кнопки перезапустить и следующий/закончить
        HtmlHelper.SetHtml(selectorCurrentConteiner, `
                <div id='question-container'>
                </div>                
                <div class="row">
                    <div class="col-sm text-right">
                        <button id="test-controller-next" type="button" class="mx-auto btn btn-lg btn-primary">`+ (questionIndex == questionCount - 1 ? 'Закончить' : 'Следующий') + `</button>
                    </div>
                </div>
                <div class="row row justify-content-md-center">
                    <div class="col-md-auto">
                        <button id="test-controller-restart" type="button" class="mx-auto btn btn-lg btn-primary">Начать заново</button>
                    </div>
                </div>
            `);

        document.getElementById("test-controller-restart").onclick = startTest;

        if (answers.length > 1) {
            var many = new CheckboxQuestion(answers
                , options
                , text);
            currentQuestion = many;
            currentQuestion.init('#question-container', '#test-controller-next', createNextQuestionObject, addQuestionToList);
        } else {
            var one = new RadioQuestion(answers
                , options
                , text);
            currentQuestion = one;
            currentQuestion.init('#question-container', '#test-controller-next', createNextQuestionObject, addQuestionToList);
        }
    };

    var showResult = function (result) {
        HtmlHelper.SetHtml(selectorCurrentConteiner, `
                <div id='question-container'>
                </div>                
                <div class="row">
                    <h6> Ваши баллы: ` + result + `</h6>
                </div>
                <div class="row row justify-content-md-center">
                    <div class="col-md-auto">
                        <button id="test-controller-restart" type="button" class="mx-auto btn btn-lg btn-primary">Пройти еще раз</button>
                    </div>
                </div>
            `);

        document.getElementById("test-controller-restart").onclick = startTest;
    };

    // return promise
    var ajaxToService = function (url) {
        HtmlHelper.SetHtml(selectorCurrentConteiner, loadHtml);
        var pormise = new Promise(function (resolve, reject) {
            HtmlHelper.getJson(serviceUrl + url, function (data) {
                resolve(data);
            }, function () {
                reject();
            });
        });
        return pormise;
    };

    var startTest = function () {

        ajaxToService("/TestInit").then(function (data) {
            questionCount = 0;
            questionList = [];
            questionIndex = -1;
            currentQuestion = null;
            questionList = [];
            questionCount = data;
            createNextQuestionObject();
        });
    };
    return  {
        constructor: TestController,

        init: function (urlService, selectorConteiner) {
           
        },
    };;
})();*/