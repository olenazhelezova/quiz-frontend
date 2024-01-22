import React from "react";
import { useParams } from "react-router-dom";

function MainDisplay() {
    let { sessionId } = useParams();
    return (
        <h1>{sessionId}</h1>
    )
}

export default MainDisplay;