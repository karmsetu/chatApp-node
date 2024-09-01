import './css/info-bar.css';
import onlineIcon from './assets/open-icon.png';
import closeIcon from './assets/close-icon.png';
const InfoBar = ({ room }: { room: string }) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img src={onlineIcon} alt="" className="onlineIcon" />
                <h3>room:{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="">
                    <img src={closeIcon} alt="" />
                </a>
            </div>
        </div>
    );
};

export default InfoBar;
