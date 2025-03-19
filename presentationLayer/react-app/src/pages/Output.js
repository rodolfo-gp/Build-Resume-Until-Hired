import React from 'react';
import { useLocation } from 'react-router-dom';

import "../styles/Generation.css";

const OutputForm = () => {
    // Retrieve state passed via navigate
    const location = useLocation();
    const { output, doc_title } = location.state || {};

    return (
        <div className='output_page'>
            <h1 className='header'>Generated File</h1>
            <div className="Generation_output">
                {output && output.length > 0 ? (
                    output.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))
                ) : (
                    <p>No output available</p>
                )}

            </div>
        </div>
    );
}

export default OutputForm;
