'use strict';

/**
 * СheckboxQuestion.
 * 
 * @constructor
 * @param {String} id - The id.
 * @param {Number} x  - The x coordinate.
 * @param {Number} y  - The y coordinate.
 */
function RadioQuestion(answers
    , options
    , score
    , text) {
    Question.call(this, answers
        , options
        , score
        , text)
    // пока дополнительных действий не нужно
}

// наследование
RadioQuestion.prototype = Object.create(Question.prototype);
RadioQuestion.prototype.constructor = Question;

/**
 * Go to next.
 * 
 * @param {Number} - The x coordinate.
 * @param {Number} - The y coordinate.
 */
RadioQuestion.prototype.handleNext = function () {
    Question.prototype.handleNext.call(this);
};

/**
 * Render.
 * 
 * @return {Object}
 */
RadioQuestion.prototype.init = function () {
    // тут видимо нужно заставить рисовать его
};