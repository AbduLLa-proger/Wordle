const giveUp = document.querySelector('.giveUp') as HTMLDivElement;
const letter = document.querySelectorAll('.wordle__letter') as NodeListOf<HTMLDivElement>;
const popup = document.querySelectorAll('.wordle__popup') as NodeListOf<HTMLDivElement>;
const closePopup = document.querySelector('.close-popup') as HTMLDivElement;
const wordle = document.querySelector('.wordle') as HTMLDivElement;
const firstRowLetters = document.querySelector('.first_row') as HTMLDivElement;
const secondRowLetters = document.querySelector('.second_row') as HTMLDivElement;
const thirdRowLetters = document.querySelector('.third_row') as HTMLDivElement;
const fourthRowLetters = document.querySelector('.fourth_row') as HTMLDivElement;
const fifthRowLetters = document.querySelector('.fifth_row') as HTMLDivElement;
const sixthRowLetters = document.querySelector('.sixth_row') as HTMLDivElement;

const EXAMPLE_WORDS: Record<string, string> = {
  'second': 'second',
  'bright': 'bright',
  'chance': 'chance',
  'stream': 'stream',
  'golden': 'golden',
  'friend': 'friend',
}

const CHOSEN_WORD = Object.keys(EXAMPLE_WORDS)[Math.floor(Math.random() * (Object.keys(EXAMPLE_WORDS).length + 1))];

const row_letters: Record<number, number> = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0
}

const Wordle_Row: Record<number, HTMLDivElement> = {
  0: firstRowLetters,
  1: secondRowLetters,
  2: thirdRowLetters,
  3: fourthRowLetters,
  4: fifthRowLetters,
  5: sixthRowLetters
}



let WORDLE = '';
let currentRow = 0;
let foundLetter = 0;
let isGameFinished = false;
let wordNotFound = false;
const isLetter = /^[A-Za-z]$/

giveUp.addEventListener('click', () => {
  popup[0].classList.remove('notVisible');
  popup[0].classList.add('visible');
  popup[0].classList.add('disabled');
})

closePopup.addEventListener('click', () => {
  popup[0].classList.remove('visible');
  popup[0].classList.add('hidden');
  setTimeout(() => {
    popup[0].classList.add('notVisible')
    popup[0].classList.remove('hidden');
    popup[0].classList.remove('disabled');
  }, 500);
})

const isDisabled = () => popup[0].classList.contains('disabled') || popup[1].classList.contains('disabled') || popup[2].classList.contains('disabled')

const AddLetterAction = (enteredLetter: string) => {
  const letters = Wordle_Row[currentRow].children;
  row_letters[currentRow] = row_letters[currentRow] < 0 ? row_letters[currentRow] + 1 : row_letters[currentRow];
  letters[row_letters[currentRow]].textContent = enteredLetter;
  WORDLE += enteredLetter;
  letters[row_letters[currentRow]].classList.add('wordle-add__letter');
  row_letters[currentRow] += 1;
}

const RemoveLetterAction = () => {
  const letters = Wordle_Row[currentRow].children;
  row_letters[currentRow] = row_letters[currentRow] > 0 ? row_letters[currentRow] - 1 : row_letters[currentRow];
  letters[row_letters[currentRow]].classList.remove('wordle-add__letter');
  WORDLE = WORDLE.slice(0, -1);
  letters[row_letters[currentRow]].textContent = '';
}

const ShortPopUp = () => {
  popup[1].classList.remove('notVisible');
  popup[1].classList.add('visible');
  popup[2].classList.add('disabled');
  setTimeout(() => {
    popup[1].classList.add('notVisible');
    popup[1].classList.remove('visible');
    popup[2].classList.remove('disabled');
  }, 1500);
}
const NotFoundPopUp = () => {
  popup[2].classList.remove('notVisible');
  popup[2].classList.add('visible');
  popup[2].classList.add('disabled');
  setTimeout(() => {
    popup[2].classList.add('notVisible');
    popup[2].classList.remove('visible');
    popup[2].classList.remove('disabled');
  }, 1500);
}

const CheckWordle = (word: string) => {
  const letters = Wordle_Row[currentRow].children;
  let CheckChosenWord = CHOSEN_WORD;
  for (let i = 0; i < letters.length; i++) {
    if (CHOSEN_WORD[i] === word[i]) {
      letters[i].classList.add('foundLetter');
      foundLetter++;
    }
    else if (CheckChosenWord?.includes(word[i])) {
      letters[i].classList.add('almostFoundLetter');
      let removedLetter = CheckChosenWord.split('');
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
    if (Wordle_Row[currentRow]?.children === undefined) {
      wordNotFound = true;
    }

  }
}

wordle.addEventListener('keydown', (event: KeyboardEvent) => {
  const enteredLetter = event.key;
  const reload = event.ctrlKey && event.key.toLowerCase() === "r";

  console.log('WORDLE', WORDLE)
  if (enteredLetter.length === 1 || enteredLetter === 'Enter' || enteredLetter === 'Backspace' || enteredLetter.toLowerCase() === 'f12' || reload) {
    const letters = firstRowLetters.children;
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
  else event.preventDefault();
})

letter.forEach((item: HTMLDivElement) => item.addEventListener('click', (event: MouseEvent) => {
  const clickedLetter = (event.target as HTMLDivElement).innerText;
  const letters = Wordle_Row[currentRow].children;
  if (clickedLetter === 'Backspace' && row_letters[currentRow] >= 0) {
    RemoveLetterAction();
  }
  else if (clickedLetter.toLowerCase() === 'enter') {
    console.log('WORDLE', WORDLE)
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
}))

