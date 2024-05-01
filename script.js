let currentQuestionIndex = 0;
let results = []; 
let totalQuestions = 0; 

document.addEventListener('DOMContentLoaded', function() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            totalQuestions = data.questions.length;
            displayQuestion(data.questions[currentQuestionIndex], data.questions.length);
        });
});

function displayQuestion(question, total) {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';

    const progressDiv = document.createElement('div');
    progressDiv.className = 'progress';
    progressDiv.innerHTML = `Question ${currentQuestionIndex + 1} of ${total}`;
    container.appendChild(progressDiv);

    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `<h3>${question.question}</h3>`;

    question.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `<img src="${option.icon}" alt="${option.text} Icon"><p>${option.text}</p>`;
        optionDiv.onclick = function() { selectOption(question.id, option.value); };
        questionDiv.appendChild(optionDiv);
    });

    container.appendChild(questionDiv);
}

function selectOption(questionId, value) {
    results[questionId] = value;
    currentQuestionIndex++;
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            if (currentQuestionIndex < data.questions.length) {
                displayQuestion(data.questions[currentQuestionIndex], data.questions.length);
            } else {
                const container = document.getElementById('quiz-container');
                container.innerHTML = '';
                const completionText = document.createElement('p');
                completionText.innerText = 'All questions completed! Click submit to see your results.';
                container.appendChild(completionText);


                const submitBtn = document.getElementById('submitBtn');
                submitBtn.style.display = 'block';
                container.appendChild(submitBtn); 
            }
        });
}

function submitQuiz() {
    console.log('Quiz submitted');
    console.log(results);
}
