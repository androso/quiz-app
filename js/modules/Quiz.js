import Quiz from "../utils/Quiz-constructor.js";
import QuizConstructor from "../utils/Quiz-constructor.js";
import GameScreen from "../views/Game-screen.js";
import { renderCustomizeMenu } from "./customize.js";

const $appContainer = document.querySelector(".app");

export const renderQuiz = (numberOfQuestions, categoryId, difficulty) => {
	getQuestionsData(numberOfQuestions, categoryId, difficulty);
};

const loadHTML = () => {
	const gameView = new GameScreen();
	$appContainer.innerHTML = gameView.getHTML();
};

const addListeners = () => {
	const $nextButton = document.querySelector(".button.next");
	const $restartButton = document.querySelector(".button.restart");
	// $nextButton.addEventListener("click", checkAnswer);
	$restartButton.addEventListener("click", renderCustomizeMenu); 
}

const getQuestionsData = async (numberOfQuestions, categoryId, difficulty) => {
	const $spinnerContainer = document.querySelector(".spinner-container");
	const reqLink = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
	$spinnerContainer.classList.toggle("spinner-container--active");
	const questionsData = await (await fetch(reqLink)).json();
	$spinnerContainer.classList.toggle("spinner-container--active");
	const questions = questionsData.results.map((questionObject) => {
		const question = questionObject.question;
		const wrongChoices = questionObject.incorrect_answers;
		const correctChoice = questionObject.correct_answer;
		return {
			question,
			choices: [...wrongChoices, correctChoice],
			correctAnswer: correctChoice,
		};
	});
	const quiz = new QuizConstructor(questions);
	renderNewQuestion(quiz);
};

const renderNewQuestion = (quiz) => {
	loadHTML();
	addListeners();
	const $quizQuestion = document.querySelector(".quiz__question");
	const $tracker = document.querySelector(".quiz__current-question");
	const $tagline = document.querySelector(".quiz__tagline");
	let $choices = Array.from(document.querySelectorAll(".quiz__label"));
	const $innerProgress = document.querySelector(".quiz__progress-bar__inner");
	const $checkedInput = document.querySelector(".quiz__input:checked");
	const currentQuestion = quiz.getCurrentQuestion();
	const currentQuestionIndex = quiz.getCurrentIndex();


	
	if ($checkedInput) $checkedInput.checked = false;
	$quizQuestion.innerHTML = currentQuestion.question;
	$tracker.innerText = `${currentQuestionIndex} of ${quiz.questions.length}`;
	$choices.map(($choice, index) => {
		$choice.innerHTML = `<i></i>${currentQuestion.choices[index]}`;
	});

}


