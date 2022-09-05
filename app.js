const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timeEl = document.querySelector('#time');
const scoreEl = document.querySelector('#score');
const homeBtn = document.querySelector('.home-btn');
const board = document.querySelector('#board');
const colors = ['#F08080', '#FFA07A', '#FF69B4', '	#FF6347', '#F0E68C', '#DDA0DD', '#9932CC', '#6A5ACD', '#F4A460'];
let time = 0;
let score = 0;
let color = getRandomColor();

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up');
})

timeList.addEventListener('click', (e) => {
  if(e.target.classList.contains('time-btn')){
    time = parseInt(e.target.getAttribute('data-time'));
    startGame();
  }
})

board.addEventListener('click', event => {
  if(event.target.classList.contains('circle')){
    score++;
    event.target.remove();
    createRandomCircle();
  }
})

homeBtn.addEventListener('click', () => {
  window.location.href = window.location.href;
  return false;
})

function startGame(){
  screens[1].classList.add('up');
  setInterval(decreaseTime, 1000)
  createRandomCircle();

  if (time < 10){
    time = `0${time}`
  }

  setTime(time)
}

function decreaseTime(){
  if(time === 0){
    finishGame();
  }
  else{
    let current = --time;

    if (current < 10){
      current = `0${current}`
    }
    
    setTime(current)
  }
}

function setTime(value){
  timeEl.innerHTML = `00:${value}`
}

function finishGame(){
  hideParentNode(timeEl);
  cleanBoard();
  board.append(scoreEl);
  board.append(homeBtn)
  scoreEl.innerHTML = `Score: <span class="primary">${score}</span>`
  homeBtn.classList.remove('hide');
}

function createRandomCircle(){
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add('circle');
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`;
  circle.style.background = getRandomColor();
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  board.append(circle);
}

function getRandomNumber(min, max){
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor(){
  return colors[Math.round(Math.random() * colors.length)];
}

function hideNode(element){
  element.classList.add('hide');
}

function hideParentNode(element){
  element.parentNode.classList.add('hide');
}

function cleanBoard(){
  board.innerHTML = '';
}