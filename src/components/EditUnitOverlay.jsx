import { useDispatch, useSelector } from "react-redux";
import { createUnit, editUnit, selectCreateoredit, selectOverlayState, selectTargetUnit, setOverlayState } from "../features/unitSlice";
import "./EditUnitOverlay.css";
import { useEffect, useState } from "react";

export default function EditUnitOverlay() {
    const dispatch = useDispatch();
    const overlayState = useSelector(selectOverlayState);
    const createoredit = useSelector(selectCreateoredit);
    const targetUnit = useSelector(selectTargetUnit);

    const [unit, setUnit] = useState("");
    const [officer1, setOfficer1] = useState("");
    const [badge1, setBadge1] = useState("");
    const [officer2, setOfficer2] = useState("");
    const [badge2, setBadge2] = useState("");

    useEffect(() => {
        if(createoredit === "edit") setUnit(targetUnit);
    }, [targetUnit]);

    function handleSubmit() {
        const outputObj = {
            unit: unit,
            officer1: officer1,
            badge1: badge1,
            officer2: officer2,
            badge2: badge2
        };
        createoredit === "create" ? dispatch(createUnit(outputObj)) : dispatch(editUnit(outputObj));
        dispatch(setOverlayState(false));
    };

    return <div id="hcad_overlay" hidden={!overlayState}>
        <div id="hcad_editunitoverlay">
            {createoredit === "create" 
            ?<h4 id="hcad_overlay_title">Create Unit</h4> 
            :<h4 id="hcad_overlay_title">Editing Unit {targetUnit}</h4>}
            <label id="hcad_overlay_inputunit">Unit:
                <input 
                    type="text" 
                    disabled={createoredit === "create" ? false : true}
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                ></input>
            <label id="hcad_overlay_inputofficer1"> Officer 1:
                <input type="text" value={officer1} onChange={(e) => setOfficer1(e.target.value.toUpperCase())}></input>
            </label>
            <label id="hcad_overlay_inputbadge1"> Badge 1:
                <input type="text" value={badge1} onChange={(e) => setBadge1(e.target.value.toUpperCase())}></input>
            </label>
            <label id="hcad_overlay_inputofficer2"> Officer 2:
                <input type="text" value={officer2} onChange={(e) => setOfficer2(e.target.value.toUpperCase())}></input>
            </label>
            <label id="hcad_overlay_inputbadge2"> Badge 2:
                <input type="text" value={badge2} onChange={(e) => setBadge2(e.target.value.toUpperCase())}></input>
            </label>
                </label>
            <button id="hcad_overlay_button" onClick={handleSubmit}>{`${createoredit.toUpperCase()}`}</button>
        </div>
    </div>
}