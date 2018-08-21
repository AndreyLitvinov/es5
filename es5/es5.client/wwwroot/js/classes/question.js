'use strict';

/**
 * Question base class.
 * тут не факт что так, так как создает вопросы фабрика из контроллера
 * @constructor
 * @param {String} id - The id.
 * @param {Number} x  - The x coordinate.
 * @param {Number} y  - The y coordinate.
 */
function Question(answers
    , options
    , text) {

    // public
    this.options = options;
    this.text = text;

    // privarte
    var answers = answers;
    var score = 0;
    
    this.getScore = function () {
        return score;
        // пока не знаю что делжен возвращать
    };

    this.handleNext = function (result) {
        // сравнить резльтат с ответами
        if (Array.isArray(answers) && answers.length > 1)
        {
            if (!Array.isArray(result) || result.length != answers.length) return;

            for (var i = 0; i < result.length; i++) {
                if (answers.indexOf(result[i]) == -1) return;
            }

            // массивы совпадают по значениям
            score += 2;
            return;

        } else {
            // сравнить значения
            if (result == answers[0])
            {
                score += 10;
                return;
            }
        }
    };
}