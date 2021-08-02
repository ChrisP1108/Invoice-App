import { nightMode, toggleNightMode } from '../redux/Store.js';

const Header = () => {

    const reload = () => {
        window.location.reload();
    }

    return (
        <div id="header" className="d-flex flex-row flex-xl-column align-items-center justify-content-between">
            <div onClick={() => reload()}className="logo pointer"></div>
            <div className="d-flex align-items-center flex-row flex-xl-column">
                <div onClick={() => toggleNightMode()} className="d-flex align-items-center justify-content-center pointer switch-container" >
                    <div className={`${nightMode() ? `theme-night` : `theme-day`} theme`}></div>
                </div>
                <div className="avatar-container d-flex align-items-center justify-content-center pointer">
                    <div className="avatar-image"></div>
                </div>
            </div>
        </div>
    )
}

export default Header
