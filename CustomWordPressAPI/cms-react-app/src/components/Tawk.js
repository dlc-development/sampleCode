import React, {useRef, useContext, useEffect} from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const TawkComponent = (props) => {

    const tawkMessengerRef = useRef();

    const thisContext = useContext(props.ThemeContext);
    const onLoad = () => {
        if(thisContext.tawkIsOpen === true){
            tawkMessengerRef.current.maximize();
        }
    };

    return(
        <TawkMessengerReact
            propertyId="58fa297464f23d19a89ae838"
            widgetId="default"
            ref={tawkMessengerRef}
            onLoad={onLoad}
        />
    )
}

export default TawkComponent;