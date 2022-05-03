import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import {Counter} from '../../components/Counter';

test('Should use one as default value', async () => {
  render(<Counter />)

  expect(screen.getByTestId('counter')).toHaveTextContent('1 produit');
});

test('Should use defaultValue props as default value', async () => {
  render(<Counter defaultValue="0"/>)

  expect(screen.getByTestId('counter')).toHaveTextContent('Rien');
});

test('Should increment counter on click to increment button', async () => {
  render(<Counter />)

  const incrementButton = screen.getByTestId('increment');
  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);

  expect(screen.getByTestId('counter')).toHaveTextContent('4 produits');
});

test('Should decrement counter on click to decrement button', async () => {
  render(<Counter />)

  const decrementButton = screen.getByTestId('decrement');
  fireEvent.click(decrementButton);
  fireEvent.click(decrementButton);

  expect(screen.getByTestId('counter')).toHaveTextContent('Rien');
});

test('Should increment counter on click to increment button (snapshot version)', async () => {
  const {container} = render(<Counter />)

  const incrementButton = screen.getByTestId('increment');
  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);

  expect(container).toMatchSnapshot();
});
