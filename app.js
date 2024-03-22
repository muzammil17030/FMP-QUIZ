// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase,ref,set,onChildAdded } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
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

var currentQuestion = 0;
var points = 0
var p = document.getElementById("marks")
var per = document.getElementById("circle")
var questions = [];
var z = document.getElementById("main")

window.getData=function(){
	z.style.display="none"
	var reference = ref(db,'questions')
	onChildAdded(reference,function(data){
		console.log(data.val())
		questions.push(data.val())
		z.style.display="block"
		showQuestion()
	})
}
getData();

window.showQuestion = function (){
	// console.log(questions,'questions')
	document.getElementById("question").innerHTML = questions[currentQuestion].question;

	var choices = "";
	for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
		var opt = questions[currentQuestion].choices[i];
		// choices += '<input type="radio" name="answer" value=" '+questions[currentQuestion].choices[i]+ '"> ' + questions[currentQuestion].choices[i] + '<br>';
		choices += `<input type="radio" name="answer" value=${opt}> ${opt} <br>`;
	}
	document.getElementById("choices").innerHTML = choices;
}



window.checkAnswer=function () {
    var userAnswer = document.querySelector('input[name="answer"]:checked').value;
	console.log('checking question', userAnswer)
    if (userAnswer == questions[currentQuestion].answer) {
         ++points
        p.innerHTML = "You Got " + points + " out Of " + questions.length
    } else {
        p.innerHTML = "You Got " + points + " out Of " + questions.length
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        per.innerHTML = Math.round(points / questions.length * 100) + "%"
        p.style.opacity = '1'
        per.style.opacity = '1'
    }
    if(Math.round(points / questions.length * 100) <= 45){
        per.style.color = 'red'
    }
    else{
        per.style.color = 'green'
    }
}

 



window.restart = function () {
	location.reload()
	points = 0
}

