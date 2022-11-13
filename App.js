import React from "react"
import Overlay from "./components/Intro.js"
import Quiz from "./components/Quiz.js"

export default function App(){
    
    const [started, setStarted] = React.useState(false)
    
    function loadQuiz(){
        setStarted(true)
    }
    
    
    return(
        <main>
            {!started && <Overlay startQuiz={() => loadQuiz()}/>}
            {started && <Quiz />}
        </main>
    )
}