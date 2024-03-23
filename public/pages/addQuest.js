  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import {getDatabase,push,set,ref} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
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

  const options = [];
  let correctAnswer;




  let question = document.getElementById("question");
  let option = document.getElementById("option");
  let correctAnswerelem = document.getElementById("correctAnswer");
  let optionsParent = document.getElementById("optionsParent");

  function renderOption(){
      optionsParent.innerHTML = "";
    for (let i = 0 ; i<options.length; i++){
        optionsParent.innerHTML += `<li onclick="setCorrectAnswer('${options[i]}')" class="p-2 m-1 fs-5 border-0 rounded bg-white w-100">${options[i]}</li>`
    }
  }

  window.addOption = function() {
    options.push(option.value);
    console.log(options);
    renderOption();
     
  }
  window.setCorrectAnswer = function(a){
    correctAnswer = a;
    correctAnswerelem.innerHTML = correctAnswer;
  }

  window.sumbitQuiz = function(){
    let obj = {
        question:question.value,
        options:options,
        correctAnswer:correctAnswer
    }
    // console.log(obj);
    obj.id = push(ref(database,"question/")).key;
    let reference = ref(database,`question/ ${obj.id}`);
    set(reference,obj);

    question.value = "";
    optionsParent.innerHTML = '';
    correctAnswerelem.innerHTML = "correct Answer";
    options = "";
  }



  


  