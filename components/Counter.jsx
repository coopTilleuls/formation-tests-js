import {useMemo, useState} from 'react';
import translation from '../translation.json';
import {translateHelper} from '../helpers/translateHelper';

export const Counter = ({defaultValue = 1}) => {
  const [counter, setCounter] = useState(defaultValue);

  const decrement = () => setCounter(counter - 1);
  const increment = () => setCounter(counter + 1);
  const counterTranslation = useMemo(() => {
    return translateHelper.translate(translation, 'fr', 'counter', counter);
  }, [translation, counter]);

  return (
    <>
      <button data-testid="decrement" onClick={decrement}>-1</button>
      <span data-testid="counter">{counterTranslation}</span>
      <button data-testid="increment" onClick={increment}>+1</button>
    </>
  );
}
