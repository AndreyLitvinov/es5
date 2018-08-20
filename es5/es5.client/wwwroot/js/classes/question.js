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
    , score
    , text) {

    // public
    this.options = options;
    this.text = text;

    // privarte
    var answers = answers;
    var score = score;
    
    this.getScore = function () {
        return score;
        // пока не знаю что делжен возвращать
    };

    this.handleNext = function () {
        // пока не знаю что делжен возвращать
    };
}

/**
 * Get question text.
 * 
 * @return {String}
 */
Question.prototype.toString = function () {
    return this.text;
};