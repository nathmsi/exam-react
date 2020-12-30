import React, { useState, useRef} from 'react'

const Loading = ({ show, text, success }) => {
    const [isShow,setShow] = useState(show)
    const node = useRef();

    const verifyIfClickedOutsideModal = (e) => {
        if(e.target == document.getElementById('myModal')) {
            console.log('You clicked inside');
            setShow(false)
        }
    }

    React.useEffect(
        () => {
            setShow(show)
            document.addEventListener('mousedown',verifyIfClickedOutsideModal,false)
            return () => document.removeEventListener("mousedown",verifyIfClickedOutsideModal); 
        },[show]
    )
    return (
        <div className="modalContainer">
            {
                isShow ?
                    <div id="myModal" className="modal" ref={node}>
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