const quizData = [
    {
<<<<<<< HEAD
        question: "Which language runs in a web browser?",
        a: "1996",
        b: "C",
        c: "Python",
        d: "javascript",
=======
        question: "Koji je najviši vrh na svetu?",
        a: "Kilimandžaro",
        b: "K2",
        c: "Monblan",
        d: "Mont Everest",
>>>>>>> 2ad924313a4ddd688ed752ccd06727e2898a3c36
        correct: "d",
    },
    {
        question: "Ko je otac geografije?",
        a: "Eratosten",
        b: "Arhimed",
        c: "Epikur",
        d: "Euripid",
        correct: "a",
    },
    {
        question: "Koji je glavni grad Letonije?",
        a: "Viljnus",
        b: "Talin",
        c: "Riga",
        d: "Kišinjev",
        correct: "c",
    },
    {
        question: "Ko je naš najpoznatiji geograf?",
        a: "Milutin Milanković",
        b: "Jovan Cvijić",
        c: "Mihailo Petrović Alas",
        d: "Niko od navedenih",
        correct: "b",
    },
    {
        question: "Erozija je?",
        a: "Razaranje postojećeg tla",
        b: "Akumuliranje zemlje",
        c: "Formiranje kriptodepresije",
        d: "Ništa od navedenog",
        correct: "a",
    },


];

quizData[0].a.src = '../pocetna.jpeg'

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

<<<<<<< HEAD
           <button onclick="location.reload()"> Ajmo ponovo :) </button>
=======
           <button onclick="location.reload()">Ponovi</button>
>>>>>>> 2ad924313a4ddd688ed752ccd06727e2898a3c36
           `
        
       }
    }
})