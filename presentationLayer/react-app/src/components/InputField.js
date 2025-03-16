import React from "react";

function InputField({field, value, handleChange, setFormData, textAreaFields, row, col}){
    const isTextArea = textAreaFields.includes(field);

    return(
        <div className = "field-container">
            {isTextArea ? (
                <textarea
                    id = {field}
                    name = {field}
                    value = {value}
                    onChange = {(event) => handleChange(event, setFormData)}
                    placeholder={`${field}`}
                    rows = {row}
                    cols = {col}
                />
            ) : (
                <input
                    id = {field}
                    name = {field}
                    value = {value}
                    onChange = {(event) => handleChange(event, setFormData)}
                    placeholder = {`${field}`}
                />
            )}
        </div>
    );

}



export default InputField;