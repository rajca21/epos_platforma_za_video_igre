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
  {
    question: "Koja je ovo država?",
      a: "Finska",
      b: "Norveška",
      c: "Španija",
      d: "Island",
      correct: "d",
      img: "./island.png"
  },
  {
    question: "Koja je ovo država?",
      a: "Rumunija",
      b: "Andora",
      c: "Bugarska",
      d: "Monako",
      correct: "b",
      img: "./andora.png"
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


function loadQuestion(){
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min) + min);
}

let currentQuiz = 0
let score = 0
let nasao = 0
let uradio = 0
let que
let korisceni = [
  0,
  1,
  2,
  3,
  4,
  5,
  6
]
let trenutni = 7
loadQuiz()

function loadQuiz() {
  let minusi = 0
  for(let f = 0; f < trenutni; f++){
    if(-1 == korisceni[f])
    minusi++
  }

  que = loadQuestion() - 1
  if(minusi == 4){
  for(let f = 0; f < trenutni; f++){
    if(-1 != korisceni[f])
    que = korisceni[f]
    }
  }
  if(minusi == 5){
    for(let f = 0; f < trenutni; f++){
      if(-1 != korisceni[f])
      que = korisceni[f]
      }
    }
  // if(trenutni != 0){
  //   for(let t = 0; t < trenutni; t++){
  //     if(que == korisceni[t]){
  //       loadQuiz()
  //     }
  //   }
  //   korisceni[trenutni] = que
  //   trenutni++
  // }
  // else{
  //   korisceni[trenutni] = que
  //   trenutni++
  // }
  // while()
  for(let t = 0; t < trenutni; t++){
    if(que == korisceni[t]){
     korisceni[t] = -1
     nasao++
    }
  }
  if(nasao == 0){
    loadQuiz()
    return
  }
  console.log(que)
  nasao = 0
  uradio++

  deselectAnswers()

  for(let j = 0; j < quizData.length; j++){
    if(j == que){
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
      img.setAttribute("width", "auto");
      img.setAttribute("alt", "Flower");
      flagg.appendChild(img)
    }
  }

  const currentQuizData = quizData[que]
  currentQuiz++
  questionEl.innerText = currentQuiz + ". "+ currentQuizData.question
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
     if(answer === quizData[que].correct) {
         score++
     }

    //  currentQuiz++

     if(uradio < quizData.length) {
         loadQuiz()
     } else {
      nasao = 0
      uradio = 0
         quiz.innerHTML = `
         <h2>Svaka čast! Odgovorili ste tačno na ${score}/${quizData.length} pitanja!</h2>
    
          <button onclick="location.reload()">Ponovi</button>
          <button onclick="window.location.href='./pocetna.html'">Završi</button>
          `
          score = 0
      
     }
  }
})