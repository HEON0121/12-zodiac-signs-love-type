const main = document.getElementById("main");
const qna = document.getElementById("qna");
const startBtn = document.getElementById("startBtn");
const result = document.getElementById("result");
const endPoint = 12;
const selections = [0,0,0,0,0,0,0,0,0,0,0,0];

function calcResult() {
    var result = selections.indexOf(Math.max(...selections)); // max of array
    return result;
}

function setResult(){
    let point = calcResult();
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;
  
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);
  
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function addAnswer(answerText, qIdx, idx) {
    let a = document.querySelector(".answerBox");
    let answer = document.createElement("Button");
    answer.classList.add("answerList");
    answer.classList.add("my-3");
    answer.classList.add("py-3");
    answer.classList.add("fadeIn")
    a.appendChild(answer);
    answer.innerHTML = answerText;
    answer.addEventListener(
        "click", 
        function(){
            let children = document.querySelectorAll(".answerList");
            for (let i = 0; i < children.length; i++){
                children[i].disabled = true;
                children[i].style.WebkitAnimation = "fadeOut 1s";
                children[i].style.animation = "fadeOut 1s";
            }
            var target = qnaList[qIdx].a[idx].type;
            for(var i = 0; i < target.length; i++){
                selections[target[i]]+=1;
            }
            setTimeout(() => {
                for (let i = 0; i < children.length; i++){
                    children[i].style.display = "none";
                }
                goNext(++qIdx);
            }, 950)
           
        }, false);
}

function goResult() {
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(()=>{            
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        isClickable = false;
        setTimeout(()=>{
            qna.style.display = "none";    
            result.style.display = "block";        
        },450)             
    },450);  
    
    setResult();
    
}

function goNext(qIdx) {
    
    if(qIdx === endPoint) {
        goResult();
        return;
    }
    let q = document.querySelector(".questionBox");    
    q.innerHTML = qnaList[qIdx].q
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);    
    }

    let status = document.querySelector(".statusBar");
    status.style.width = (100/endPoint)*(qIdx+1) + "%";
    
}

let isClickable = true;

function start() {   
    
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(()=>{            
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        isClickable = false;
        setTimeout(()=>{
            main.style.display = "none";    
            qna.style.display = "block";        
        },450)
        let qIdx = 0;
        goNext(qIdx);        
    },450);     
}

function begin() {
    console.log("isClickable : ",isClickable);
    if(!isClickable) {
        return false;
    }
    isClickable = false;

    start();

    setTimeout(()=>{
        isClickable = true;
    }, 1000)
}