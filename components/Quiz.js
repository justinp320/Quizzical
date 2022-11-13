import React from "react"
import Question from "./Question.js"
import {nanoid} from "nanoid"

export default function Quiz(){
    
    const [questions, setQuestions] = React.useState([])
    const [firstLoad, setFirstLoad] = React.useState(false)
    const [hasLoaded, setHasLoaded] = React.useState(false)
    const [submitted, setSubmitted] = React.useState(false)
    const [playAgain, setPlayAgain] = React.useState(false)
    const [score, setScore] = React.useState(0)
        
    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data => {
            setQuestions(data.results)
            setQuestions(prevQuestions=>{
                return prevQuestions.map((question,index) =>{
                    const answers = [...question.incorrect_answers, question.correct_answer].sort( () => .5 - Math.random() )
                    return {...question, 
                            id: index, 
                            allAnswersArray:answers,
                            answerIndex:answers.indexOf(question.correct_answer),
                            isCorrect: false
                    }
                })
            })
            setSubmitted(false)
            setHasLoaded(true)
            setFirstLoad(true)
            })
    },[playAgain])
    
    function selectAnswer(id, index){
        if(!submitted){
            setQuestions(prevQuestions =>{
                return prevQuestions.map((question) => {
                    return question.id == id ? 
                            {...question, 
                            selectedAnswerIndex: index,
                            isSelected: true, 
                            isCorrect: (question.answerIndex===index)} 
                            : {...question}
                })
            })
        }
    }
        

    const allQuestions = questions.map((q,i) =>{
        if (q.allAnswersArray!==undefined){
        return(
            <Question
                key={nanoid()}
                id={i}
                question={q.question} 
                correctAnswer={q.correct_answer}  
                allAnswersArray={q.allAnswersArray}
                answerIndex={q.answerIndex}
                selectAnswer={selectAnswer}
                isSelected={q.isSelected}
                selectedAnswerIndex={q.selectedAnswerIndex}
                isCorrect={q.isCorrect}
                hasBeenSubmitted={q.hasBeenSubmitted}
            />
    )}})

    function handleSubmit(){
        const allSelected = questions.every(q => q.isSelected)
        const correctAnswers = questions.filter(q => q.isCorrect)
        if(allSelected){
            setSubmitted(true)
            setHasLoaded(false)
            setScore(`You scored ${correctAnswers.length}/5 correct answers`)
            setQuestions(prev=>{
                return prev.map(question =>{
                    return {...question, hasBeenSubmitted: true}
                })
            })
        }
    }
    
    function handlePlayAgain(){
        setPlayAgain(prev => !prev)
    }

    return(
        firstLoad && <div className="quiz-container">
            <div className="quiz">
                {allQuestions}
                <div className="quiz-footer">
                    {!submitted && hasLoaded && <button onClick={()=>handleSubmit()} className="check-answer-btn">Check answers</button>}
                    {submitted && <p className="bottom-text">{score}</p>}
                    {submitted && <button className="play-again-btn" onClick={handlePlayAgain} >Play again</button>}
                </div>
            </div>
        </div>
    )
}
