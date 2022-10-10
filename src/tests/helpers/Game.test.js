import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../../App';
import { questionsResponse } from './mockData';

describe('Testa página de Game', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers()
  })
  it('Testa se o fetch foi chamado', async () => {
    jest.spyOn(global, 'fetch');
    jest.spyOn(global, 'clearInterval');
    jest.spyOn(global, 'setInterval');
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.click(buttonPlay);
    await waitFor( async () => {
      expect(history.location.pathname).toBe('/game');
      expect(fetch).toHaveBeenCalledTimes(2);
      const timer = screen.getByTestId('timer');

      expect(timer).toBeInTheDocument();
      const score = screen.getByTestId('header-score');
      const btnQuestions = screen.getAllByRole('button');
      expect(setInterval).toHaveBeenCalled();

      expect(btnQuestions.length).toBeGreaterThanOrEqual(2);
      const btnQuestionCorrect = screen.getByTestId('correct-answer');
      userEvent.click(btnQuestionCorrect);

      const btnNext = await screen.findByRole('button', {  name: /next/i });
      expect(clearInterval).toHaveBeenCalled();
      expect(score.innerHTML).not.toBe('0');

      expect(btnNext).toBeInTheDocument();
      userEvent.click(btnNext);
      expect(btnNext).not.toBeInTheDocument();
      
      expect(history.location.pathname).toBe('/feedback');
    }, { timeout: 4000 });
    
  });
  it('Testa token errado', () => {
    global.localStorage.setItem('token', 'aaaa');
    const localStorageItem = global.localStorage.getItem('token');
    expect(localStorageItem).toBe('aaaa');
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');
    expect(history.location.pathname).toBe('/');
  });
  it('Testa localStorage com results vazio', () =>{
    global.fetch = jest.fn(() =>
    Promise.resolve({
    json: () => Promise.resolve({ results: [], }),
  })
);
    global.localStorage.setItem('token', '76a79a1fb48d8c60dad589b954301f9ea77588e5698c88fad153fc2553fec223');
    renderWithRouterAndRedux(<App />, {}, '/game');
  })

  it('Test disable button', async () => {
    global.localStorage.setItem('token', '76a79a1fb48d8c60dad589b954301f9ea77588e5698c88fad153fc2553fec223');
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(questionsResponse),
    }));
    renderWithRouterAndRedux(<App />, {}, '/game');
    jest.spyOn(global, 'clearInterval');
    jest.useFakeTimers();
    await waitFor(() => {
      const timer = screen.getByTestId('timer');
      expect(timer.innerHTML).toEqual('0');
      const btnQuestionCorrect = screen.getByTestId('correct-answer');
      expect(btnQuestionCorrect).toBeDisabled();
    }, { timeout: 32000 })
      const btnNext = screen.getByRole('button', {  name: /next/i });
      expect(btnNext).toBeInTheDocument();
      userEvent.click(btnNext);
      const btnQuestionCorrect = screen.getByTestId('correct-answer');
      expect(btnQuestionCorrect).toBeInTheDocument()
      userEvent.click(btnQuestionCorrect);

  });

});
