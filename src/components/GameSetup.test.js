import React from "react";
import { render, screen, fireEvent, act } from '@testing-library/react';
import QuizTopicSelection from "./QuizTopicSelection";
import QuizDuration from './QuizDuration';
import GameSetup from "../pages/GameSetup";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


describe("QuizTopicSelection", () => {
  const topicList = ["Topic1", "Topic2", "Topic3"];
  const setTopic = jest.fn();

  it("renders the component with a list of topics", () => {
    const { getByText } = render(
      <QuizTopicSelection selectedTopic="" setTopic={setTopic} topicList={topicList} />
    );

    topicList.forEach((topic) => {
      expect(getByText(topic)).toBeInTheDocument();
    });

    expect(getByText("PICK YOUR TOPIC")).toBeInTheDocument();
  });

  it("calls setTopic function when a topic is clicked", () => {
    const { getByText } = render(
      <QuizTopicSelection selectedTopic="" setTopic={setTopic} topicList={topicList} />
    );

    topicList.forEach((topic) => {
      fireEvent.click(getByText(topic));
      expect(setTopic).toHaveBeenCalledWith(topic);
    });
  });

  it("applies the correct background color to the selected topic", () => {
    const selectedTopic = "Topic2";
    const { getByText } = render(
      <QuizTopicSelection selectedTopic={selectedTopic} setTopic={setTopic} topicList={topicList} />
    );

    topicList.forEach((topic) => {
      const option = getByText(topic).closest(".option");
      if (topic === selectedTopic) {
        expect(option).toHaveStyle("background-color: #ff69b4");
      } else {
        expect(option).toHaveStyle("background-color: #753dad");
      }
    });
  });
});

describe('QuizDuration', () => {
    it('renders QuizDuration component with initial value and slider', () => {
      render(<QuizDuration duration={15} setDuration={() => {}} />);
      
      // Ensure the component renders the game duration header
      const headerElement = screen.getByText('GAME DURATION');
      expect(headerElement).toBeInTheDocument();
  
      // Ensure the slider is rendered
      const sliderElement = screen.getByRole('slider');
      expect(sliderElement).toBeInTheDocument();
    });
});
  
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));
describe('GameSetup sumbission', () => {
    it('handles form submission with valid input', async () => {
        fetchMock.resetMocks();
        fetchMock.mockResponse((req) => {
            switch (req.url) {
                case "/topics.json":
                    return Promise.resolve(JSON.stringify({ topics: ["Topic1", "Topic2"]}));
                case "/sessionId.json":
                    return Promise.resolve(JSON.stringify({ "sessionId": "bohdanzabka"}));
            }
        });

        await act(async () => {
            render(
                <MemoryRouter>
                    <GameSetup />
                </MemoryRouter>
            )
        });

        const topicButton = screen.getByText('Topic1');
        expect(topicButton).toBeInTheDocument();

        await act(async () => {
            userEvent.click(topicButton);
        });

        await act(async () => {
            userEvent.click(screen.getByText("start"));
        });
        
        expect(mockedNavigate).toHaveBeenCalledWith('/main-display/bohdanzabka');  
    });

    it('handles form submission with invalid input', async()=>{
        fetchMock.resetMocks();
        fetchMock.mockResponse((req) => {
            return Promise.resolve(JSON.stringify({ topics: ["Topic1", "Topic2"]}))
        });

        await act(async () => {
            render(
                <MemoryRouter>
                    <GameSetup />
                </MemoryRouter>
            )
        });

        await act(async () => {
            userEvent.click(screen.getByText("start"));
        });

        const errorMessage = screen.getByText('Please choose a valid topic and set a quiz duration between 6 and 30 questions');
        expect(errorMessage).toBeInTheDocument();
    }); 
});

  

