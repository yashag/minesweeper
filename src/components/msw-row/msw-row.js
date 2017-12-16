import React from 'react';
import './msw-row.scss';

import Cell from '../msw-cell/msw-cell';

const Row = props => {
    
    let cells = props.cells.map((cell, index) => {
        return <Cell key={index} cellData={cell} cellClick={props.cellClick} flagClick={props.flagClick} />;
    });

    return (
        <tr className = "msw-board-row">
            {cells}
        </tr>
    );

};

export default Row;