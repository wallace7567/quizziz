const quiz = [
{
    question: "Qual é a capital do Brasil?",
    answers: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
    correct: 1
},
{
    question: "Quanto é 8 x 7?",
    answers: ["54", "56", "64", "48"],
    correct: 1
},
{
    question: "Qual planeta é conhecido como Planeta Vermelho?",
    answers: ["Terra", "Marte", "Júpiter", "Vênus"],
    correct: 1
},
{
    question: "HTML significa:",
    answers: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyper Transfer Machine Language",
        "High Text Main Language"
    ],
    correct: 0
},
{
    question: "Quem descobriu o Brasil?",
    answers: [
        "Pedro Álvares Cabral",
        "Dom Pedro I",
        "Cristóvão Colombo",
        "Tiradentes"
    ],
    correct: 0
}
];

let current = 0;
let score = 0;
let errors = 0;
let player = "";

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const playerName = document.getElementById("playerName");
const welcome = document.getElementById("welcome");

const question = document.getElementById("question");
const answers = document.getElementById("answers");

const scoreText = document.getElementById("score");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress-bar");

const nextBtn = document.getElementById("nextBtn");

document.getElementById("startBtn").onclick = () => {

    if(playerName.value.trim()==""){
        alert("Digite seu nome.");
        return;
    }

    player = playerName.value;

    welcome.innerHTML = "Boa sorte, <b>"+player+"</b>!";

    startScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    loadQuestion();

};

function loadQuestion(){

    nextBtn.classList.add("hidden");

    const q = quiz[current];

    counter.innerHTML =
    `Pergunta ${current+1}/${quiz.length}`;

    progress.style.width =
    ((current)/quiz.length)*100+"%";

    question.innerHTML=q.question;

    answers.innerHTML="";

    q.answers.forEach((answer,index)=>{

        const btn=document.createElement("div");

        btn.className="answer";

        btn.innerHTML=answer;

        btn.onclick=()=>select(btn,index);

        answers.appendChild(btn);

    });

}

function select(btn,index){

    const q=quiz[current];

    document.querySelectorAll(".answer")
    .forEach(a=>a.onclick=null);

    if(index===q.correct){

        btn.classList.add("correct");

        score++;

        scoreText.innerHTML=score;

        confetti();

    }else{

        btn.classList.add("wrong");

        errors++;

        document.querySelectorAll(".answer")[q.correct]
        .classList.add("correct");

    }

    nextBtn.classList.remove("hidden");

}

nextBtn.onclick=()=>{

    current++;

    if(current<quiz.length){

        loadQuestion();

    }else{

        finishQuiz();

    }

};

function finishQuiz(){

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    document.getElementById("playerFinal")
    .innerHTML=player;

    document.getElementById("hits")
    .innerHTML=score;

    document.getElementById("errors")
    .innerHTML=errors;

    let percent=Math.round(
        (score/quiz.length)*100
    );

    document.getElementById("percent")
    .innerHTML=percent+"%";

    let msg="";

    if(percent==100){

        msg="👑 Perfeito! Você acertou tudo!";

    }else if(percent>=80){

        msg="🏆 Excelente desempenho!";

    }else if(percent>=60){

        msg="👏 Muito bom!";

    }else{

        msg="💪 Continue treinando!";

    }

    document.getElementById("message")
    .innerHTML=msg;

}

function confetti(){

    for(let i=0;i<25;i++){

        const c=document.createElement("div");

        c.className="confetti";

        c.style.left=Math.random()*100+"vw";

        c.style.background=
        ["#7C3AED","#3B82F6","#22C55E","#FACC15"][Math.floor(Math.random()*4)];

        c.style.animationDuration=
        (Math.random()*2+1)+"s";

        document.body.appendChild(c);

        setTimeout(()=>{

            c.remove();

        },2500);

    }

}