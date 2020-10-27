import { shuffleArray } from './utils';

export type Question = {
    category : string;
    difficulty: string;
    correct_answer: string;
    incorrect_answers:string[];
    question : string;
    type: string;
}

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

// put correct and incorrect answers inside an array
export type QuestionState = Question & { answers : string[]};

// https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple
export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `http://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    // console.log(data);
    // shuffle the answer util
    return data.results.map((question : Question) => ({
        ...question, 
        // put answers in one array
        answers : shuffleArray([...question.incorrect_answers, question.correct_answer]),
    }))
}