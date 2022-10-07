import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import App from '../../App';

describe('Teste se a página Login', () => {
    it('Teste se a página contem inputs', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByRole('textbox', {  name: /nome/i});
    const inputEmail = screen.getByRole('textbox', {  name: /e\-mail/i});
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
});

it('Test if after clicking the play button, it redirects to the game page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);  
    
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i})

    userEvent.type(inputName, "teste");
    userEvent.type(inputEmail, "teste@teste.com");
    userEvent.click(buttonPlay);
    
    const count = await screen.findByText('0');
    expect(count).toBeInTheDocument();
 
 });   

});