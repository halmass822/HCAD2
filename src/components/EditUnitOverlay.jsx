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
        if(unit === "" || officer1 === "" || badge1 === "") {
            alert("Unit number, officer 1 and badge 1 required!");
        } else {
            const outputObj = {
                unit: unit,
                officer1: officer1,
                badge1: badge1,
                officer2: officer2,
                badge2: badge2
            };
            createoredit === "create" ? dispatch(createUnit(outputObj)) : dispatch(editUnit(outputObj));
            dispatch(setOverlayState(false));
        }
    };

    return <div id="hcad_overlay" hidden={!overlayState}>
        <div id="hcad_editunitoverlay">
        <div id="hcad_overlay_topdiv">
        {createoredit === "create" 
            ?<p id="hcad_overlay_title">Create Unit</p> 
            :<p id="hcad_overlay_title">Editing Unit {targetUnit}</p>
            }
            <label id="hcad_overlay_inputunit">Unit:
                <input 
                    type="text" 
                    disabled={createoredit === "create" ? false : true}
                    value={unit}
                    onChange={(e) => setUnit(e.target.value.toUpperCase())}
                ></input>
            </label>
        </div>
        <label id="hcad_overlay_inputofficer1"> Officer 1:
            <input type="text" value={officer1} onChange={(e) => /\D+$/g.test(e.target.value) ? setOfficer1(e.target.value.toUpperCase()): null}></input>
        </label>
        <label id="hcad_overlay_inputbadge1"> Badge 1:
            <input type="text" value={badge1} onChange={(e) => /\d+$/g.test(e.target.value) ? setBadge1(e.target.value.toUpperCase()) : null}></input>
        </label>
        <label id="hcad_overlay_inputofficer2"> Officer 2:
            <input type="text" value={officer2} onChange={(e) => /\D+$/g.test(e.target.value) ? setOfficer2(e.target.value.toUpperCase()) : null}></input>
        </label>
        <label id="hcad_overlay_inputbadge2"> Badge 2:
            <input type="text" value={badge2} onChange={(e) => /\d+$/g.test(e.target.value) ? setBadge2(e.target.value.toUpperCase()) : null}></input>
        </label>
        <div id="hcad_overlay_buttonsdiv">
            <button id="hcad_overlay_cancel" onClick={() => dispatch(setOverlayState(false))}>CANCEL</button>
            <button id="hcad_overlay_button" onClick={handleSubmit}>{`${createoredit.toUpperCase()}`}</button>
        </div>
        </div>
    </div>
}