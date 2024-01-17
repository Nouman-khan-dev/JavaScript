const allQuestion = [
    {
        question: 'What is HTML ',

        option_1: 'A programing language',
        option_2: 'Scripting Language',
        option_3: 'Hyper text Markup Language',
        option_4: 'spoken Language',

        correct: 2,
    },
    {
        question: 'What is ul in HTMl',

        option_1: 'Underline list',
        option_2: 'Order list',
        option_3: 'Unorder list',
        option_4: 'High order list',

        correct: 2,
    },
    {
        question: 'CSS stand for ',

        option_1: 'markup style sheet',
        option_2: 'Style Sheet',
        option_3: 'Markup Language',
        option_4: 'Cascading Style sheets',

        correct: 3,
    },
    {
        question: 'javaScript is ',

        option_1: 'A Style Sheet',
        option_2: 'A Scripting Language',
        option_3: 'A markup style sheet',
        option_4: 'None of these',

        correct: 1,
    },
];

const quizContainer = document.querySelector('.quiz_container');
const optionElements = document.querySelectorAll('.option');
const checkBox = document.querySelectorAll('.checkbox');
const questionElem = document.querySelector('.question');
const submitBtn = document.getElementById('submit');

let index = 0;
let score = 0;
function loadQuiz() {
    questionElem.innerText = allQuestion[index].question;
    optionElements[0].lastElementChild.innerText =
        allQuestion[index].option_1;
    optionElements[1].lastElementChild.innerText =
        allQuestion[index].option_2;
    optionElements[2].lastElementChild.innerText =
        allQuestion[index].option_3;
    optionElements[3].lastElementChild.innerText =
        allQuestion[index].option_4;
}

loadQuiz();

const getSelectedBox = () => {
    let selected;
    let checkBoxArr = Array.from(checkBox);
    selected = checkBoxArr.findIndex((elem) => elem.checked);
    return selected;
};

checkBox.forEach((box) => {
    box.addEventListener('change', () => {
        disableBoxes();
        checkCorrect();
    });
});

function disableBoxes() {
    checkBox.forEach((e) => (e.disabled = true));
}
function desesectedAndEnableBoxes() {
    checkBox.forEach((e) => {
        e.disabled = false;
        e.checked = false;
    });
}

const checkCorrect = () => {
    let selectedIndex = getSelectedBox();
    if (selectedIndex) {
        selectedIndex == allQuestion[index].correct && score++;
    }
};

const winpage = () => {
    submitBtn.innerHTML = 'Restart';
    quizContainer.innerHTML = `
    <p>Congrotulaltion</p> <h1 class='result'> score = ${score}</h1>
    `;
    submitBtn.addEventListener('click', () =>
        window.location.reload()
    );
};

submitBtn.addEventListener('click', () => {
    let selectedIndex = getSelectedBox();
    if (index < allQuestion.length - 1) {
        if (selectedIndex >= 0) {
            index += 1;
        }
        desesectedAndEnableBoxes();
        loadQuiz();
    } else {
        winpage();
    }
});
