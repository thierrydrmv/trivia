import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import App from '../../App';
import { act } from "react-dom/test-utils";

describe('Testa os funcionamentos da tela de Ranking', () => {
  it('Testa o botão redireciona para página inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/ranking');
    })
    const homeBtn = screen.getByRole('button', {  name: /ir para o início!/i});
    userEvent.click(homeBtn);
    expect(history.location.pathname).toBe('/');
  })
})