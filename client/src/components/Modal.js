import React, { useState } from 'react'

const Loading = ({ show, text, success }) => {
    const [isShow,setShow] = useState(show)
    React.useEffect(
        () => {
            setShow(show)
        },[show]
    )
    return (
        <div className="modalContainer">
            {
                isShow ?
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <p>{text}</p>
                            <span className="close" onClick={() => setShow(false)}>&times;</span>
                        </div>
                    </div>
                    : null}
        </div>
    )
}

export default Loading