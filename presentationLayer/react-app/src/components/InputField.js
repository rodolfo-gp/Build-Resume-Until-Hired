import React from "react";

import "../styles/Form.css";

function InputField({field, value, handleChange, setFormData, textAreaFields, placeholder, row, col}){
    const isTextArea = textAreaFields.includes(field);

    const isLatexField = field === "latex";

    const handleCheckboxChange = (event) =>{
        setFormData((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value: event.target.checked
            },
        }));
    }

    /**
     *  The purpose of this component is to make the code in Resume.js and
        CoverLetter.js cleaner as we need just one component in order to render
        both <textarea> and <input> tags 
     */
    let inputElement;

    if(isLatexField){
        inputElement = (
            <label>
                <input
                    type = "checkbox"
                    name = {field}
                    id = {field}
                    checked = {value}
                    onChange = {handleCheckboxChange}
                />
                <span>
                    Use LaTeX for Formatting
                </span>
            </label>
        );
    } else if (isTextArea){
        inputElement = (
            <textarea
                name = {field}
                id = {field}
                value = {value}
                onChange = {(event) => handleChange(event, setFormData)}
                placeholder = {placeholder}
                rows = {row}
                cols = {col}
            />
        );       
    } else{
        inputElement = (
            <input
                type = "text"
                name = {field}
                id = {field}
                value = {value}
                onChange = {(event) => handleChange(event, setFormData)}
                placeholder = {placeholder}
            />
        );
    }

    return(
        <div className = "field-container">
            {inputElement}
        </div>
    );

}



export default InputField;