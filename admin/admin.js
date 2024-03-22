
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getDatabase,ref,set,push } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDlny2l1-KYJVxz8KEQSk9zPbFTMcA8CbM",
    authDomain: "fmp-project-quiz-app.firebaseapp.com",
    databaseURL: "https://fmp-project-quiz-app-default-rtdb.firebaseio.com",
    projectId: "fmp-project-quiz-app",
    storageBucket: "fmp-project-quiz-app.appspot.com",
    messagingSenderId: "680148500366",
    appId: "1:680148500366:web:050f29bef754f84c246edf",
    measurementId: "G-4G8VH6BRPJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
 const db = getDatabase();

var ques = prompt("Enter question")
var opt1=prompt("Enter option 1")
var opt2=prompt("Enter option 2")
var opt3=prompt("Enter option 3")
var opt4=prompt("Enter option 4")
var correctAns=prompt("Enter correct Answer")
var opts=[]
opts.push(opt1)
opts.push(opt2)
opts.push(opt3)
opts.push(opt4)
console.log(ques)
console.log(opts)
console.log(correctAns)

window.submitQuestion = function () {
       var obj = {
         question: ques,
         choices: opts,
         answer: correctAns
       }
       obj.id = push(ref(db, 'questions/')).key
       var reference = ref(db, `questions/${obj.id}`)
       set(reference, obj)
       console.log(obj)
 }
 window.restart = function () {
	location.reload()
}

