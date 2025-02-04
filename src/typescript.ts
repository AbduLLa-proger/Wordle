import "@styles/styles.css";
import "@assets/images/wordle.png";
import "./writeFile.ts"
const giveUp = document.querySelector('.giveUp') as HTMLDivElement;
const letter = document.querySelectorAll('.wordle__letter') as NodeListOf<HTMLDivElement>;
const popup = document.querySelectorAll('.wordle__popup') as NodeListOf<HTMLDivElement>;
const closePopup = document.querySelector('.close-popup') as HTMLDivElement;
const wordle = document.querySelector('.wordle') as HTMLDivElement;
const winner = document.querySelector('.winner') as HTMLDivElement;
const loser = document.querySelector('.loser') as HTMLDivElement;
const statistics = document.querySelector('.statistics') as HTMLDivElement;
const wordleStatistics = document.querySelector('.wordle_statistics') as HTMLDivElement;
const wordleLetters = document.querySelector('.wordle_container__letters') as HTMLDivElement;
const wordleKeyboard = document.querySelector('.wordle_container__keyboard') as HTMLDivElement;
const closeWordleStatistics = document.querySelector('.close-wordle_statistics') as HTMLDivElement;
const restartGame = document.querySelector('.restart-the-game') as HTMLDivElement;
const wordleStatusText = document.querySelector('.wordle__status-text') as HTMLDivElement;
const wordleStatusImage = document.querySelector('.wordle__status-image') as HTMLDivElement;
const wordleNotFound = document.querySelector('.wordle__popup-word-not-found') as HTMLDivElement;
const closeWordleStatus = document.querySelector('.close-wordle_status') as HTMLDivElement;
const wordleChosenWord = document.querySelector('.wordle_chosen-word') as HTMLDivElement;
const gameStatus = document.querySelector('.wordle-game_status') as HTMLDivElement;
const wordleNewGame = document.querySelector('.wordle_new-game') as HTMLDivElement;
const firstRowLetters = document.querySelector('.first_row') as HTMLDivElement;
const secondRowLetters = document.querySelector('.second_row') as HTMLDivElement;
const thirdRowLetters = document.querySelector('.third_row') as HTMLDivElement;
const fourthRowLetters = document.querySelector('.fourth_row') as HTMLDivElement;
const fifthRowLetters = document.querySelector('.fifth_row') as HTMLDivElement;
const sixthRowLetters = document.querySelector('.sixth_row') as HTMLDivElement;

interface IWordle_Words {
  word: string;
  score: number;
}

let WORDLE_WORDS: string[] = [];
let CHOSEN_WORD = '';

const GET_RANDOM_WORD = () => WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];

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

closeWordleStatus.addEventListener('click', () => {
  popup[3].classList.add('notVisible');
})

wordleNewGame.addEventListener('click', () => {
  ResetLetters(0);
  ResetLetters(1);
  ResetLetters(2);
  ResetLetters(3);
  ResetLetters(4);
  ResetLetters(5);
  wordleStatusImage.classList.add('notVisible');
  popup[3].classList.add('notVisible');
  gameStatus.classList.add('notVisible');
  winner.classList.contains('notVisible') ? loser.classList.add('notVisible') : winner.classList.add('notVisible');
  CHOSEN_WORD = GET_RANDOM_WORD();
  currentRow = 0;
})

giveUp.addEventListener('click', () => {
  popup[0].classList.remove('notVisible');
  popup[0].classList.add('visible');
  popup[0].classList.add('disabled');
})


const giveUpPopupAnimation = () => {
  popup[0].classList.remove('visible');
  popup[0].classList.add('hidden');
  setTimeout(() => {
    popup[0].classList.add('notVisible')
    popup[0].classList.remove('hidden');
    popup[0].classList.remove('disabled');
  }, 500);
}
restartGame.addEventListener('click', () => {
  let letterColumn = 0;
  if ((Wordle_Row[letterColumn].children[0] as HTMLDivElement).innerText) {
    ResetLetters(letterColumn);
    ++letterColumn;
  }
  if ((Wordle_Row[letterColumn].children[0] as HTMLDivElement).innerText) {
    ResetLetters(letterColumn);
    ++letterColumn;
  }
  if ((Wordle_Row[letterColumn].children[0] as HTMLDivElement).innerText) {
    ResetLetters(letterColumn);
    ++letterColumn;
  }
  if ((Wordle_Row[letterColumn].children[0] as HTMLDivElement).innerText) {
    ResetLetters(letterColumn);
    ++letterColumn;
  }
  if ((Wordle_Row[letterColumn].children[0] as HTMLDivElement).innerText) {
    ResetLetters(letterColumn);
    ++letterColumn;
  }
  if ((Wordle_Row[letterColumn].children[0] as HTMLDivElement).innerText) {
    ResetLetters(letterColumn);
    ++letterColumn;
  }
  gameStatus.classList.add('notVisible');
  winner.classList.contains('notVisible') ? loser.classList.add('notVisible') : winner.classList.add('notVisible');
  giveUpPopupAnimation();
  CHOSEN_WORD = GET_RANDOM_WORD();
  currentRow = 0;
})

closePopup.addEventListener('click', () => {
  giveUpPopupAnimation();
})

statistics.addEventListener('click', () => {
  wordleLetters.classList.add('notVisible');
  wordleKeyboard.classList.add('notVisible');
  wordleStatistics.classList.remove('notVisible');

})

closeWordleStatistics.addEventListener('click', () => {
  wordleStatistics.classList.add('notVisible');
  wordleLetters.classList.remove('notVisible');
  wordleKeyboard.classList.remove('notVisible');
})

const isDisabled = () => popup[0].classList.contains('disabled') || popup[1].classList.contains('disabled') || popup[2].classList.contains('disabled')

const ResetLetters = (index: number) => {
  const letters = Wordle_Row[index].children;
  row_letters[index] = 0;
  for (let i = 0; i < letters.length; i++) {
    const wordleLetter = (letters[i] as HTMLDivElement).innerText.toLowerCase();
    if (wordleLetter.length === 0) {
      break;
    }
    const keyboard = document.querySelector(`.${wordleLetter}`) as HTMLDivElement;
    (letters[i] as HTMLDivElement).innerText = '';
    letters[i].classList.remove('wordle-add__letter');
    if (letters[i].classList.contains('foundLetter')) {
      letters[i].classList.remove('foundLetter');
      keyboard.classList.remove('foundLetter');
    }
    else if (letters[i].classList.contains('almostFoundLetter')) {
      letters[i].classList.remove('almostFoundLetter');
      keyboard.classList.remove('almostFoundLetter');

    }
    else {
      letters[i].classList.remove('notFoundLetter');
      keyboard.classList.remove('notFoundLetter');
    }
    (letters[i] as HTMLDivElement).style.color = "#3e4052";
    keyboard.style.color = "#3e4052";
  }
}

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
    (letters[i] as HTMLDivElement).style.color = 'white';
    letters[i].classList.remove('wordle-add__letter');
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

  for (let i = 0; i < letters.length; i++) {
    const keyboard = document.querySelector(`.${word[i]}`) as HTMLDivElement;

    if (CHOSEN_WORD[i] === word[i] && !keyboard.classList.contains('foundLetter')) {
      keyboard.classList.add('foundLetter');
      if (keyboard.classList.contains('almostFoundLetter')) {
        keyboard.classList.remove('almostFoundLetter')
      }
      if (keyboard.classList.contains('notFoundLetter')) {
        keyboard.classList.remove('notFoundLetter')
      }
    }
    else if (CheckChosenWord?.includes(word[i]) && !keyboard.classList.contains('almostFoundLetter') && !keyboard.classList.contains('foundLetter')) {
      keyboard.classList.add('almostFoundLetter');
      if (keyboard.classList.contains('notFoundLetter')) {
        keyboard.classList.remove('notFoundLetter')
      }
    }
    else {
      if (!keyboard.classList.contains('notFoundLetter') && !keyboard.classList.contains('foundLetter') && !keyboard.classList.contains('almostFoundLetter')) {
        keyboard.classList.add('notFoundLetter');
      }
    }
    keyboard.style.color = 'white';

  }

  if (foundLetter === letters.length) {
    isGameFinished = true;
    if (!wordleNotFound.classList.contains('notVisible')) {
      wordleNotFound.classList.add('notVisible');
    }
    gameStatus.classList.remove('notVisible');
    winner.classList.remove('notVisible');
    wordleChosenWord.innerText = CHOSEN_WORD;
    wordleStatusText.innerText = 'You Won!';
    wordleStatusImage.classList.remove('notVisible');
    setTimeout(() => popup[3].classList.remove('notVisible'), 1000);
  }
  else {
    currentRow++;
    if (Wordle_Row[currentRow]?.children === undefined) {
      wordNotFound = true;
      gameStatus.classList.remove('notVisible');
      loser.classList.remove('notVisible');
      wordleChosenWord.innerText = CHOSEN_WORD;
      wordleStatusText.innerText = 'You Lost!';
      if (wordleNotFound.classList.contains('notVisible')) {
        wordleNotFound.classList.remove('notVisible');
      }
      setTimeout(() => popup[3].classList.remove('notVisible'), 1000);

    }
  }
  foundLetter = 0;
  WORDLE = '';
}

wordle.addEventListener('keydown', (event: KeyboardEvent) => {
  const enteredLetter = event.key;
  console.log('CHOSEN_WORD', CHOSEN_WORD)
  const allowedCtrl = event.ctrlKey &&
    (event.key.toLowerCase() === "a" || event.key.toLowerCase() === "r" ||
      event.key.toLowerCase() === "s" || event.key.toLowerCase() === "d" ||
      event.key.toLowerCase() === "n" || event.key.toLowerCase() === "h" ||
      event.key.toLowerCase() === "j" || event.key.toLowerCase() === "p" ||
      event.key.toLowerCase() === "o" || event.key.toLowerCase() === "u" || event.key.toLowerCase() === "f");

  if (enteredLetter.length === 1 || enteredLetter === 'Enter' || enteredLetter === 'Backspace' || enteredLetter.toLowerCase() === 'f12' || allowedCtrl) {
    const letters = firstRowLetters.children;
    if (enteredLetter.length > 1 && !isLetter.test(enteredLetter) && enteredLetter.toLowerCase() !== 'f12' && enteredLetter !== 'Backspace' && enteredLetter !== 'Enter' && !allowedCtrl) {
      event.preventDefault();
    }
    else if (enteredLetter === 'Enter' && isDisabled()) {
      event.preventDefault();
    }
    else if (enteredLetter.length === 1 && isLetter.test(enteredLetter) && letters.length > row_letters[currentRow] && !event.ctrlKey && !popup[0].classList.contains('disabled')) {
      AddLetterAction(enteredLetter);
    }
    else if (enteredLetter === 'Backspace' && row_letters[currentRow] >= 0 && !popup[0].classList.contains('disabled')) {
      RemoveLetterAction();
    }

    else if (enteredLetter === 'Enter' && !popup[0].classList.contains('disabled')) {
      if (row_letters[currentRow] !== letters.length) {
        ShortPopUp();
      }
      else if (row_letters[currentRow] === letters.length && !WORDLE_WORDS.includes(WORDLE.toLowerCase())) {
        NotFoundPopUp();
      }
      else {
        CheckWordle(WORDLE.toLowerCase());
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
    if (row_letters[currentRow] !== letters.length) {
      ShortPopUp();
    }
    else if (row_letters[currentRow] === letters.length && !WORDLE_WORDS.includes(WORDLE)) {
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

const GENERATE_RANDOM_WORD = async () => {
  try {
    const response = await fetch("https://api.datamuse.com/words?sp=??????&max=1000");
    const data: IWordle_Words[] = await response.json();
    WORDLE_WORDS = data.map((value) => value.word)
    // console.log(WORDLE_WORDS, WORDLE_WORDS.length)

    if (data.length > 0) {
      CHOSEN_WORD = WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];
    } else {
      CHOSEN_WORD = 'No words found';
    }
  } catch (error) {
    CHOSEN_WORD = 'error fetch';
  }
};

// const createTxtFile = (folderPath: string, fileName: string, content: string) => {
//   console.log('inside txt file')
//   // Ensure the folder exists
//   if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath, { recursive: true });
//   }

//   // Path for the file
//   const filePath = path.join(folderPath, fileName);

//   // Write content to the file
//   fs.writeFileSync(filePath, content, 'utf8');

//   console.log(`File created at: ${filePath}`);
// };

// // Usage
// const folderPath = path.join(__dirname, 'words'); // Replace with your folder path
// const fileName = 'example.txt';
// const content = 'Hello, this is the content of the file.';

// createTxtFile(folderPath, fileName, content);

const getDefinition = async (word: string) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    if (data[0]?.meanings) {
      // Extract the first definition
      const definition = data[0].meanings[0].definitions[0].definition;
      console.log(`Definition of "${word}":`, definition);
      return definition;
    } else {
      console.log(`No definition found for "${word}".`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching definition:", error);
    return null;
  }
};

const fetchAllSixLetterWords = async () => {
  const apiKey = '6692acbcbbmsh72a00711c8a6152p105343jsn12d6bce8670d';
  const apiHost = 'wordsapiv1.p.rapidapi.com';
  const words = [];
  let page = 1; // Start with the first page
  const limit = 100; // Max results per page
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await fetch(`https://wordsapiv1.p.rapidapi.com/words/?letters=6&page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost,
        },
      });

      const data = await response.json();

      console.log('data', data)
      // Check if there are any words in the current response
      if (data.results.data.length > 0) {
        words.push(...data.results.data); // Add words to the result array
        page++; // Move to the next page
      } else {
        hasMore = false; // Stop fetching if no more words
      }
    }

    console.log('All six-letter words:', words);
    return words; // Return the full list of words
  } catch (error) {
    console.error('Error fetching six-letter words:', error);
    return [];
  }
};



// fetchAllSixLetterWords();


// GENERATE_RANDOM_WORD();

