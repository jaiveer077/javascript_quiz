let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris","London","New Delhi","Mardid"],
        answer: "Paris"
    },
    {
        question: "Who is the president of the United States of America?",
        options: ["Donald Trump","Narendra Modi","Barack Obama","Manmohan Singh"],
        answer:"Donald Trump"
    },
    {
        question: "What does the HTML stands for?",
        options: ["Hyper Training Programming Language","Harmonic Text Python Language","Hyper Text Markup Language","Hyperlink and Text Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What does the www stands for?",
        options: ["World Wide Web","World Wired Web","Wired World Web","Web World Web"],
        answer: "World Wide Web"
    },
    {
        question: "Originally, Amazon sold what kinds of product?",
        options: ["Toys","Cars","Books","Food"],
        answer: "Books"
    }, 
    {
        question: "Chrome, Safari, Firefox and Explorer are different types of what?",
        options: ["Code Editor","Notepad","Music App","Browser"],
        answer: "Browser"
    },
    {
        question: "When did Facebook first launch?",
        options: ["2000","2001","2007","2004"],
        answer: "2004"
    },
    {
        question: "What is the human body's heaviest organ?",
        options: ["Skin","Bone","Eyes","Nose"],
        answer:"Skin"
    },
    {
        question: "When is National Ice Cream month?",
        options: ["January","May","June","July"],
        answer:"July"
    }   
];

let currentQuestionIndex=0;
function loadQuestion(){
    const questionElement = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");

    // get the current question
    let currentQuestion = questions[currentQuestionIndex];

    // update the question text
    questionElement.innerText = currentQuestion.question;

    // clear previous questions
    optionsContainer.innerHTML="";

    // Add new options
    currentQuestion.options.forEach(option => {
        const optionBtn = document.createElement("button");
        optionBtn.innerText = option;
        optionBtn.classList.add("option-btn");
        optionBtn.onclick=()=>selectOption(option);
        optionsContainer.appendChild(optionBtn);
    });
}

function selectOption(selectedOption){
    // Get the feedback element
    const feedbackElement = document.getElementById("feedback-message");
    const scoreElement = document.getElementById("score-value");

    // Check if the answer is correct 
    let selectedAnswer = questions[currentQuestionIndex].answer;
    if(selectedOption===selectedAnswer){
        feedbackElement.textContent = "Correct Answer!";
        feedbackElement.className = "feedback-message feedback-correct";
        score+=10; // Add 10 points for each correct answer
        correctAnswers++;
    } else {
        feedbackElement.textContent = "Wrong Answer! The correct answer is " + selectedAnswer;
        feedbackElement.className = "feedback-message feedback-wrong";
        score-=5;  // Subtract 5 points for each wrong answer 
        wrongAnswers++;
    }
    scoreElement.textContent = score;
    // Showing the feedback 
    feedbackElement.style.display = "block";
    // Moving to the next question after delay 
    setTimeout(() => {
        feedbackElement.style.display = "none"; // Hide feedback
        if(currentQuestionIndex<questions.length-1){
            currentQuestionIndex++;
            loadQuestion();
        } else {
            showResults();
        }
    }, 1000); // 1 second delay
}
// /next button 
document.getElementById("next-btn").addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length-1){
        currentQuestionIndex++;
        loadQuestion();
    }
});
//previous button 
document.getElementById("prev-btn").addEventListener("click",()=>{
    if(currentQuestionIndex>0){
        currentQuestionIndex--;
        loadQuestion();
    }
});
document.getElementById("submit-btn").addEventListener("click", () => {
    const feedbackElement = document.getElementById("feedback-message");
    feedbackElement.textContent = "Quiz Submitted!";
    feedbackElement.className = "feedback-message feeback-correct";
    feedbackElement.style.display ="block";
    setTimeout(() => {
        feedbackElement.style.display = "none";
    }, 2000);
})
// Function to display results 
function showResults(){
    // Hiding the previous quiz container
    document.querySelector(".quiz-container").style.display = "none";
    document.querySelector(".container3").style.display = "none";

    // Updating the results 
    document.getElementById("final-score").textContent = score;
    document.getElementById("correct-answers").textContent = "Correct answers: " + correctAnswers;
    document.getElementById("wrong-answers").textContent = "Wrong Answers: " + wrongAnswers;

    // Showing the final results container
    document.getElementById("results-container").style.display =  "block";
}
// event listener to restart the quiz
document.getElementById("restart-btn").addEventListener("click", () => {
    // Reset all the variables 
    score=0;
    correctAnswers=0;
    wrongAnswers=0;
    currentQuestionIndex=0;

    // UPdate score display
    document.getElementById("score-value").textContent = "0";

    // Hide results and display the quiz 
    document.getElementById("results-container").style.display = "none";
    document.querySelector(".quiz-container").style.display = "flex";
    document.querySelector(".container3").style.display = "flex";

    // load the first question
    loadQuestion(); 
})
document.getElementById("submit-btn").addEventListener("click", () => {
    showResults();
});
// Intialize the score display
document.getElementById("score-value").textContent = score;
// Loading the first question initially 
loadQuestion();