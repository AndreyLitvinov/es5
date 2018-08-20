'use strict';

/**
 * СheckboxQuestion.
 * 
 * @constructor
 * @param {String} id - The id.
 * @param {Number} x  - The x coordinate.
 * @param {Number} y  - The y coordinate.
 */
function CheckboxQuestion(answers
    , options
    , score
    , text) {
    Question.call(this, answers
        , options
        , score
        , text)
    // пока дополнительных действий не нужно
}

// наследование, ха нет смысла в этом
CheckboxQuestion.prototype = Object.create(Question.prototype);
CheckboxQuestion.prototype.constructor = Question;

/**
 * Go to next.
 * 
 * @param {Number} - The x coordinate.
 * @param {Number} - The y coordinate.
 */
CheckboxQuestion.prototype.handleNext = function () {
    Question.prototype.handleNext.call(this);
};

/**
 * Render.
 * 
 * @return {Object}
 */
CheckboxQuestion.prototype.init = function () {
    // тут видимо нужно заставить рисовать его
};