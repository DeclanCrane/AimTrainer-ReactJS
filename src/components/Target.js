import React, { useEffect, useState } from 'react';
import '../Target.css';

const Target = ({ containerRef }) => {

    const targetLifeTime = 1;

    // Timer handle
    let [timerConfig, setTimerConfig] = useState({timer: 0});

    // Target life time in seconds
    let [time, setTime] = useState(targetLifeTime);

    // Position and color of target
    let [styling, setStyling] = useState({top: 0, left: 0});

    useEffect(() => {

    }, []);

    useEffect(() => {
        if(time.toFixed(1) == 0) {
            // Clear Timer
            clearInterval(timerConfig.timer);

            // Reset Timer
            setTime(targetLifeTime);

            console.log('Dead');
        }

        if(time === targetLifeTime) {
            // Spawn target randomly
            const {top, left} = getRandomPosition();
            setStyling({top, left});

            // Start target timer
            startTimer();
            
            console.log('Spawned');
        }
    }, [time])

    function startTimer() {
        timerConfig.timer = setInterval(() => {
            console.log(time);
            setTime(time -= 0.1);
        }, 100);
    }

    function getRandomPosition() {
        const height = containerRef.current.clientHeight;
        const width = containerRef.current.clientWidth;

        /* Get a random position from inside the container bounds,
        and add padding for target so it doesn't go off-screen */
        const top = Math.random() * (0 - height + 180) * -1;
        const left = Math.random() * (0 - width + 150) * -1;

        return { top, left };
    }

    return (
        <div
             className='target-div' 
             style={{top: styling.top, left: styling.left}}
            >
            {/* When target is clicked, setTime to 0 so target will respawn */}
            <div onClick={() => setTime(0)} className='target' />
            <h1 className='target-info'>{time.toFixed(1) <= 0 ? 0 : time.toFixed(1)}</h1>
        </div>
    )
}

export default Target
