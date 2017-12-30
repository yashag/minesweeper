import React from 'react';
import './msw-extra.scss';
import leftClick from '../../assets/images/left-click.png';
import rightClick from '../../assets/images/right-click.png';

const Extra = props => {

    return (
        <section className="msw-extra">
            <div className="msw-tutorial">
                <h3>How to play</h3>
                <ul>
                    <li className="msw-tutorial-reveal">
                        <img src={leftClick} alt="left-click" />
                        <span>reveal</span>
                    </li>
                    <li className="msw-tutorial-flag">
                        <img src={rightClick} alt="right-click" />
                        <span>flag</span>
                    </li>
                </ul>
            </div>

            <div className="msw-attributions">
                <h3>Attributions</h3>
                <ul>
                    <li>
                        <a href="http://www.erikeliasson.io/" target="_blank" rel='noopener noreferrer'>Erik Ragnar Eliasson</a>
                    </li>
                    <li>
                        <a href="https://icons8.com/" target="_blank" rel='noopener noreferrer'>icons8</a>
                    </li>
                </ul>
            </div>
        </section>
    );

}

export default Extra;