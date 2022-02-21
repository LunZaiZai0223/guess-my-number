const inputEle = document.querySelector('input');
const checkButton = document.querySelector("[data-button-content='Check!']");
const hpWrapper = document.querySelector('.hp-wrapper');
const overlay = document.querySelector('.overlay');
const startNewGameButtons = document.querySelectorAll('[data-start-new-game]');
const endgameNumberWrapper = document.querySelector('.endgame-number-wrapper');

startNewGameButtons.forEach((button) => {
  button.addEventListener('click', () => {
    console.log('hit me!');
    initialize();
  });
});

const initializePlayerInfo = () => {
  playerInfo.step = 0;
  playerInfo.currentHp = 10;
};

const initializeEedgameNumber = () => {
  endGameNumber = getEndGameNumber();
  console.log('new number:', endGameNumber);
};

const initializeEedgameNumberStyle = () => {
  endgameNumberWrapper.classList.remove('is-correct');
  endgameNumberWrapper.children[0].textContent = '?';
};

const addClickEventBack = () => {
  inputEle.removeAttribute('readonly');
  checkButton.addEventListener('click', handleClick);
};

const initialize = () => {
  initializePlayerInfo();
  hideOverlay();
  initializeHp();
  initializeEedgameNumber();
  messageDefault();
  if (inputEle.getAttribute('readonly')) {
    addClickEventBack();
  }
  initializeInputValue();
  initializeEedgameNumberStyle();
};

const initializeHp = () => {
  [...hpWrapper.children].forEach((hp) => {
    hp.classList.remove('remove-hp', 'hp-blinking');
  });
};

const initializeInputValue = () => {
  inputEle.value = '';
}

const playerInfo = {
  step: 0,
  currentHp: 10,
  bestScore: 0
};

const getEndGameNumber = () => {
  return Math.floor(Math.random() * 20) + 1;
};

const checkIsInvalidNumber = (inputValue) => {
  return Number(inputValue) > 20 || Number(inputValue) <= 0;
};

const changeInputValue = (inputValue, eventOwner) => {
  if (Number(inputValue) > 20) {
    eventOwner.value = 20;
  } else if (Number(inputValue) <= 0) {
    eventOwner.value = '';
  }
}

// 控制猜對猜錯
const checkNumberIsCorrect = (inputValue, endGameNumber) => {
  const messageEle = document.querySelector('.message span');
  const messageWrapper = messageEle.parentElement;

  if (Number(inputValue) === endGameNumber) {
    showIsCorrectMessage(messageEle, messageWrapper);
    isGameOver();
    displayWinMode();
    const needChangeBestScore = checkCurrentHp();
    if (needChangeBestScore) {
      updateBestScore();
    }
  } else if (Number(inputValue) > endGameNumber) {
    showIsToHighMessage(messageEle, messageWrapper);
    changePlayerInfo();
    checkPlayerInfo();
    changeHpDisplay();
    addHpBlinkingClass();
  } else if (Number(inputValue) < endGameNumber) {
    showIsToLowMessage(messageEle, messageWrapper);
    changePlayerInfo();
    checkPlayerInfo();
    changeHpDisplay();
    addHpBlinkingClass();
  }
};

const showIsToHighMessage = (messageEle, messageWrapper) => {
  messageEle.textContent = 'Too high!';
  messageWrapper.classList.add('is-incorrect');
};

const showIsToLowMessage = (messageEle, messageWrapper) => {
  messageEle.textContent = 'Too Low!';
  messageWrapper.classList.add('is-incorrect');
};

const showIsCorrectMessage = (messageEle, messageWrapper) => {
  messageEle.textContent = "Good Job! It's correct!";
  messageWrapper.classList.add('is-correct');
};

const changeHpDisplay = () => {
  if (playerInfo.currentHp >= 0) {
    hpWrapper.children[hpWrapper.children.length - [playerInfo.step]].classList.remove('hp-blinking');
    hpWrapper.children[playerInfo.currentHp].classList.add('remove-hp');
  }
};

const addHpBlinkingClass = () => {
  if (playerInfo.step >= 7 && playerInfo.step <= 9) {
    console.log('12312');
    hpWrapper.children[playerInfo.currentHp - 1].classList.add('hp-blinking');
  }
};

const changePlayerInfo = () => {
  playerInfo.step ++;
  playerInfo.currentHp --;
};

const checkPlayerInfo = () => {
  console.log('123123');
  if (playerInfo.currentHp === 0) {
    isGameOver();
    displayOverlay();
    console.log('remove events');
  }
};

const displayOverlay = () => {
  overlay.classList.add('is-active');
};

const hideOverlay = () => {
  overlay.classList.remove('is-active');
};

const isGameOver = () => {
  // inputEle.removeEventListener('input', handleInput);
  // inputEle.removeEventListener('keydown', handleKeydown);
  inputEle.setAttribute('readonly', true);
  checkButton.removeEventListener('click', handleClick);
};

const messageDefault = () => {
  const messageEle = document.querySelector('.message span');
  const messageWrapper = messageEle.parentElement;
  messageWrapper.classList.remove('is-correct', 'is-incorrect');
  messageEle.textContent = 'Start guessing...';
};

const displayWinMode = () => {
  endgameNumberWrapper.classList.add('is-correct');
  endgameNumberWrapper.children[0].textContent = endGameNumber;
};

const checkCurrentHp = () => {
  console.log(playerInfo.step);
  return playerInfo.currentHp > playerInfo.bestScore;
};

const updateBestScore = () => {
  playerInfo.bestScore = playerInfo.currentHp;
  const spans = document.querySelectorAll('[data-best-score]');
  spans.forEach((span) => {
    span.textContent = playerInfo.bestScore;
  });
};

// events
const handleInput = (event) => {
  const eventOwner = event.currentTarget;
  const inputValue = event.target.value;
  changeInputValue(inputValue, eventOwner);
  if (inputValue === '') {
    messageDefault(inputValue);
  }
};

const handleKeydown = (event) => {
  const key = event.key;
  const invalidKeys = ['e', '=', '-', '+', '.'];
  if (invalidKeys.includes(key)) {
    event.preventDefault();
  }
  if (key === 'Enter' && inputEle.value !== '') {
    checkNumberIsCorrect(inputEle.value, endGameNumber);
  }
};

const handleClick = () => {
  const inputValue = inputEle.value;
  checkNumberIsCorrect(inputValue, endGameNumber);
};

let endGameNumber = getEndGameNumber();

console.log(endGameNumber);

inputEle.addEventListener('input', handleInput);
inputEle.addEventListener('keydown', handleKeydown);
checkButton.addEventListener('click', handleClick);


// ok color: #EBF094
// no ok color: #FB6B90
// change padding: 2rem
// remove hp class => remove-hp

// Todo:
//   1. Guess my number title 跑馬燈 --> NO
//   2. input enter 也可以觸發檢查 --> OK
//   3. 檢查完回到打字的時候 message 回去 default -> OK
//   4. 失敗時 - hp -> OK
//   5. 結束
//        a. 成功 -> 變顏色，顯示次數，如最高記錄
//        b. 失敗 -> popup: you are dead
//      ----> 都不能再玩了，除非按下 new game
//   6. rwd
//   7. 猜對時記錄次數並且比對
