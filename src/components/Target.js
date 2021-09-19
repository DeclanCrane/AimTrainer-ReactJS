import React, { useEffect, useState, useRef } from 'react';
import '../Target.css';

const Target = ({ containerRef, updateScore }) => {

    // Time in seconds you have to click the target
    const targetLifeTime = 0.8;

    // Timer handle
    let [timerConfig, setTimerConfig] = useState({timer: 0});

    // Target life time in seconds
    let [time, setTime] = useState(targetLifeTime);

    // Target is alive
    let [alive, setAlive] = useState(false);
 
    // Position and color of target
    let [styling, setStyling] = useState({top: 0, left: 0, background: 'green'});

    const targetDivRef = useRef();

    useEffect(() => {
        if(!alive) {
            // Clear Timer
            clearInterval(timerConfig.timer);

            // Spawn target randomly
            const {top, left} = getRandomPosition(containerRef);
            setStyling({top, left});

            // Reset Target Timer
            setTime(targetLifeTime);

            setAlive(true);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alive]);

    useEffect(() => {
        // When time runs out
        if(time.toFixed(1) == 0) {
            // Clear Timer
            clearInterval(timerConfig.timer);

            // Decrease game score
            updateScore(-1);

            // Reset Target
            setAlive(false);
        }
        // When timer resets
        if(time === targetLifeTime) {
            // Start target timer
            startTimer();
        }

        /* Rewrite this better, shouldn't be hard coded conditionals... */
        if(time.toFixed(1) == 0.4) {
            setStyling({ top: styling.top, left: styling.left, background: 'yellow' });
        }

        if(time.toFixed(1) == 0.2) {
            setStyling({ top: styling.top, left: styling.left, background: 'red' });
        }

        if(time.toFixed(1) == 0.8) {
            setStyling({ top: styling.top, left: styling.left, background: 'green' });
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time])

    function startTimer() {
        timerConfig.timer = setInterval(() => {
            setTime(time -= 0.1);
        }, 100);
    }

    // Gets a random position inside of the game container
    function getRandomPosition(container) {
        /* Get parent container dimensions */
        let height = container.current.clientHeight;
        let width = container.current.clientWidth;

        /* Get target container dimensions and subtract from parent 
        container dimensions so the target won't go out of screen bounds */
        height -= targetDivRef.current.clientHeight + 200; // Need to find a better way to do this, it's hard-coded for now. Not working as expected
        width -= targetDivRef.current.clientWidth;

        /* Get a random position from inside the container bounds
        for target so it doesn't go off-screen */
        const top = Math.floor(Math.random() * (height - 0));
        const left = Math.floor(Math.random() * (width - 0));

        return { top, left };
    }

    return (
        <div
             className='target-div' 
             style={{top: styling.top, left: styling.left}}
             ref={targetDivRef}
             onClick={() => { setAlive(false); updateScore(1); }}
            >
            {/* When target is clicked, setTime to 0 so target will respawn */}
            <div className='target' style={{background: styling.background}} />
            <h1 unselectable="on" className='target-info'>{time.toFixed(1) <= 0 ? 0 : time.toFixed(1)}</h1>
        </div>
    )
}

export default Target
