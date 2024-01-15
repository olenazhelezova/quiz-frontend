import React from "react";
import { render, fireEvent } from "@testing-library/react";
import QuizTopicSelection from "./QuizTopicSelection";

describe("QuizTopicSelection", () => {
  const topicList = ["science", "history", "geography"];
  const selectedTopic = "science";
  const setTopic = jest.fn();

  it("renders topic selection correctly", () => {
    const { getByText } = render(
      <QuizTopicSelection
        selectedTopic={selectedTopic}
        setTopic={setTopic}
        topicList={topicList}
      />
    );

    topicList.forEach((topic) => {
      const button = getByText(topic);
      expect(button).toBeInTheDocument();
      expect(button).toHaveStyle({
        backgroundColor: selectedTopic === topic ? "#ff69b4" : "#753dad",
      });
    });
  });

  it("calls setTopic when a topic is clicked", () => {
    const { getByText } = render(
      <QuizTopicSelection
        selectedTopic={selectedTopic}
        setTopic={setTopic}
        topicList={topicList}
      />
    );

    const topicButton = getByText("history");
    fireEvent.click(topicButton);

    expect(setTopic).toHaveBeenCalledWith("history");
  });

});
