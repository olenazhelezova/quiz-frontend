import React from 'react'
import QuizDuration from './QuizDuration'


function GameSetup () {
    const [setupState, setSetupState] = React.useState({
        quizDuration: 15
    })

    function setDuration(newDuration) {
        setSetupState(prevState => ({ ...prevState, quizDuration: newDuration }));
    }

    return (
        <>
            <QuizDuration 
                duration={setupState.quizDuration} 
                setDuration={setDuration} 
            />
        </>
        
    )
}

export default GameSetup