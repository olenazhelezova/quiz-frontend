import ReactSlider from 'react-slider';
import React from 'react';

const QuizDuration = ({duration, setDuration}) => {

  const renderThumb = (props, state) => {
    return (
      <div {...props}>
        <div className="thumb-value">{state.valueNow}</div>
      </div>
    );
  };

  return (
    <div className="slider">
        <h3>GAME DURATION</h3>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          min={6}
          max={30}
          value={duration}
          onChange={(value) => setDuration(value)}
          renderThumb={renderThumb}
        />
    </div>
  );
};

export default QuizDuration;
