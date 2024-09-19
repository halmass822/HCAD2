import { useState } from "react";
import "./DisclaimerOverlay.css"

export default function DisclaimerOverlay() {
    const [overlayState, setOverlayState] = useState(true);

    return <div id="hcad_disclaimeroverlay" hidden={!overlayState}>
        <div id="hcad_disclaimeroverlay_content">
            <h4>DISCLAIMER:</h4>
            <p>This content is for demonstration purposes and is not monitored</p>
            <p>Please dial your local police/fire/ems services in case of emergency</p>
            <button onClick={() => setOverlayState(false)}>CLOSE</button>
        </div>
    </div>
}