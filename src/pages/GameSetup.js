import React from 'react'
import QuizDuration from '../components/QuizDuration'
import QuizTopicSelection from '../components/QuizTopicSelection'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function GameSetup () {
    const [setupState, setSetupState] = React.useState({
        selectedTopic: null,
        quizDuration: 15
    })
    const [topicList, setTopicList] = React.useState([]);
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);

    function showErrorAlert(icon, title, text) {
        MySwal.fire({
          icon: icon,
          title: title,
          text: text || 'Something goes wrong...',
          confirmButtonColor: '#753dad',
        });
      }

    function setDuration(newDuration) {
        setSetupState(prevState => ({ ...prevState, quizDuration: newDuration }));
    }

    function setTopic(newTopic) {
        setSetupState(prevState => ({ ...prevState, selectedTopic: newTopic }));
    }

    React.useEffect(() => {
        (async () => {
            if (topicList.length === 0) {
                try {
                    const res = await fetch("/topics.json");
                    const data = await res.json();
                    setTopicList(data.topics);
                } catch (e) {
                    console.error('Fetch error:', e);
                }
            }
        })();
    }, [topicList]);

    function handleSubmit(event) {
        event.preventDefault();
        if (setupState.selectedTopic !== null && setupState.quizDuration >= 6 && setupState.quizDuration <= 30) {
            fetch("/sessionId.json")
            .then(res => {
                if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                navigate('/main-display/' + data.sessionId);
            } )
            .catch(error => console.error('Fetch error:', error));
        } else {
            showErrorAlert(null, null, 'Please choose a valid topic and set a quiz duration between 6 and 30 questions');
        }    
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <QuizTopicSelection 
                selectedTopic={setupState.selectedTopic}
                setTopic={setTopic}
                topicList = { topicList }
            />
            <QuizDuration 
                duration={setupState.quizDuration} 
                setDuration={setDuration} 
            />
            <button className="game-setup-submit">start</button>
        </form>
    )
}

export default GameSetup