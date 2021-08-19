import { NIGHTMODE, TOGGLENIGHTMODE } from '../redux/Store.js';

const Header = () => {

    const reload = () => {
        window.location.reload();
    }

    return (
        <div id="header" className="d-flex flex-row flex-xl-column align-items-center justify-content-between">
            <div className="logo-container f-c">
                <div onClick={() => reload()}className="logo pointer"></div>
            </div>
            <div className="f-c flex-row flex-xl-column">
                <div onClick={() => TOGGLENIGHTMODE()} className="f-c switch-container" >
                    <div className={`${NIGHTMODE() ? `theme-night` : `theme-day`} theme pointer`}></div>
                </div>
                <div className="avatar-container f-c pointer">
                    <div className="avatar-image"></div>
                </div>
            </div>
        </div>
    )
}

export default Header
