import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import App from '../../App';
import Feedback from "../../pages/Feedback";
import { act } from "react-dom/test-utils";

describe('Testa os funcionamentos da tela de Feedback', () => {
    it('Verifica funcionalidade do botão de Ranking', () => {
      const player = {
        name: 'grupo27',
        gravatarEmail: 'grupo27@trybe.com',
        score: 142,
        assertions: 3,
      };
      renderWithRouterAndRedux(<App />, { player }, '/feedback');
      const assertionsText = screen.getByTestId('feedback-total-question');
      const feedbackText = screen.getByTestId('feedback-text');
      const rankingBtn = screen.getByRole('button', {  name: /ranking/i});
      expect(assertionsText.innerHTML).toBe("3");
      expect(feedbackText.innerHTML).toBe('Well Done!');
      expect(rankingBtn).toBeInTheDocument();
      userEvent.click(rankingBtn)
      const rankingTitle = screen.getByRole('heading', {  name: /ranking/i});
      expect(rankingTitle).toBeInTheDocument()

      
    })
    it('Testa outra renderização pro texto', () => {
      const player = {
        name: 'grupo27',
        gravatarEmail: 'grupo27@trybe.com',
        score: 142,
        assertions: 2,
      };
      const { history } = renderWithRouterAndRedux(<App />, { player }, '/feedback');
      const assertionsText = screen.getByTestId('feedback-total-question');
      const feedbackText = screen.getByTestId('feedback-text');
      expect(assertionsText.innerHTML).toBe("2");
      expect(feedbackText.innerHTML).toBe('Could be better...');
      const playAgainBtn = screen.getByRole('button', {  name: /play again/i});
      expect(playAgainBtn).toBeInTheDocument();
      userEvent.click(playAgainBtn);
      expect(history.location.pathname).toBe('/');
    })
    
})