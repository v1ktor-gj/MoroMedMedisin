// Definerer variabler og konstanter => henter fra HTML
let rekordEl = document.getElementById("rekord")
let radEl = document.getElementById("rad")
let pointsEl = 0
const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");



// Sjekker localstorage => hvis ikke finnes fra før settes det som 0
if(!localStorage.tall){
    localStorage.tall = 0
}
// Setter inn i HTML, med localstorage
rekordEl.innerHTML = "Rekord: " + localStorage.tall
//definerer flere arrayer, setter alle som tomme
let word, maxGuesses, incorrectLetters = [], correctLetters = [];
// Lager en funksjon som velger ettt tilfeldig ord 
function randomWord() {
    inputs.classList.remove('riktig')
    inputs.classList.remove('feil')
    // Lager en variabel for tilfeldig ord, tar tilfeldig tall ut ifra hvor mange ord i biblioteket (wordList.length)
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    // Setter antall gjett man har ut ifra lengden på ordet, 5, 6 eller 8. Den spør om det er lengre eller mindre enn 5 eller 8, og hvis ikke vil man få 6 antall gjett (default). 
    maxGuesses = word.length >= 5 ? 8 : 6;
    // Definerer arraysene igjen
    correctLetters = []; incorrectLetters = [];
    //Fyller inn i HTML, hint, antall gjett og feil bokstaver.
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
    // Fyller ut bokstavene du har valgt
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
// Kaller på funksjonen
randomWord();
// Lager en ny funksjon for gjetning ( Valg av bokstaver )
function initGame(e) {
    // lager en variabel for tastaturklikk og gjør alle bokstaver til lowercase 
    let key = e.target.value.toLowerCase();
    // If-løkke som sjekker om du klikker på en bokstav som du ikke har klikket på fra før
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        // Hvis det er nytt ord setter inn, hvis ikke legges det til  feil-bokstav-arrayen 
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
            // Hvis bokstaven er feil legges den til i arrayet og antall gjett går ned
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        // Legger inn i HTML
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }

    typingInput.value = "";
    //Lager funksjon for ordet er gjetter eller når antall gjett er brukt opp
    setTimeout(() => {
        // Hvis lengden på riktige bokstaver er lik som selve lengden til ordet får man riktig
        if(correctLetters.length === word.length) {
           inputs.classList.add('riktig')
           // Legger til poeng for hver riktige
            pointsEl += 1
            if (pointsEl>=localStorage.tall){
                localStorage.tall = pointsEl
            }
            rekordEl.innerHTML = "Rekord: " + localStorage.tall
            radEl.innerHTML = "Antall riktige på rad: " + pointsEl

            // Hvis man har mindre enn ett gjett igjen forsvinner streaken og man går videre til neste ord
        } else if(maxGuesses < 1) {
            inputs.classList.add('feil')
            // Setter antall riktige på rad som local.storage og så resetter poengene
            localStorage.tall=pointsEl
            rekordEl.innerHTML = "Rekord: " + localStorage.tall
            pointsEl = 0
            radEl.innerHTML = "Antall riktige på rad: " + pointsEl

            // Hvis man får feil fylles ordet ut av seg selv
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
        // Antall millisekunder å vente før ordet fylles inn etter man har fått feil
    }, 100);
}

// Legger til lyttere på knappen og bokstaver (tastaturet)
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
// Legger til en lytter generelt i nettsiden som gjør det mulig å klikke på tastaturet (keydown)
document.addEventListener("keydown", () => typingInput.focus());