const quizData = [
    {
        question: "1. Koji je najviši vrh na svetu?",
        a: "Kilimandžaro",
        b: "K2",
        c: "Monblan",
        d: "Mont Everest",
        correct: "d",
    },
    {
        question: "2. Ko se smatra ocem geografije?",
        a: "Eratosten",
        b: "Arhimed",
        c: "Epikur",
        d: "Euripid",
        correct: "a",
    },
    {
        question: "3. Koji je glavni grad Letonije?",
        a: "Viljnus",
        b: "Talin",
        c: "Riga",
        d: "Kišinjev",
        correct: "c",
    },
    {
        question: "4. Ko je naš najpoznatiji geograf?",
        a: "Milutin Milanković",
        b: "Jovan Cvijić",
        c: "Mihailo Petrović Alas",
        d: "Niko od navedenih",
        correct: "b",
    },
    {
        question: "5. Koji je glavni grad Etiopije?",
        a: "Mogadišu",
        b: "Daka",
        c: "Adis Abeba",
        d: "Ništa od navedenog",
        correct: "c",
    },
    {
        question: "6. Erozija je?",
        a: "Razaranje postojećeg tla",
        b: "Akumuliranje zemlje",
        c: "Formiranje kriptodepresije",
        d: "Ništa od navedenog",
        correct: "a",
    },
    {
        question: "7. Koja je reka od ponuđenih bifurkacija?",
        a: "Pek",
        b: "Sava",
        c: "Topčiderka",
        d: "Nerodimka",
        correct: "d",
    },
    {
        question: "8. Koji je glavni grad Moldavije?",
        a: "Minsk",
        b: "Kišinjev",
        c: "Tbilisi",
        d: "Talin",
        correct: "b",
    },
    {
        question: "9. Koja je zvanična valuta u Japanu?",
        a: "Japanski jen",
        b: "Japanski juan",
        c: "Japanski dolar",
        d: "Japanski dinar",
        correct: "a",
    },
    {
        question: "10. Kako se zvao socijalni sistem koji je bio zastupljen u JAR tokom XX veka?",
        a: "Apartrejs",
        b: "Apartman",
        c: "Aparthejd",
        d: "Aparting",
        correct: "c",
    },
    {
        question: "11. Koja je treća najmnogoljudnija zemlja an svetu?",
        a: "Kina",
        b: "Brazil",
        c: "Indija",
        d: "SAD",
        correct: "d",
    },
    {
        question: "12. Na kom kontinentu se nalazi pustinja Atakama?",
        a: "Južna Amerika",
        b: "Afrika",
        c: "Severna Amerika",
        d: "Azija",
        correct: "a",
    },
    {
        question: "13. U kojoj zemlji se nalazi planina Leotar?",
        a: "Srbija",
        b: "Slovenija",
        c: "Bosna i Hercegovina",
        d: "Crna Gora",
        correct: "c",
    },
    {
        question: "14. Koji je glavni grad Perua?",
        a: "Lima",
        b: "LaPaz",
        c: "Santijago",
        d: "Havana",
        correct: "a",
    },
    {
        question: "15. Kako se zove vrh Golije?",
        a: "Tornik",
        b: "Mačkov Kamen",
        c: "Jankov Kamen",
        d: "Babin Zub",
        correct: "c",
    },
    {
        question: "16. Koliko kilometara približno iznosi obim Ekvatora?",
        a: "~120 000",
        b: "~40 000",
        c: "~70 000",
        d: "~10 000",
        correct: "b",
    },
    {
        question: "17. Koji je najveći kontinent?",
        a: "Evropa",
        b: "Afrika",
        c: "Azija",
        d: "Severna Amerika",
        correct: "c",
    },
    {
        question: "18. Koji je glavni grad Jordana?",
        a: "Baku",
        b: "Rijad",
        c: "Islamabad",
        d: "Aman",
        correct: "d",
    },
    {
        question: "19. Koje ostrvo ima najveću površinu na svetu?",
        a: "Borneo",
        b: "Grenland",
        c: "Madagaskar",
        d: "Sumatra",
        correct: "b",
    },
    {
        question: "20. Koja je minimalna visina da bi uzvišenje bilo planina?",
        a: "1000m",
        b: "700m",
        c: "500m",
        d: "250m",
        correct: "c",
    },
    



];

const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
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
           <h2>Svaka čast! Odgovorili ste tačno na ${score}/${quizData.length} pitanja!</h2>

            <button onclick="location.reload()">Ponovi</button>
            <button onclick="window.location.href='./pocetna.html'">Završi</button>
            `
           
       }
    }
})