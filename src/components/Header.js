import { nightMode, toggleNightMode } from '../redux/Store.js';

const Header = () => {

    const reload = () => {
        window.location.reload();
    }

    return (
        <div id="header" className="d-flex flex-row flex-xl-column align-items-center justify-content-between">
            <div className="logo-container centerize">
                <div onClick={() => reload()}className="logo pointer"></div>
            </div>
            <div className="centerize flex-row flex-xl-column">
                <div onClick={() => toggleNightMode()} className="d-flex align-items-center justify-content-center switch-container" >
                    <div className={`${nightMode() ? `theme-night` : `theme-day`} theme pointer`}></div>
                </div>
                <div className="avatar-container centerize pointer">
                    <div className="avatar-image"></div>
                </div>
            </div>
        </div>
    )
}

export default Header
