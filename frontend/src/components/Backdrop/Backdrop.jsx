import './Backdrop.scss';
import ReactDom from 'react-dom';
const Backdrop = ({children}) =>{

    const handleMouseDown = (e) =>{
        e.stopPropagation();
        e.preventDefault();
    }


    return ReactDom.createPortal(
        <div className='backdrop' onMouseDown={handleMouseDown}>
            {children}
        </div>,
        document.getElementById('portal-root')
    );
};

export default Backdrop;