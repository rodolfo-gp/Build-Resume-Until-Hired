import React from "react";

import "../styles/Form.css";

function InputField({field, value, handleChange, setFormData, textAreaFields, placeholder, row, col}){
    const isTextArea = textAreaFields.includes(field);

    /**
     *  The purpose of this component is to make the code in Resume.js and
        CoverLetter.js cleaner as we need just one component in order to render
        both <textarea> and <input> tags 
     */
    return(
        <div className = "field-container">
            {isTextArea ? (
                <textarea
                    id = {field}
                    name = {field}
                    value = {value}
                    onChange = {(event) => handleChange(event, setFormData)}
                    placeholder={placeholder}
                    rows = {row}
                    cols = {col}
                />
            ) : (
                <input
                    id = {field}
                    name = {field}
                    value = {value}
                    onChange = {(event) => handleChange(event, setFormData)}
                    placeholder = {placeholder}
                />
            )}
        </div>
    );

}



export default InputField;