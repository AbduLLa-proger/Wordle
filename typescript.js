var giveUp = document.querySelector('.giveUp');
var letter = document.querySelectorAll('.wordle__letter');
var popup = document.querySelectorAll('.wordle__popup');
var closePopup = document.querySelector('.close-popup');
var wordle = document.querySelector('.wordle');
var firstRowLetters = document.querySelector('.first_row');
var secondRowLetters = document.querySelector('.second_row');
var thirdRowLetters = document.querySelector('.third_row');
var fourthRowLetters = document.querySelector('.fourth_row');
var fifthRowLetters = document.querySelector('.fifth_row');
var sixthRowLetters = document.querySelector('.sixth_row');
var EXAMPLE_WORDS = {
    'second': 'second',
    'bright': 'bright',
    'chance': 'chance',
    'stream': 'stream',
    'golden': 'golden',
    'friend': 'friend',
};
var CHOSEN_WORD = Object.keys(EXAMPLE_WORDS)[Math.floor(Math.random() * (Object.keys(EXAMPLE_WORDS).length + 1))];
var row_letters = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
};
var Wordle_Row = {
    0: firstRowLetters,
    1: secondRowLetters,
    2: thirdRowLetters,
    3: fourthRowLetters,
    4: fifthRowLetters,
    5: sixthRowLetters
};
var WORDLE = '';
var currentRow = 0;
var foundLetter = 0;
var isGameFinished = false;
var wordNotFound = false;
var isLetter = /^[A-Za-z]$/;
giveUp.addEventListener('click', function () {
    popup[0].classList.remove('notVisible');
    popup[0].classList.add('visible');
    popup[0].classList.add('disabled');
});
closePopup.addEventListener('click', function () {
    popup[0].classList.remove('visible');
    popup[0].classList.add('hidden');
    setTimeout(function () {
        popup[0].classList.add('notVisible');
        popup[0].classList.remove('hidden');
        popup[0].classList.remove('disabled');
    }, 500);
});
var isDisabled = function () { return popup[0].classList.contains('disabled') || popup[1].classList.contains('disabled') || popup[2].classList.contains('disabled'); };
var AddLetterAction = function (enteredLetter) {
    var letters = Wordle_Row[currentRow].children;
    row_letters[currentRow] = row_letters[currentRow] < 0 ? row_letters[currentRow] + 1 : row_letters[currentRow];
    letters[row_letters[currentRow]].textContent = enteredLetter;
    WORDLE += enteredLetter;
    letters[row_letters[currentRow]].classList.add('wordle-add__letter');
    row_letters[currentRow] += 1;
};
var RemoveLetterAction = function () {
    var letters = Wordle_Row[currentRow].children;
    row_letters[currentRow] = row_letters[currentRow] > 0 ? row_letters[currentRow] - 1 : row_letters[currentRow];
    letters[row_letters[currentRow]].classList.remove('wordle-add__letter');
    WORDLE = WORDLE.slice(0, -1);
    letters[row_letters[currentRow]].textContent = '';
};
var ShortPopUp = function () {
    popup[1].classList.remove('notVisible');
    popup[1].classList.add('visible');
    popup[2].classList.add('disabled');
    setTimeout(function () {
        popup[1].classList.add('notVisible');
        popup[1].classList.remove('visible');
        popup[2].classList.remove('disabled');
    }, 1500);
};
var NotFoundPopUp = function () {
    popup[2].classList.remove('notVisible');
    popup[2].classList.add('visible');
    popup[2].classList.add('disabled');
    setTimeout(function () {
        popup[2].classList.add('notVisible');
        popup[2].classList.remove('visible');
        popup[2].classList.remove('disabled');
    }, 1500);
};
var CheckWordle = function (word) {
    var letters = Wordle_Row[currentRow].children;
    var CheckChosenWord = CHOSEN_WORD;
    for (var i = 0; i < letters.length; i++) {
        if (CHOSEN_WORD[i] === word[i]) {
            letters[i].classList.add('foundLetter');
            foundLetter++;
        }
        else if (CheckChosenWord.includes(word[i])) {
            letters[i].classList.add('almostFoundLetter');
            var removedLetter = CheckChosenWord.split('');
            removedLetter[i] = '';
            CheckChosenWord = removedLetter.join('');
        }
        else {
            letters[i].classList.add('notFoundLetter');
        }
    }
    if (foundLetter === letters.length) {
        isGameFinished = true;
    }
    else {
        currentRow++;
        WORDLE = '';
        delete EXAMPLE_WORDS[word];
        if (Wordle_Row[currentRow].children === undefined) {
            wordNotFound = true;
        }
    }
};
wordle.addEventListener('keydown', function (event) {
    var enteredLetter = event.key;
    var reload = event.ctrlKey && event.key.toLowerCase() === "r";
    console.log('WORDLE', WORDLE);
    if (enteredLetter.length === 1 || enteredLetter === 'Enter' || enteredLetter === 'Backspace' || enteredLetter.toLowerCase() === 'f12' || reload) {
        var letters = firstRowLetters.children;
        if (enteredLetter.length > 1 && !isLetter.test(enteredLetter) && enteredLetter.toLowerCase() !== 'f12' && enteredLetter !== 'Backspace' && enteredLetter !== 'Enter') {
            event.preventDefault();
        }
        else if (enteredLetter === 'Enter' && isDisabled()) {
            event.preventDefault();
        }
        else if (enteredLetter.length === 1 && isLetter.test(enteredLetter) && letters.length > row_letters[currentRow] && !reload) {
            AddLetterAction(enteredLetter);
        }
        else if (enteredLetter === 'Backspace' && row_letters[currentRow] >= 0) {
            RemoveLetterAction();
        }
        else if (enteredLetter === 'Enter') {
            if (row_letters[currentRow] !== letters.length) {
                ShortPopUp();
            }
            else if (row_letters[currentRow] === letters.length && EXAMPLE_WORDS[WORDLE] === undefined) {
                NotFoundPopUp();
            }
            else {
                CheckWordle(WORDLE);
            }
        }
    }
    else
        event.preventDefault();
});
letter.forEach(function (item) { return item.addEventListener('click', function (event) {
    var clickedLetter = event.target.innerText;
    var letters = Wordle_Row[currentRow].children;
    if (clickedLetter === 'Backspace' && row_letters[currentRow] >= 0) {
        RemoveLetterAction();
    }
    else if (clickedLetter.toLowerCase() === 'enter') {
        console.log('WORDLE', WORDLE);
        if (row_letters[currentRow] !== letters.length) {
            ShortPopUp();
        }
        else if (row_letters[currentRow] === letters.length && EXAMPLE_WORDS[WORDLE] === undefined) {
            NotFoundPopUp();
        }
        else {
            CheckWordle(WORDLE);
        }
    }
    else if (letters.length > row_letters[currentRow] && clickedLetter.length === 1) {
        AddLetterAction(clickedLetter);
    }
}); });
