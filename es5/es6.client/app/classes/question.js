'use strict';

export default class Question {
    constructor() {
    }

    getScore() {
        console.log('hello');
    }

    handleNext() {
        console.log('handleNext');
    }
}
/*
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
    };

    this.handleNext = function (result) {
        // сравнить резльтат с ответами
        if (Array.isArray(answers) && answers.length > 1)
        {
            if (!Array.isArray(result) || result.length != answers.length) return;

            for (var i = 0; i < result.length; i++) {
                if (answers.indexOf(result[i]) != -1) {
                    // массивы совпадают по значениям
                    score += 2;
                }
            }
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
*/