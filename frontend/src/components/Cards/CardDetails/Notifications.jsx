import './Notifications.scss'
import { IoEye } from "react-icons/io5";
import { FiCheck } from "react-icons/fi";
const Notifications = () =>{

    return(
        <div className='notifications-container'>
            <div>
                Notifications
                <button> <IoEye className='eye'/>Watching <FiCheck /></button>
            </div>
        </div>
    )
}

export default Notifications