// FormValidation.js
// Contains all checks needed for every field


export const handleChange = (event, setFormData) =>{
    const {name, value} = event.target;
    setFormData((prevData) => ({
        ...prevData, // this preserves all the unchanged lines
        [name]: value,
    }));
};