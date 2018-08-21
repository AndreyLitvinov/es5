'use strict';

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

        $('#test-controller-restart').on('click', startTest);

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

        $('#test-controller-restart').on('click', startTest);
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
            serviceUrl = urlService;
            selectorCurrentConteiner = selectorConteiner;

            HtmlHelper.SetHtml(selectorCurrentConteiner, `
                <div class="row justify-content-md-center">
                    <div class="col-md-auto">
                        <button id="test-controller-start" type="button" class="mx-auto btn btn-lg btn-primary">Начать тест</button>
                    </div>
                </div>
            `);

            $('#test-controller-start').on('click', startTest);
        },
    };;
})();