import React from "react"

function QuizTopicSelection({ selectedTopic, setTopic, topicList }) {
    const quizTopic = topicList.map((topic, index) => (
        <li key={index}>
            <div 
                className="option"
                onClick={() => setTopic(topic)}
                style={{
                    backgroundColor:
                    selectedTopic === topic ? "#ff69b4" : "#753dad",
                    
                }}
                >
                {topic}
            </div>
        </li>
    ))
    
    return (
        <div className="topic-selection">
            <h3>PICK YOUR TOPIC</h3>
            <ul className="topic-options"> { quizTopic } </ul>
        </div>
        
    )

}

export default QuizTopicSelection