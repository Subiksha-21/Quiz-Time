const popup=document.querySelector('.popup');
const exitBtn = document.querySelector('.exit-btn');
const topicBtns=document.querySelectorAll('.topic-btn');
const main=document.querySelector('.main');
const continueBtn=document.querySelector('.con-btn');
const quizSection=document.querySelector('.quiz-section');
const quiz=document.querySelector('.quiz-section');
const quizBox=document.querySelector('.quiz-box');
const resultBox=document.querySelector('.result-box');
const tryAgainBtn=document.querySelector('.tryAgain-btn');
const goHomeBtn=document.querySelector('.go-btn');




topicBtns.forEach( btn => {
    btn.onclick = () => {
    if (btn.classList.contains("num-btn")) {
      questions = numberQuestions;
    } else if (btn.classList.contains("percentage-btn")) {
      questions = percentageQuestions;
    } else if (btn.classList.contains("age-btn")) {
      questions = ageQuestions;
    }

    popup.classList.add('active');
    main.classList.add('active');
  };
});
exitBtn.onclick=()=>{
    popup.classList.remove('active');
    main.classList.remove('active');
}
continueBtn.onclick=()=>{
    quizSection.classList.add('active');
    popup.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
    headerScore();
}
tryAgainBtn.onclick=()=>{
   quizBox.classList.add('active');
   resultBox.classList.remove('active');
   nextBtn.classList.remove('active');

   questionCount=0;
   questionNumb=1;
   userScore=0;
   showQuestions(questionCount);
   questionCounter(questionNumb);

   headerScore();
}

goHomeBtn.onclick=()=>{
   quizSection.classList.remove('active');
   nextBtn.classList.remove('active');
   resultBox.classList.remove('active');

   questionCount=0;
   questionNumb=1;
   userScore=0;
   showQuestions(questionCount);
   questionCounter(questionNumb);

   headerScore();
}

let questionCount=0;
let questionNumb=1;
let userScore=0;

const nextBtn=document.querySelector('.next-btn');

nextBtn.onclick=()=>{
    if(questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);
        
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');//disable nxt btn if optn not choosen


    }
    else{
        showResultBox();
    }
    
}

const optionList=document.querySelector('.option-list');

//getting ques and option for array.
function showQuestions(index) {
    const questionText=document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag=`<div class="option"> <span>${questions[index].options[0]}</span></div>
    <div class="option"> <span>${questions[index].options[1]}</span></div>
    <div class="option"> <span>${questions[index].options[2]}</span></div>
    <div class="option"> <span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML=optionTag;
    const option = document.querySelectorAll('.option');
    option.forEach(opt => {
        opt.addEventListener("click",function() {
            optionSelected(this);
        });
        });
    }

function optionSelected(answer){
    let userAnswer=answer.textContent.trim();
    let correctAnswer=questions[questionCount].answer.trim();
    let allOptions=optionList.children.length;
    
    if(userAnswer===correctAnswer){
        answer.classList.add('correct');
        userScore+=1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');
        //if ans incorrect autoselect correct one
        for(let i=0;i<allOptions;i++){
            if(optionList.children[i].textContent.trim()===correctAnswer){
                optionList.children[i].classList.add('correct');
            }
        }
    }
    //if user has selected,disabled all options
    for(let i=0;i<allOptions;i++){
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}
function questionCounter(index){
    const questionTotal=document.querySelector('.question-total');
    questionTotal.textContent=`${index} of ${questions.length}Questions`;
}
function headerScore(){
    const headerScoreText=document.querySelector('.score');
    headerScoreText.textContent=`score: ${userScore} / ${questions.length}`;
}
function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText=document.querySelector('.score-text');
    scoreText.textContent=`Your score ${userScore} out of ${questions.length}`;
    const circleProgress =document.querySelector('.circle-progress');
    const progressValue=document.querySelector('.progress-value');
    let progressStartValue=-1;
    let progressEndValue=(userScore/questions.length)*100;
    let speed=20;
    let progress= setInterval(()=>{
        progressStartValue++;
       // console.log(progressStartValue);
       progressValue.textContent=`${progressStartValue}%`;
       circleProgress.style.background=`conic-gradient(#c40094 ${progressStartValue *3.6}deg, rgba(255,255,255,.1) 0deg)`
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    }, speed);
}

const aboutModal = document.querySelector('.about-modal');
const closeBtn = document.querySelector('.close-btn');
const aboutLink = document.querySelector('.about-link');

//show aboutmodal when aboutus is clicked
aboutLink.onclick = () => {
  aboutModal.style.display = 'flex';
}
//close modal when close btn is clicked
closeBtn.onclick = () => {
  aboutModal.style.display = 'none';
}

window.onclick = (e) => {
  if(e.target == aboutModal){
    aboutModal.style.display = 'none';
  }
}
