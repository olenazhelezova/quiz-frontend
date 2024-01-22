import React from "react";
import { useParams } from "react-router-dom";
import QRCodeComponent from "../components/QRcodeComponent";


function MainDisplay() {
    let { sessionId } = useParams();
    return (
        <QRCodeComponent sessionId={ sessionId } title="scan me" />  
    )
}

export default MainDisplay;