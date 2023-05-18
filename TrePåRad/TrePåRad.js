// TRE PÅ RAD

// Definerer variabler => hentet fra html
const firkanter = Array.from(document.querySelectorAll('.firkant'));
const playerDisplay = document.querySelector('.display-spiller');
const resetBtn = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');
// Definerer variabler som skal brukes og endres senere
let brett = ['', '', '', '', '', '', '', '', ''];
let currentSpiller = 'BAK';
let isGameActive = true;
// Setter opp konstanter for hver av sluttmulighetene
const SPILLER1_VANT = 'SPILLER1_VANT';
const SPILLER2_VANT = 'SPILLER2_VANT';
const UAVGJORT = 'UAVGJORT';

// Lager en array som har alle vinn-mulighetene (vertikalt, horisontalt eller på tvers)
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
 ];
// Lager en funksjon for å sjekke om firkanten har noe i seg fra før. 
 const isValidAction = (firkant) => {
    if (firkant.innerText === 'BAK' || firkant.innerText === 'VIR'){
        return false;
    }

    return true;
};

const updateBoard =  (i) => {
    brett[i] = currentSpiller;
 }
// Lager en funksjon for å bytte spiller
 const changeSpiller = () => {
    playerDisplay.classList.remove(`spiller${currentSpiller}`);
    currentSpiller = currentSpiller === 'BAK' ? 'VIR' : 'BAK';
    playerDisplay.innerText = currentSpiller;
    playerDisplay.classList.add(`spiller${currentSpiller}`);
}
// Lager funksjon for å fortelle hvem som vant, spiller 1, spiller 2 eller uavgjort
const announce = (type) => {
  // Switch sjekker om hver case statement er sann, og koden gjør den som er sann
    switch(type){
       case SPILLER2_VANT:
            announcer.innerHTML = ' <span class="spiller2">Virus</span> vant!';
            break;
       case SPILLER1_VANT:
            announcer.innerHTML = ' <span class="spiller1">Bakterie</span> vant!';
            break;
       case UAVGJORT:
            announcer.innerText = 'Uavgjort';
        }
    announcer.classList.remove('hide');
};
// Lager en funksjon for å sjekke om man har vunnet
function handleResultValidation() {
  // Starter med å si at runden ikke er vunnet, som vil endres hvis kravene senere i koden blir oppfylt
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = brett[winCondition[0]];
      const b = brett[winCondition[1]];
      const c = brett[winCondition[2]];
      // Hvis noen av rutene på linjen er ikke fylte kjører koden bare videre
      if (a === "" || b === "" || c === "") {
        continue;
      }
      // Hvis rute a og b er like, er også a og c like og da har man tre på rad
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
    // Når runden er vunnet sjekker om den nåverende spilleren er bakterie (spiller 1), og hvis ikke har virus vunnet 
    if (roundWon) {
      announce(currentSpiller === "BAK" ? SPILLER1_VANT : SPILLER2_VANT);
      isGameActive = false;
      return;
    }
  // Hvis brettet IKKE inneholder tomme firkanter, og ingen har allerede vunnet blir det uavgjort
    if (!brett.includes("")) announce(UAVGJORT);
  }
// Lager en funksjon som vil kjøre den andre funksjonene når man klikker på en firkant
  const userAction = (firkant, i) => {
    if (isValidAction(firkant) && isGameActive) {
      firkant.innerText = currentSpiller;
      firkant.classList.add(`spiller${currentSpiller}`);
      updateBoard(i);
      handleResultValidation();
      changeSpiller();
    }
  };
// Legger til en lytter for hver firkant, som bruker funksjonen over
  firkanter.forEach( (firkant, i) => {
    firkant.addEventListener('click', () => userAction(firkant, i));
});
//Definerer funksjonen for å resette spillet
const resetBrett = () => {
    brett = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');
    // Endres spiller til spiller 1 (BAK) hvis det ikke er deres tur
    if (currentSpiller === '2') {
        changeSpiller();
    }
    // Fjerner alt fra boksene ( både class og selve teksten )
    firkanter.forEach(firkant => {
        firkant.innerText = '';
        firkant.classList.remove('spiller1');
        firkant.classList.remove('spiller2');
    });
}
// Legger til en lytter til reset-knappen
resetBtn.addEventListener('click', resetBrett);