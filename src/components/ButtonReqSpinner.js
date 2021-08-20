import React from 'react'

const ButtonReqSpinner = () => {
    return (
        <div id="buttonReqSpinner" className="position-absolute f-c">
            <div className="lds-ellipsis">
                <div></div><div></div>
                <div></div><div></div>
            </div>
        </div>
    )
}

export default ButtonReqSpinner
