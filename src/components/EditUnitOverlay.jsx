import { useSelector } from "react-redux";
import { selectCreateoredit, selectOverlayState, selectTargetUnit } from "../features/unitSlice";
import "./EditUnitOverlay.css";
import { useEffect, useState } from "react";

export default function EditUnitOverlay() {
    const overlayState = useSelector(selectOverlayState);
    const createoredit = useSelector(selectCreateoredit);
    const targetUnit = useSelector(selectTargetUnit);

    const [unit, setUnit] = useState
    ("");
    useEffect(() => {
        if(createoredit === "edit") setUnit(targetUnit);
    }, [targetUnit]);

    return <div id="hcad_overlay" hidden={!overlayState}>
        <div id="hcad_editunitoverlay">
            {createoredit === "create" 
            ?<h4 id="hcad_overlay_title">Create Unit</h4> 
            :<h4 id="hcad_overlay_title">Edit Unit {targetUnit}</h4>}
            <label id="hcad_overlay_inputunit">Unit
                <input 
                    type="text" 
                    disabled={createoredit === "create" ? false : true}
                ></input>
                </label>
        </div>
    </div>
}