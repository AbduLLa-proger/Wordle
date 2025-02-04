/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://wordly/./src/styles/styles.css?");

/***/ }),

/***/ "./src/typescript.ts":
/*!***************************!*\
  !*** ./src/typescript.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styles/styles.css */ \"./src/styles/styles.css\");\n/* harmony import */ var _assets_images_wordle_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @assets/images/wordle.png */ \"./src/assets/images/wordle.png\");\n/* harmony import */ var _writeFile_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./writeFile.ts */ \"./src/writeFile.ts\");\n\n\n\nconst giveUp = document.querySelector('.giveUp');\nconst letter = document.querySelectorAll('.wordle__letter');\nconst popup = document.querySelectorAll('.wordle__popup');\nconst closePopup = document.querySelector('.close-popup');\nconst wordle = document.querySelector('.wordle');\nconst winner = document.querySelector('.winner');\nconst loser = document.querySelector('.loser');\nconst statistics = document.querySelector('.statistics');\nconst wordleStatistics = document.querySelector('.wordle_statistics');\nconst wordleLetters = document.querySelector('.wordle_container__letters');\nconst wordleKeyboard = document.querySelector('.wordle_container__keyboard');\nconst closeWordleStatistics = document.querySelector('.close-wordle_statistics');\nconst restartGame = document.querySelector('.restart-the-game');\nconst wordleStatusText = document.querySelector('.wordle__status-text');\nconst wordleStatusImage = document.querySelector('.wordle__status-image');\nconst wordleNotFound = document.querySelector('.wordle__popup-word-not-found');\nconst closeWordleStatus = document.querySelector('.close-wordle_status');\nconst wordleChosenWord = document.querySelector('.wordle_chosen-word');\nconst gameStatus = document.querySelector('.wordle-game_status');\nconst wordleNewGame = document.querySelector('.wordle_new-game');\nconst firstRowLetters = document.querySelector('.first_row');\nconst secondRowLetters = document.querySelector('.second_row');\nconst thirdRowLetters = document.querySelector('.third_row');\nconst fourthRowLetters = document.querySelector('.fourth_row');\nconst fifthRowLetters = document.querySelector('.fifth_row');\nconst sixthRowLetters = document.querySelector('.sixth_row');\nlet WORDLE_WORDS = [];\nlet CHOSEN_WORD = '';\nconst GET_RANDOM_WORD = () => WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];\nconst row_letters = {\n    0: 0,\n    1: 0,\n    2: 0,\n    3: 0,\n    4: 0,\n    5: 0\n};\nconst Wordle_Row = {\n    0: firstRowLetters,\n    1: secondRowLetters,\n    2: thirdRowLetters,\n    3: fourthRowLetters,\n    4: fifthRowLetters,\n    5: sixthRowLetters\n};\nlet WORDLE = '';\nlet currentRow = 0;\nlet foundLetter = 0;\nlet isGameFinished = false;\nlet wordNotFound = false;\nconst isLetter = /^[A-Za-z]$/;\ncloseWordleStatus.addEventListener('click', () => {\n    popup[3].classList.add('notVisible');\n});\nwordleNewGame.addEventListener('click', () => {\n    ResetLetters(0);\n    ResetLetters(1);\n    ResetLetters(2);\n    ResetLetters(3);\n    ResetLetters(4);\n    ResetLetters(5);\n    wordleStatusImage.classList.add('notVisible');\n    popup[3].classList.add('notVisible');\n    gameStatus.classList.add('notVisible');\n    winner.classList.contains('notVisible') ? loser.classList.add('notVisible') : winner.classList.add('notVisible');\n    CHOSEN_WORD = GET_RANDOM_WORD();\n    currentRow = 0;\n});\ngiveUp.addEventListener('click', () => {\n    popup[0].classList.remove('notVisible');\n    popup[0].classList.add('visible');\n    popup[0].classList.add('disabled');\n});\nconst giveUpPopupAnimation = () => {\n    popup[0].classList.remove('visible');\n    popup[0].classList.add('hidden');\n    setTimeout(() => {\n        popup[0].classList.add('notVisible');\n        popup[0].classList.remove('hidden');\n        popup[0].classList.remove('disabled');\n    }, 500);\n};\nrestartGame.addEventListener('click', () => {\n    let letterColumn = 0;\n    if (Wordle_Row[letterColumn].children[0].innerText) {\n        ResetLetters(letterColumn);\n        ++letterColumn;\n    }\n    if (Wordle_Row[letterColumn].children[0].innerText) {\n        ResetLetters(letterColumn);\n        ++letterColumn;\n    }\n    if (Wordle_Row[letterColumn].children[0].innerText) {\n        ResetLetters(letterColumn);\n        ++letterColumn;\n    }\n    if (Wordle_Row[letterColumn].children[0].innerText) {\n        ResetLetters(letterColumn);\n        ++letterColumn;\n    }\n    if (Wordle_Row[letterColumn].children[0].innerText) {\n        ResetLetters(letterColumn);\n        ++letterColumn;\n    }\n    if (Wordle_Row[letterColumn].children[0].innerText) {\n        ResetLetters(letterColumn);\n        ++letterColumn;\n    }\n    gameStatus.classList.add('notVisible');\n    winner.classList.contains('notVisible') ? loser.classList.add('notVisible') : winner.classList.add('notVisible');\n    giveUpPopupAnimation();\n    CHOSEN_WORD = GET_RANDOM_WORD();\n    currentRow = 0;\n});\nclosePopup.addEventListener('click', () => {\n    giveUpPopupAnimation();\n});\nstatistics.addEventListener('click', () => {\n    wordleLetters.classList.add('notVisible');\n    wordleKeyboard.classList.add('notVisible');\n    wordleStatistics.classList.remove('notVisible');\n});\ncloseWordleStatistics.addEventListener('click', () => {\n    wordleStatistics.classList.add('notVisible');\n    wordleLetters.classList.remove('notVisible');\n    wordleKeyboard.classList.remove('notVisible');\n});\nconst isDisabled = () => popup[0].classList.contains('disabled') || popup[1].classList.contains('disabled') || popup[2].classList.contains('disabled');\nconst ResetLetters = (index) => {\n    const letters = Wordle_Row[index].children;\n    row_letters[index] = 0;\n    for (let i = 0; i < letters.length; i++) {\n        const wordleLetter = letters[i].innerText.toLowerCase();\n        if (wordleLetter.length === 0) {\n            break;\n        }\n        const keyboard = document.querySelector(`.${wordleLetter}`);\n        letters[i].innerText = '';\n        letters[i].classList.remove('wordle-add__letter');\n        if (letters[i].classList.contains('foundLetter')) {\n            letters[i].classList.remove('foundLetter');\n            keyboard.classList.remove('foundLetter');\n        }\n        else if (letters[i].classList.contains('almostFoundLetter')) {\n            letters[i].classList.remove('almostFoundLetter');\n            keyboard.classList.remove('almostFoundLetter');\n        }\n        else {\n            letters[i].classList.remove('notFoundLetter');\n            keyboard.classList.remove('notFoundLetter');\n        }\n        letters[i].style.color = \"#3e4052\";\n        keyboard.style.color = \"#3e4052\";\n    }\n};\nconst AddLetterAction = (enteredLetter) => {\n    const letters = Wordle_Row[currentRow].children;\n    row_letters[currentRow] = row_letters[currentRow] < 0 ? row_letters[currentRow] + 1 : row_letters[currentRow];\n    letters[row_letters[currentRow]].textContent = enteredLetter;\n    WORDLE += enteredLetter;\n    letters[row_letters[currentRow]].classList.add('wordle-add__letter');\n    row_letters[currentRow] += 1;\n};\nconst RemoveLetterAction = () => {\n    const letters = Wordle_Row[currentRow].children;\n    row_letters[currentRow] = row_letters[currentRow] > 0 ? row_letters[currentRow] - 1 : row_letters[currentRow];\n    letters[row_letters[currentRow]].classList.remove('wordle-add__letter');\n    WORDLE = WORDLE.slice(0, -1);\n    letters[row_letters[currentRow]].textContent = '';\n};\nconst ShortPopUp = () => {\n    popup[1].classList.remove('notVisible');\n    popup[1].classList.add('visible');\n    popup[2].classList.add('disabled');\n    setTimeout(() => {\n        popup[1].classList.add('notVisible');\n        popup[1].classList.remove('visible');\n        popup[2].classList.remove('disabled');\n    }, 1500);\n};\nconst NotFoundPopUp = () => {\n    popup[2].classList.remove('notVisible');\n    popup[2].classList.add('visible');\n    popup[2].classList.add('disabled');\n    setTimeout(() => {\n        popup[2].classList.add('notVisible');\n        popup[2].classList.remove('visible');\n        popup[2].classList.remove('disabled');\n    }, 1500);\n};\nconst CheckWordle = (word) => {\n    const letters = Wordle_Row[currentRow].children;\n    let CheckChosenWord = CHOSEN_WORD;\n    for (let i = 0; i < letters.length; i++) {\n        letters[i].style.color = 'white';\n        letters[i].classList.remove('wordle-add__letter');\n        if (CHOSEN_WORD[i] === word[i]) {\n            letters[i].classList.add('foundLetter');\n            foundLetter++;\n        }\n        else if (CheckChosenWord?.includes(word[i])) {\n            letters[i].classList.add('almostFoundLetter');\n            let removedLetter = CheckChosenWord.split('');\n            removedLetter[i] = '';\n            CheckChosenWord = removedLetter.join('');\n        }\n        else {\n            letters[i].classList.add('notFoundLetter');\n        }\n    }\n    for (let i = 0; i < letters.length; i++) {\n        const keyboard = document.querySelector(`.${word[i]}`);\n        if (CHOSEN_WORD[i] === word[i] && !keyboard.classList.contains('foundLetter')) {\n            keyboard.classList.add('foundLetter');\n            if (keyboard.classList.contains('almostFoundLetter')) {\n                keyboard.classList.remove('almostFoundLetter');\n            }\n            if (keyboard.classList.contains('notFoundLetter')) {\n                keyboard.classList.remove('notFoundLetter');\n            }\n        }\n        else if (CheckChosenWord?.includes(word[i]) && !keyboard.classList.contains('almostFoundLetter') && !keyboard.classList.contains('foundLetter')) {\n            keyboard.classList.add('almostFoundLetter');\n            if (keyboard.classList.contains('notFoundLetter')) {\n                keyboard.classList.remove('notFoundLetter');\n            }\n        }\n        else {\n            if (!keyboard.classList.contains('notFoundLetter') && !keyboard.classList.contains('foundLetter') && !keyboard.classList.contains('almostFoundLetter')) {\n                keyboard.classList.add('notFoundLetter');\n            }\n        }\n        keyboard.style.color = 'white';\n    }\n    if (foundLetter === letters.length) {\n        isGameFinished = true;\n        if (!wordleNotFound.classList.contains('notVisible')) {\n            wordleNotFound.classList.add('notVisible');\n        }\n        gameStatus.classList.remove('notVisible');\n        winner.classList.remove('notVisible');\n        wordleChosenWord.innerText = CHOSEN_WORD;\n        wordleStatusText.innerText = 'You Won!';\n        wordleStatusImage.classList.remove('notVisible');\n        setTimeout(() => popup[3].classList.remove('notVisible'), 1000);\n    }\n    else {\n        currentRow++;\n        if (Wordle_Row[currentRow]?.children === undefined) {\n            wordNotFound = true;\n            gameStatus.classList.remove('notVisible');\n            loser.classList.remove('notVisible');\n            wordleChosenWord.innerText = CHOSEN_WORD;\n            wordleStatusText.innerText = 'You Lost!';\n            if (wordleNotFound.classList.contains('notVisible')) {\n                wordleNotFound.classList.remove('notVisible');\n            }\n            setTimeout(() => popup[3].classList.remove('notVisible'), 1000);\n        }\n    }\n    foundLetter = 0;\n    WORDLE = '';\n};\nwordle.addEventListener('keydown', (event) => {\n    const enteredLetter = event.key;\n    console.log('CHOSEN_WORD', CHOSEN_WORD);\n    const allowedCtrl = event.ctrlKey &&\n        (event.key.toLowerCase() === \"a\" || event.key.toLowerCase() === \"r\" ||\n            event.key.toLowerCase() === \"s\" || event.key.toLowerCase() === \"d\" ||\n            event.key.toLowerCase() === \"n\" || event.key.toLowerCase() === \"h\" ||\n            event.key.toLowerCase() === \"j\" || event.key.toLowerCase() === \"p\" ||\n            event.key.toLowerCase() === \"o\" || event.key.toLowerCase() === \"u\" || event.key.toLowerCase() === \"f\");\n    if (enteredLetter.length === 1 || enteredLetter === 'Enter' || enteredLetter === 'Backspace' || enteredLetter.toLowerCase() === 'f12' || allowedCtrl) {\n        const letters = firstRowLetters.children;\n        if (enteredLetter.length > 1 && !isLetter.test(enteredLetter) && enteredLetter.toLowerCase() !== 'f12' && enteredLetter !== 'Backspace' && enteredLetter !== 'Enter' && !allowedCtrl) {\n            event.preventDefault();\n        }\n        else if (enteredLetter === 'Enter' && isDisabled()) {\n            event.preventDefault();\n        }\n        else if (enteredLetter.length === 1 && isLetter.test(enteredLetter) && letters.length > row_letters[currentRow] && !event.ctrlKey && !popup[0].classList.contains('disabled')) {\n            AddLetterAction(enteredLetter);\n        }\n        else if (enteredLetter === 'Backspace' && row_letters[currentRow] >= 0 && !popup[0].classList.contains('disabled')) {\n            RemoveLetterAction();\n        }\n        else if (enteredLetter === 'Enter' && !popup[0].classList.contains('disabled')) {\n            if (row_letters[currentRow] !== letters.length) {\n                ShortPopUp();\n            }\n            else if (row_letters[currentRow] === letters.length && !WORDLE_WORDS.includes(WORDLE.toLowerCase())) {\n                NotFoundPopUp();\n            }\n            else {\n                CheckWordle(WORDLE.toLowerCase());\n            }\n        }\n    }\n    else\n        event.preventDefault();\n});\nletter.forEach((item) => item.addEventListener('click', (event) => {\n    const clickedLetter = event.target.innerText;\n    const letters = Wordle_Row[currentRow].children;\n    if (clickedLetter === 'Backspace' && row_letters[currentRow] >= 0) {\n        RemoveLetterAction();\n    }\n    else if (clickedLetter.toLowerCase() === 'enter') {\n        if (row_letters[currentRow] !== letters.length) {\n            ShortPopUp();\n        }\n        else if (row_letters[currentRow] === letters.length && !WORDLE_WORDS.includes(WORDLE)) {\n            NotFoundPopUp();\n        }\n        else {\n            CheckWordle(WORDLE);\n        }\n    }\n    else if (letters.length > row_letters[currentRow] && clickedLetter.length === 1) {\n        AddLetterAction(clickedLetter);\n    }\n}));\nconst GENERATE_RANDOM_WORD = async () => {\n    try {\n        const response = await fetch(\"https://api.datamuse.com/words?sp=??????&max=1000\");\n        const data = await response.json();\n        WORDLE_WORDS = data.map((value) => value.word);\n        // console.log(WORDLE_WORDS, WORDLE_WORDS.length)\n        if (data.length > 0) {\n            CHOSEN_WORD = WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];\n        }\n        else {\n            CHOSEN_WORD = 'No words found';\n        }\n    }\n    catch (error) {\n        CHOSEN_WORD = 'error fetch';\n    }\n};\n// const createTxtFile = (folderPath: string, fileName: string, content: string) => {\n//   console.log('inside txt file')\n//   // Ensure the folder exists\n//   if (!fs.existsSync(folderPath)) {\n//     fs.mkdirSync(folderPath, { recursive: true });\n//   }\n//   // Path for the file\n//   const filePath = path.join(folderPath, fileName);\n//   // Write content to the file\n//   fs.writeFileSync(filePath, content, 'utf8');\n//   console.log(`File created at: ${filePath}`);\n// };\n// // Usage\n// const folderPath = path.join(__dirname, 'words'); // Replace with your folder path\n// const fileName = 'example.txt';\n// const content = 'Hello, this is the content of the file.';\n// createTxtFile(folderPath, fileName, content);\nconst getDefinition = async (word) => {\n    try {\n        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);\n        const data = await response.json();\n        if (data[0]?.meanings) {\n            // Extract the first definition\n            const definition = data[0].meanings[0].definitions[0].definition;\n            console.log(`Definition of \"${word}\":`, definition);\n            return definition;\n        }\n        else {\n            console.log(`No definition found for \"${word}\".`);\n            return null;\n        }\n    }\n    catch (error) {\n        console.error(\"Error fetching definition:\", error);\n        return null;\n    }\n};\nconst fetchAllSixLetterWords = async () => {\n    const apiKey = '6692acbcbbmsh72a00711c8a6152p105343jsn12d6bce8670d';\n    const apiHost = 'wordsapiv1.p.rapidapi.com';\n    const words = [];\n    let page = 1; // Start with the first page\n    const limit = 100; // Max results per page\n    let hasMore = true;\n    try {\n        while (hasMore) {\n            const response = await fetch(`https://wordsapiv1.p.rapidapi.com/words/?letters=6&page=${page}&limit=${limit}`, {\n                method: 'GET',\n                headers: {\n                    'x-rapidapi-key': apiKey,\n                    'x-rapidapi-host': apiHost,\n                },\n            });\n            const data = await response.json();\n            console.log('data', data);\n            // Check if there are any words in the current response\n            if (data.results.data.length > 0) {\n                words.push(...data.results.data); // Add words to the result array\n                page++; // Move to the next page\n            }\n            else {\n                hasMore = false; // Stop fetching if no more words\n            }\n        }\n        console.log('All six-letter words:', words);\n        return words; // Return the full list of words\n    }\n    catch (error) {\n        console.error('Error fetching six-letter words:', error);\n        return [];\n    }\n};\n// fetchAllSixLetterWords();\n// GENERATE_RANDOM_WORD();\n\n\n//# sourceURL=webpack://wordly/./src/typescript.ts?");

/***/ }),

/***/ "./src/writeFile.ts":
/*!**************************!*\
  !*** ./src/writeFile.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\nconst fileName = 'example.txt';\nconst content = 'This is a sample text file';\nfs__WEBPACK_IMPORTED_MODULE_0___default().writeFile(fileName, content, (err) => {\n    if (err) {\n        console.error('Error writing file:', err);\n    }\n    else {\n        console.log(`${fileName} was created successfully.`);\n    }\n});\n\n\n//# sourceURL=webpack://wordly/./src/writeFile.ts?");

/***/ }),

/***/ "./src/assets/images/wordle.png":
/*!**************************************!*\
  !*** ./src/assets/images/wordle.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/images/wordle.png\";\n\n//# sourceURL=webpack://wordly/./src/assets/images/wordle.png?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/typescript.ts");
/******/ 	
/******/ })()
;