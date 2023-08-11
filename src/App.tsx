import cn from 'classnames';
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

function getOrderedGoods(
  goods: string[],
  orderedMethod: SortType,
  isReversed: boolean,
) {
  const finalGoods = [...goods];

  switch (orderedMethod) {
    case SortType.ALPHABET:
      finalGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.LENGTH:
      finalGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    finalGoods.reverse();
  }

  return finalGoods;
}

export const App: React.FC = () => {
  const [orderMethod, setOrderMethod] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const orderedGoods = getOrderedGoods(
    goodsFromServer,
    orderMethod,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': orderMethod !== SortType.ALPHABET,
          })}
          onClick={() => setOrderMethod(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': orderMethod !== SortType.LENGTH,
          })}
          onClick={() => setOrderMethod(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(orderMethod || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setOrderMethod(SortType.DEFAULT); setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {orderedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
