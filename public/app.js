  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import {getDatabase,push,set,ref,onChildAdded} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDXrwy2Ovh0Qq7aRxfLW9TXxDoT8CqFbNg",
    authDomain: "quiz-app-shaheer.firebaseapp.com",
    databaseURL: "https://quiz-app-shaheer-default-rtdb.firebaseio.com",
    projectId: "quiz-app-shaheer",
    storageBucket: "quiz-app-shaheer.appspot.com",
    messagingSenderId: "81746723214",
    appId: "1:81746723214:web:56724b4ed239bb54c324df",
    measurementId: "G-H5ZFDP26VH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase();

const questions = [
    // {
    //     question :"What is the capital city of France?",
    //     options: ["A. London","B. Rome","C. Berlin","D. Paris"],
    //     correctAnswer: "D. Paris",
    // },
    // {
    //     question:"Who painted the Mona Lisa?",
    //     options: ["A. Pablo Picasso","B. Leonardo da Vinci","C. Vincent van Gogh","D. Michelangelo"],
    //     correctAnswer: "B. Leonardo da Vinci",
    // },
    // {
    //     question:"What is the chemical symbol for water?",
    //     options: ["A. Wo","B. H2","C. O2","D. H2O"],
    //     correctAnswer: "D. H2O",
    // },
    // {
    //     question:"Who wrote the play 'Romeo and Juliet'?",
    //     options: ["A. William Shakespeare","B. Jane Austen","C. Charles Dickens","D. J.K. Rowling"],
    //     correctAnswer: "A. William Shakespeare",
    // },
    // {
    //     question:"What is the tallest mountain in the world?",
    //     options: ["A. Mount Kilimanjaro","B. Mount Fuji","C. Mount Everest","D. Mount McKinley"],
    //     correctAnswer: "C. Mount Everest",
    // },
    // {
    //     question:"Which planet is known as the 'Red Planet'?",
    //     options: ["A. Jupiter","B. Mars","C. Venus","D. Earth"],
    //     correctAnswer: "B. Mars",
    // },
    // {
    //     question:"What is the largest ocean on Earth?",
    //     options: ["A. Atlantic Ocean","B. Arctic Ocean","C. Indian Ocean","D. Pacific Ocean"],
    //     correctAnswer: "D. Pacific Ocean",
    // },
    // {
    //     question:"Who is credited with inventing the telephone?",
    //     options: ["A. Thomas Edison","B. Alexander Graham Bell","C. Nikola Tesla","D. Benjamin Franklin"],
    //     correctAnswer: "B. Alexander Graham Bell",
    // },
    // {
    //     question:"Which famous scientist developed the theory of relativity?",
    //     options: ["A. Albert Einstein","B. Stephen Hawking","C. Galileo Galilei","D. Isaac Newton"],
    //     correctAnswer: "A. Albert Einstein",
    // },
    // {
    //     question:"What is the currency of Japan",
    //     options: ["A. Pound","B. Euro","C. Dollar","D. Yen"],
    //     correctAnswer: "D. Yen",
    // },

];
function getDataFromDatabase(){
    let reference = ref(database,`question/`);
    onChildAdded(reference,function(data){
    questions.push(data.val());
    console.log(questions);
    showQuestion();
})
}
getDataFromDatabase();



let QuestCount = document.getElementById("QuestCount");
let quest = document.getElementById("quest");
let opt = document.getElementById("opt"); 
let currentQueCnt = document.getElementById("currentQueCnt"); 
let totalQueCnt = document.getElementById("totalQueCnt"); 
let questOpt = document.getElementById("questOpt");
let next = document.getElementById("next");
let startagin = document.getElementById("startagin");
let resultContain = document.getElementById("resultContain");
let percentScore = document.getElementById("percentScore");
let userName = prompt("Enter Your Name");

if(userName == null || userName == ""){
    userName = "user";
}

let index = 0;
let score = 0;

function showQuestion(){
    if(index < questions.length){
        let correctAns = questions[index].correctAnswer;
        currentQueCnt.innerHTML = index + 1
        totalQueCnt.innerHTML = questions.length;
        quest.innerHTML = questions[index].question;
        startagin.style.display = "none"
        questOpt.style.display ="flex"
        resultContain.style.display = "none";
        resultContain.innerHTML = "";
        opt.innerHTML = "";


        for(let i = 0; i < questions[index].options.length; i++){
            let userAnwser = questions[index].options[i];
            opt.innerHTML += `
            <div><button onclick="checkAnswer('${correctAns}','${userAnwser}')" >${questions[index].options[i]}</button></div>
            `
        }

    }else{
        next.style.display = "none";
        startagin.style.display = "inline-block"
        questOpt.style.display ="none"
        result();
    }

}
showQuestion();

 window.checkAnswer = function(userVal,correctVal){
    if(userVal == correctVal){
        opt.innerHTML = "";
        index++;
        score++;
        showQuestion();
    }else{
        opt.innerHTML = "";
        index++;
        score;
        showQuestion();
    }
}

function result(){
    if(score === 0){
        resultContain.style.display = "block";
        resultContain.innerHTML += `
        <h1>${userName}</h1>
        <p>Not a single anwser of yours is correct</p>
        `
    }else if(score === 10){
        let percen = score * 100 / questions.length;
        let totalAns = questions.length
        let rightAns = score 
        resultContain.style.display = "block";
        resultContain.innerHTML += `
        <h1>Excellent ${userName}</h1>
        <p>You have got ${percen}%, </br> and ${rightAns} out of ${totalAns} answers right </p>
        `
    }else if(score >= 5){
        let percen = score * 100 / questions.length;
        let totalAns = questions.length
        let rightAns = score 
        resultContain.style.display = "block";
        resultContain.innerHTML += `
        <h1>Good ${userName}</h1>
        <p>You have got ${percen}%, </br> and ${rightAns} out of ${totalAns} answers right </p>
        `
    }
    else{
        let percen = score * 100 / questions.length;
        let totalAns = questions.length
        let rightAns = score 
        resultContain.style.display = "block";
        resultContain.innerHTML += `
        <h1>${userName}</h1>
        <p>You have got ${percen}%, </br> and ${rightAns} out of ${totalAns} answers right </p>
        `
    }

    
}

window.nextbtn = function(){
    opt.innerHTML = "";
    index++;
    score;
    showQuestion()
}

window.strtAgnbtn = function(){
    opt.innerHTML = "";
    index = 0;
    score = 0;
    next.style.display = "inline-block";
    startagin.style.display = "none"
    showQuestion();    
}