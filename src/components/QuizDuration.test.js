import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizDuration from './QuizDuration';

describe('QuizDuration', () => {
  it('renders QuizDuration component with initial value and slider', () => {
    render(<QuizDuration />);
    
    // Ensure the component renders with the initial value
    const initialValueElement = screen.getByText('15');
    expect(initialValueElement).toBeInTheDocument();

    // Ensure the component renders the game duration header
    const headerElement = screen.getByText('GAME DURATION');
    expect(headerElement).toBeInTheDocument();

    // Ensure the slider is rendered
    const sliderElement = screen.getByRole('slider');
    expect(sliderElement).toBeInTheDocument();
  });

});
