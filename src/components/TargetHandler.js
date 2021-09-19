import React, { useState, useEffect, useRef } from 'react';
import Target from './Target';
import '../TargetHandler.css';

const TargetHandler = () => {

    // Time in seconds the countdown lasts
    const countdownLength = 3;

    // The length of time in seconds the game lasts
    const gameLength = 30;

    // Player's game score
    const [score, setScore] = useState(0);

    // Time before game starts in seconds
    let [gameStartTime, setGameStartTime] = useState(countdownLength);

    // Time before game ends in seconds
    let [gameTime, setGameTime] = useState(gameLength);

    const containerRef = useRef();

    useEffect(() => {
        startGameStartTimer();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Starts game-start countdown timer
    function startGameStartTimer() {
        const gameStartTimer = setInterval(() => {
            setGameStartTime(gameStartTime -= 1);
            if(gameStartTime <= 0) {
                clearInterval(gameStartTimer);
                startGameTimer();
            }
        }, 1000);
    }

    // Starts game timer
    function startGameTimer() {
        const gameTimer = setInterval(() => {
            setGameTime(gameTime -= 1);
            if(gameTime === 0) {
                clearInterval(gameTimer);
            }
        }, 1000);
    }

    // Updates game score
    function updateScore(number) {
        setScore(score + number);
    }

    // Resets values and restarts game
    function restartGame() {
        // // Reset game values
        // setScore(0);
        // setGameStartTime(countdownLength);
        // setGameTime(gameLength);

        // // Restart game
        // startGameStartTimer();

        window.location.reload();
    }

    return (
        <>
            <div className='game-info-div'>
            <h1 className='game-info'>Score: {score}</h1>
            <h1 className='game-info'>Time Left: {gameTime}</h1>
            </div>
            <div ref={containerRef} className='container'>
                {/* If game start countdown isn't over, display countdown */}
                {gameStartTime > 0 ? <h1 className='countdown'>{gameStartTime}</h1> : null}
                {/* If game start countdown is over, and the game hasn't ended display targets */}
                {gameStartTime === 0 && gameTime !== 0 ? <Target containerRef={containerRef} updateScore={updateScore}/> : null}

                {/* If game ended show the restart button */}
                {gameTime === 0 ? <button onClick={restartGame} className='restartBtn'>Restart</button> : null}
            </div>
        </>
    )
}

export default TargetHandler
