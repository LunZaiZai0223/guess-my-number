const inputEle = document.querySelector('input');
const checkButton = document.querySelector("[data-button-content='Check!']");

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

const getInputValueResult = (inputValue, endGameNumber) => {
  if (Number(inputValue) === endGameNumber) {
    return { result: 'correct' };
  } else if (Number(inputValue) > endGameNumber) {
    return { result: 'to high' };
  } else if (Number(inputValue) < endGameNumber) {
    return { result: 'to low' };
  }
};

const changeMessage = ({ result }) => {
  const messageEle = document.querySelector('.message span');
  const messageWrapper = messageEle.parentElement;
  console.log(result);
  messageWrapper.classList.remove('is-correct', 'is-incorrect');

  if (result === 'correct') {
    messageEle.textContent = "Good Job! It's correct!";
    messageWrapper.classList.add('is-correct');
  } else if (result === 'to high') {
    messageEle.textContent = 'To high!';
    messageWrapper.classList.add('is-incorrect');
  } else if (result === 'to low') {
    messageEle.textContent = 'To low!';
    messageWrapper.classList.add('is-incorrect');
  }
};

// events
const handleInput = (event) => {
  const eventOwner = event.currentTarget;
  const inputValue = event.target.value;
  changeInputValue(inputValue, eventOwner);
};

const handleKeydown = (event) => {
  const key = event.key;
  const invalidKeys = ['e', '=', '-', '+', '.'];
  if (invalidKeys.includes(key)) {
    event.preventDefault();
  }
};

const handleClick = () => {
  const inputValue = inputEle.value;
  const result = getInputValueResult(inputValue, endGameNumber);
  changeMessage(result);
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
//   1. Guess my number title 跑馬燈
//   2. input enter 也可以觸發檢查
//   3. 檢查完回到打字的時候 message 回去 default
//   4. 失敗時 - hp
//   5. 結束
//        a. 成功 -> 變顏色，顯示次數，如最高記錄
//        b. 失敗 -> popup: you are dead
//      ----> 都不能再玩了，除非按下 new game
//   6. rwd
