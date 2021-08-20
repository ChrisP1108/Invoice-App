const Loading = () => {
    return (
        <div id="loading" className="invoice-trans">
            <div className="lds-default d-flex mx-auto margin">
                <div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
                <div></div>
            </div>
            <div className="f-c mt-5">
                <h1>Loading . . .</h1>
            </div>
        </div>
    )
}

export default Loading

