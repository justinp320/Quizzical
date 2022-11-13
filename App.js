import React from "react"
import Intro from "./components/Intro.js"
import Quiz from "./components/Quiz.js"

export default function App(){
    
    const [started, setStarted] = React.useState(false)
    
    function startQuiz(){
        setStarted(true)
    }
    
    
    return(
        <main>
            {!started && <Intro startQuiz={() => startQuiz()}/>}
            {started && <Quiz />}
        </main>
    )
}
