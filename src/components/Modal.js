import React from 'react'

export default function Modal({isCorrect, turn, solution}) {

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>You win!</h1>
                <p className="solution">{solution}</p>
                <p>You found the solution in {turn} {turn === 1 ? 'guess' : 'guesses'} :)</p>
                <button onClick={refreshPage}>Play again</button>
            </div>
        )}
          {!isCorrect && (
              <div>
                  <h1>Nevermind</h1>
                  <p className="solution">{solution}</p>
                  <p>Better luck next time</p>
                  <button onClick={refreshPage}>Play again</button>
              </div>
          )}
    </div>
  )
}
