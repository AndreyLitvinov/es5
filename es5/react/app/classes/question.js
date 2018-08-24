'use strict';

const privateMembers = new WeakMap();

export default class Question {
    constructor(answers
        , options
        , text) {

        const privateProperties = {
            answers: answers,
            score: 0,
        }

        privateMembers.set(this, privateProperties);

        this.options = options;
        this.text = text;
    }

    getScore() {
        return privateMembers.get(this).score;
    }

    handleNext(results) {
        // сравнить резльтат с ответами
        if (Array.isArray(privateMembers.get(this).answers) && privateMembers.get(this).answers.length > 1) {
            if (!Array.isArray(results) || results.length != privateMembers.get(this).answers.length) return;
            for (let result of results) {
                if (privateMembers.get(this).answers.indexOf(result) != -1) {
                    // массивы совпадают по значениям
                    privateMembers.get(this).score += 2;
                }
            }
        } else {
            // сравнить значения
            if (results == privateMembers.get(this).answers[0]) {
                privateMembers.get(this).score += 10;
                return;
            }
        }
    }
}
