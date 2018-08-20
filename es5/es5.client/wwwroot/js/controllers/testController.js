'use strict';

function TestController() {

}

// думаю что пусть контроллер работает с кнопкой 
TestController.prototype = (function () {

    var questionCount = 0;
    var questionIndex = -1;
    var serviceUrl = 'localhost';

    var addQuestionToList = function () {
        // Private code here
    };

    var createNextQuestionObject = function () {
        // Private code here
    };

    var loadQuestion = function () {
        // Private code here
    };

    var questionFactory = function () {
        // Private code here
    };

    var showResult = function () {
        // Private code here
    };

    var ajaxToService = function () {
        // Private code here
    };

    return {
        constructor: TestController,

        init: function () {
            //private_stuff();
        },
        nextQuestion: function () {
            // эта штука будет управлять потоком
        }
    };
})();