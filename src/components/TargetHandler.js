import React, { useState, useEffect, useRef } from 'react';
import Target from './Target';
import '../TargetHandler.css';

const TargetHandler = () => {

    // Keeps track of the player's game score
    const [score, setScore] = useState(0);

    const containerRef = useRef();

    useEffect(() => {
    }, [])

    function testFunction(callback) {
        console.log('Clicked!');
        if(typeof callback == "function") {
            callback();
        }
    }

    return (
        <>
            <div ref={containerRef} className='container'>
                <Target onTargetClicked={testFunction} containerRef={containerRef}/>
            </div>
        </>
    )
}

export default TargetHandler
