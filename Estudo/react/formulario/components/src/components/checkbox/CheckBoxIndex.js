import React from 'react'
import CheckboxForm from './CheckboxForm'

const CheckBoxIndex = () => {
    const [language, setLanguage] = React.useState([])
    const [terms, setTerms] = React.useState([])

    return (
        <div>
            <h2>Languages</h2>
            <CheckboxForm
                options={["JavaScript", "PHP", "C#", "Java"]}
                value={language}
                setValue={setLanguage}
            />

            <h2>Terms</h2>
            <CheckboxForm
                options={["Accept the terms"]}
                value={terms}
                setValue={setTerms}
            />
        </div>
    )
}

export default CheckBoxIndex