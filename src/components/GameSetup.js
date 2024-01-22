import React from 'react'
import QuizDuration from './QuizDuration'
import QuizTopicSelection from './QuizTopicSelection'


function GameSetup () {
    const [setupState, setSetupState] = React.useState({
        selectedTopic: null,
        quizDuration: 15
    })
    const [topicList, setTopicList] = React.useState([]);

    function setDuration(newDuration) {
        setSetupState(prevState => ({ ...prevState, quizDuration: newDuration }));
    }

    function setTopic(newTopic) {
        setSetupState(prevState => ({ ...prevState, selectedTopic: newTopic }));
    }

    React.useEffect(() => {
        fetch("/data")
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then(data => setTopicList(data.topics))
          .catch(error => console.error('Fetch error:', error));
    }, []);
    
    console.log(topicList)
    // const topicList = ["ART", "ANIMALS", "SCIENCE", "TV & MOVIE", "HISTORY", "MUSIC", "TECHNOLOGIES", "FOOD & DRINK"]

    return (
        <>
            <QuizTopicSelection 
                selectedTopic={setupState.selectedTopic}
                setTopic={setTopic}
                topicList = { topicList }
            />
            <QuizDuration 
                duration={setupState.quizDuration} 
                setDuration={setDuration} 
            />
        </>
        
    )
}

export default GameSetup