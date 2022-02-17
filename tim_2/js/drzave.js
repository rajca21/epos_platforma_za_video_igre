const quizData = [
  {
    // 0
      question: "Koja je ovo država?",
      a: "Burkina Faso",
      b: "Avganistan",
      c: "Azerbejdžan",
      d: "Uzbekistan",
      correct: "d",
      img: "./uzbekistan.png"
  },
  {
    // 1
      question: "Koja je ovo država?",
      a: "Slovačka",
      b: "Slovenija",
      c: "Estonija",
      d: "Letonija",
      correct: "a",
      img: "./slovacka.png"
  },
  {
    // 2
      question: "Koja je ovo država?",
      a: "Kipar",
      b: "Iran",
      c: "Malta",
      d: "Moldavija",
      correct: "c",
      img: "./malta.png"
  },
  {
      question: "Koja je ovo država?",
      a: "Gana",
      b: "Bolivija",
      c: "Peru",
      d: "Venecuela",
      correct: "b",
      img: "./bolivija.png"
  },
  {
      question: "Koja je ovo država?",
      a: "Bangladeš",
      b: "Japan",
      c: "Oman",
      d: "Jemen",
      correct: "a",
      img: "./banglades.png"
  },


];

const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
var a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')


let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {

  deselectAnswers()

  for(let j = 0; j < quizData.length; j++){
    if(j == currentQuiz){
      var img = document.createElement("img");
      img.src = quizData[j].img;
      var flagg = document.getElementById("flag");

      var e = document.querySelector("#flag");
      var child = e.lastElementChild;
      while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    } 

      img.setAttribute("height", "100");
      img.setAttribute("width", "100");
      img.setAttribute("alt", "Flower");
      flagg.appendChild(img)
    }
  }

  const currentQuizData = quizData[currentQuiz]

  questionEl.innerText = currentQuizData.question
  a_text.innerText = currentQuizData.a
  b_text.innerText = currentQuizData.b
  c_text.innerText = currentQuizData.c
  d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
  let answer
  answerEls.forEach(answerEl => {
      if(answerEl.checked) {
          answer = answerEl.id
      }
  })
  return answer
}


submitBtn.addEventListener('click', () => {
  const answer = getSelected()
  if(answer) {
     if(answer === quizData[currentQuiz].correct) {
         score++
     }

     currentQuiz++

     if(currentQuiz < quizData.length) {
         loadQuiz()
     } else {
         quiz.innerHTML = `
         <h2>You answered ${score}/${quizData.length} questions correctly</h2>

         <button onclick="location.reload()"> Ajmo ponovo :) </button>
         <button onclick="window.location.href='./pocetna.html'"> Vrati se na početak :( </button>
         `
      
     }
  }
})