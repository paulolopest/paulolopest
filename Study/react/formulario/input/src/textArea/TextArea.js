import React from 'react'

const TextArea = () => {

    const [message, setMessage] = React.useState(null)

    return (
        <form>
            <label htmlFor='message'>Message</label>
            <textarea
                id='message'
                value={message}
                onChange={({ target }) => setMessage(target.value)}
                rows="5"
            />

            {message}
        </form>
    )
}

export default TextArea