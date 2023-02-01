import React from 'react'

const Modal = ({modal, setModal}) => {
    if(modal) {
        return (
          <div>
              <div>Esse e um div</div>
              <br></br>
              <button onClick={() => setModal(false)}>Close</button>
          </div>
        )
    } else {
        return null
    }
}

export default Modal