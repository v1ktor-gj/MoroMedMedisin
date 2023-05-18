// Definerer konstanter => hentet fra HTML
const quizForm = document.getElementById('quiz-form');
const resultDiv = document.getElementById('result');
const riktig = document.querySelector('.riktig')
const feil = document.querySelector('.feil')

// Lager array med riktige svar
const correctAnswers = ['b', 'd', 'd', 'a', 'c','c'];
// Legger til en lytter til svarknappoen og lager en ny arrow-funksjon
quizForm.addEventListener('submit', e => {
  e.preventDefault();
  
  let score = 0;
  // Lager en array med verdien til alle valgene som bruker har valgt
  const userAnswers = [quizForm.q1.value,quizForm.q2.value,quizForm.q3.value,quizForm.q4.value,quizForm.q5.value,quizForm.q6.value,];
  // Lager en funksjon som sjekker for hvert (for each) valg om svaret er riktig
  userAnswers.forEach((answer, i) => {
    if (answer === correctAnswers[i]) {
      score += 1;

    }
  });

// Legger inn antall poeng i html
  resultDiv.innerHTML = `Antall poeng = ${score}/${correctAnswers.length}`;
});


