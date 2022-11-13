import React from "react"

export default function Intro(props){
    return(
        <div className="intro">
            <h1 className="intro-header">Quizzical</h1>
            <h3 className="intro-subheader">How smart are you really?</h3>
            <button className="start" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}