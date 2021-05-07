var hotList = []; //Az éppen gyakoroltatott kérdések listája 
var displayedQuestion; //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions; //Kérdések száma a teljes adatbázisban
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var nextQuestion = 1; //A következő kérdés száma a teljes listában
var timeoutHandler;

document.addEventListener("DOMContentLoaded", () => {

    for (let i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }
    }
   
    fetch("questions/count").then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    document.getElementById("előre_gomb").addEventListener("click", előre)
    document.getElementById("vissza_gomb").addEventListener("click", hátra)
    if (localStorage.getItem("HotList")){
        hotList = JSON.parse(localStorage.getItem("HotList"))
    }
    if (localStorage.getItem("displayedQuestion")){
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"))
    }
    if (localStorage.getItem("nextQuestion")){
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"))
    }
    if (hotList.length === 0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;

        }
    }
    else {
        kérdésMegjelenítés();
    }
    

 
});
function kérdésBetöltés(questionNumber, destination) {
        fetch(`/questions/${questionNumber}`)
            .then(
                result => {
                    if (!result.ok) {
                        console.error(`Hibás letöltés: ${response.status}`)

                    }
                    else
                    {
                        return result.json()
                    }
                }
            )
            .then(
                q => {
                    hotList[destination].question = q;
                    hotList[destination].goodAnswers = 0;
                    console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                    if (displayedQuestion == undefined && destination == 0) { 
                        displayedQuestion = 0;
                        kérdésMegjelenítés();
                    }
                });
}
function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    if (kérdés.image) {
        document.getElementById("kép1").src = kérdés.image;
        document.getElementById("kép1").style.display = "block";
    }
    else {
        document.getElementById("kép1").style.display = "none";
    }
    for (var i = 1; i < 3; i++) {
        document.getElementById("válasz" + i).classList.remove("jó", "rossz")
    }
    document.getElementById("válaszok").style.pointerEvents = "auto";
}
function előre() {
    clearTimeout(timeoutHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) { displayedQuestion = 0 };
    kérdésMegjelenítés()
};


function hátra() {
    clearTimeout(timeoutHandler);
    displayedQuestion--;
    if (displayedQuestion <0) { displayedQuestion = questionsInHotList - 1 };
    kérdésMegjelenítés()
};
function választás(n) {
    let kérdés = hotList[displayedQuestion].question
    if (n === correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó")
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz")
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó")
        hotList[displayedQuestion].goodAnswers=0;
    }
    document.getElementById("válaszok").style.pointerEvents = "none";
    timeoutHandler = setTimeout(előre, 3000)
    localStorage.setItem("HotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}
