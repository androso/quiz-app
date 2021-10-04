import QuestionsConstructor from "../utils/Questions-constructor.js";
import QuizConstructor from "../utils/Quiz-constructor.js";
import GameScreen from "../views/Game-screen.js";

const $appContainer = document.querySelector(".app");
let $quizQuestion;
let $tracker;
let $tagline;
let $choices;
let $innerProgress;
let $nextButton;
let $restartButton;

export const renderQuiz = (numberOfQuestions, categoryId, difficulty) => {
	console.log(numberOfQuestions, categoryId, difficulty);
	// //Load the html
	//Create questions with the data from the api
	//Create quiz with those questions
	//Replace html elements with those questions
	getQuestionsData(numberOfQuestions, categoryId, difficulty);
	loadHTML();
	cacheTheDom();
};
const getQuestionsData = async (numberOfQuestions, categoryId, difficulty) => {
	const reqLink = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
	const questionsData = await (await fetch(reqLink)).json();
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
    console.log(questions);
};

const loadHTML = () => {
	const gameView = new GameScreen();
	$appContainer.innerHTML = gameView.getHTML();
};
const cacheTheDom = () => {
	$quizQuestion = document.querySelector(".quiz__question");
	$tracker = document.querySelector(".quiz__current-question");
	$tagline = document.querySelector(".quiz__tagline");
	$choices = Array.from(document.querySelectorAll(".quiz__label"));
	$innerProgress = document.querySelector(".quiz__progress-bar__inner");
	$nextButton = document.querySelector(".button.next");
	$restartButton = document.querySelector(".button.restart");
};

const createQuiz = (numberOfQuestions, categoryId, difficulty) => {};
