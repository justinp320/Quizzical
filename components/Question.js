import React from "react"
import he from "he"
import {nanoid} from "nanoid"

export default function Question(props){
    const answerButtons = props.allAnswersArray.map((answer,index) =>{
        let buttonClass = "answer-btn" 
        let setDisabled = false
        if(props.selectedAnswerIndex === index && !props.hasBeenSubmitted){
            buttonClass += " selected"
         }
         if(props.hasBeenSubmitted){
             setDisabled = true
            if(props.answerIndex === index){
                 buttonClass += " correct"
             }
             else if(props.selectedAnswerIndex === index && props.selectedAnswerIndex !== props.answerIndex){
                buttonClass += " incorrect"
             }
             else{
                 buttonClass += " grayed"
             }
         }
        return(
        <button disabled={setDisabled} key={nanoid()}
                className={buttonClass}
                onClick={()=>props.selectAnswer(props.id,index)}
                >{he.decode(answer)}
        </button>
    )})
    
    
    return (
        <div className="question">
            <p className="question-title">{he.decode(props.question)}</p>
            {answerButtons}
        </div>
    )
}