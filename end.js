const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const username = localStorage.getItem('username');

//takes json string and transforms it into a JavaScript object
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username,
    };
    highScores.push(score);
    //order from the higher to lower
    highScores.sort((a, b) => b.score - a.score);
    //show only the first 5 high scores by removing the others from index 5
    highScores.splice(5);
    //takes a JavaScript object and transforms it into a JSON string.
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');
};