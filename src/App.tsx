import React, {useEffect, useState} from 'react';
import {OverlayView} from "./views/OverlayView";
import {PanelView} from "./views/PanelView";
import 'react-tooltip/dist/react-tooltip.css'

function App() {

    //Get parameters from URL
    const queryParameters = new URLSearchParams(window.location.search);

    const [paramsSpecified, setParamsSpecified] = useState<boolean>(false);

    useEffect(() => {
        if(!queryParameters.get("username") || !queryParameters.get("game")){
            setParamsSpecified(false);
            return;
        }

        setParamsSpecified(true);
    }, [queryParameters]);


    return (
        <>
            {
                paramsSpecified ?
                    <OverlayView username={queryParameters.get("username")!} game={queryParameters.get("game")!}/>
                :
                    <PanelView/>
            }
        </>
    );
}

export default App;
