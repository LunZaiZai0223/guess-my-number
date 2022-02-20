const inputEle = document.querySelector('input');
const checkButton = document.querySelector("[data-button-content='Check!']");

const userInfo = {
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
  } else if (Number(inputValue) > endGameNumber) {
    showIsToHighMessage(messageEle, messageWrapper);
  } else if (Number(inputValue) < endGameNumber) {
    showIsToLowMessage(messageEle, messageWrapper);
  }
};

const showIsToHighMessage = (messageEle, messageWrapper) => {
  messageEle.textContent = 'To high!';
  messageWrapper.classList.add('is-incorrect');
};

const showIsToLowMessage = (messageEle, messageWrapper) => {
  messageEle.textContent = 'To Low!';
  messageWrapper.classList.add('is-incorrect');
};

const showIsCorrectMessage = (messageEle, messageWrapper) => {
  messageEle.textContent = "Good Job! It's correct!";
  messageWrapper.classList.add('is-correct');
};

const messageDefault = (inputValue) => {
  const messageEle = document.querySelector('.message span');
  const messageWrapper = messageEle.parentElement;
  if (inputValue === '') {
    messageWrapper.classList.remove('is-correct', 'is-incorrect');
    messageEle.textContent = 'Start guessing...';
  }
};

// events
const handleInput = (event) => {
  const eventOwner = event.currentTarget;
  const inputValue = event.target.value;
  changeInputValue(inputValue, eventOwner);
  messageDefault(inputValue);
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

const endGameNumber = getEndGameNumber();

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
//   4. 失敗時 - hp
//   5. 結束
//        a. 成功 -> 變顏色，顯示次數，如最高記錄
//        b. 失敗 -> popup: you are dead
//      ----> 都不能再玩了，除非按下 new game
//   6. rwd
