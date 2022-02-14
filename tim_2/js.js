const text = document.getElementById("text")

    let questions = [
        {
            number: 1,
            question: "Koji je glavni grad Malija?",
            value: [
                {answer1: "Bamako", correct1: true},
                {answer2: "Tripoli", correct2: false},
                {answer3: "Mozda", correct3: false},
                {answer4: "Ma jok", correct4: false}
            ]
        },
        {
            number: 2,
            question: "Koliko kontinenata postoji?",
            value: [
                {answer1: "6", correct1: false},
                {answer2: "8",correct2: false},
                {answer3: "7", correct3: true},
                {answer4: "9", correct4: false}
            ]
        },
        {
            number: 3,
            question: "Najvisi vrh na svetu je ",
            value: [
                {answer1: "Kilimandzaro", correct1: false },
                {answer2: "Mont Everest", correct2: true },
                {answer3: "Monblan", correct3: false},
                {answer4: "Djeravica", correct4: false}
            ]
        },
        {
            number: 4,
            question: "Koja je najmnogoljudnija drzava na svetu?",
            value: [
                {answer1: "SAD", correct1: false },
                {answer2: "Kina", correct2: true },
                {answer3: "Indija", correct3: false},
                {answer4: "Indonezija", correct4: false}
            ]
        },
        {
            number: 5,
            question: "Koja je najduza reka na svetu?",
            value: [
                {answer1: "Amazon", correct1: false },
                {answer2: "Jangcekjang", correct2: false },
                {answer3: "Misisipi", correct3: false},
                {answer4: "Nil", correct4: true}
            ]
        },
        {
            number: 6,
            question: "Najvisi vrh na svetu je ",
            value: [
                {answer1: "Kilimandzaro", correct1: false },
                {answer2: "Mont Everest", correct2: true },
                {answer3: "Monblan", correct3: false},
                {answer4: "Djeravica", correct4: false}
            ]
        }
    ]

    document.getElementById("btn1").addEventListener("click",startGame)

    var dugme1 = document.getElementById("btn1")
    var dugme2 = document.getElementById("btn2")
    var dugme3 = document.getElementById("btn3")
    var dugme4 = document.getElementById("btn4")

    var nizButtons = [
        dugme1,
        dugme2,
        dugme3,
        dugme4
    ]

    function startGame(){
        let rBr = loadQuestion()
        showQuestion(rBr)
    }

    function showQuestion(questionNumber) {
        
        var newQuestion = questions.find(newQuestion => newQuestion.number === questionNumber)
        // Ispis teksta
        text.innerHTML = newQuestion.question
        
        for(let k = 0; k < 4; k++){
            if(nizButtons[k].classList.contains("red"))
                nizButtons[k].classList.remove("red")
            if(nizButtons[k].classList.contains("green"))
                nizButtons[k].classList.remove("green")
        }
        
        dugme1.textContent = newQuestion.value[0].answer1
        dugme2.textContent = newQuestion.value[1].answer2
        dugme3.textContent = newQuestion.value[2].answer3
        dugme4.textContent = newQuestion.value[3].answer4

        let nizAnswer = [
            newQuestion.value[0].correct1,
            newQuestion.value[1].correct2,
            newQuestion.value[2].correct3,
            newQuestion.value[3].correct4
        ]
        let provera = 0
        let clicked = false
        for(let i = 0; i < 4; i++){
            if(nizAnswer[i]){
                nizButtons[i].addEventListener("click", function(){
                    text.innerHTML = "Tacan odgovor!"
                    nizButtons[i].classList.add("green")
                    provera = 1
                    clicked = true
                })
            }
            else{
                nizButtons[i].addEventListener("click", function(){
                    text.innerHTML = "Pogresan odgovor!"
                    nizButtons[i].classList.add("red")
                    provera = 0
                    clicked = true
                })
            }
        }
        
        document.getElementById("next").addEventListener("click",function(){
            if(provera === 0 && clicked){
               if(confirm("Kraj igre. Da li zelite ponovo da igrate?") == true){
                   startGame()
               }
               else{
                //    window.open("https://google.com", "_self")
                location.href = "http://google.com";
               }
            }else if(provera === 1 && clicked){
                showQuestion(loadQuestion())
            }
        })
    }


    function loadQuestion(){
        min = Math.ceil(1);
        max = Math.floor(4);
        return Math.floor(Math.random() * (max - min) + min);
    }

    

    startGame()