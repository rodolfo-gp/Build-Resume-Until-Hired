// FormValidation.js
// Contains all checks needed for every field


export function handleChange(event, setFormData) {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : { ...prevFormData[name], value }
    }));
}
