import { useEffect, useState } from "react";
import { getMMSS } from "../utils/utilityFunctions";
import { useDispatch, useSelector } from "react-redux";
import { editCall, selectLoadedCall } from "../features/callFormSlice";
import { editUnit, setCreateOrEditUnit, setOverlayState, setTargetUnit } from "../features/unitSlice";

export default function UnitRow(props) {

    const [pending, setPending] = useState("--:--");
    const loadedCall = useSelector(selectLoadedCall);
    const dispatch = useDispatch();

    useEffect(() => {
        const intervalid = setInterval(() => {
            setPending(getMMSS(Date.now() - props.unitDetails.idle));
        }, 1000);
        return () => clearInterval(intervalid);
    }, [props.unitDetails.idle]);

    function handleDispatch() {
        if(loadedCall.incidentNumber) {
            if(props.unitDetails.incidentNumber === loadedCall.incidentNumber) return; //ignore if already assigned to the call
            dispatch(editUnit({
                unit: props.unitDetails.unit,
                incidentNumber: loadedCall.incidentNumber,
                incidentType: loadedCall.callType,
                location: loadedCall.address,
                status: "DP"
            }));
            dispatch(editCall({
                incidentNumber: loadedCall.incidentNumber,
                assignedUnits: [...loadedCall.assignedUnits, props.unitDetails.unit]
            }));
        }
    }

    function handleClear() {
        dispatch(editUnit({
            unit: props.unitDetails.unit,
            incidentNumber: "",
            incidentType: "",
            location: "",
            status: "AV"
        }));
        dispatch(editCall({
            incidentNumber: loadedCall.incidentNumber,
            assignedUnits: loadedCall.assignedUnits.filter((x) => x !== props.unitDetails.unit)
        }));
    }

    function handleEdit() {
        dispatch(setCreateOrEditUnit("edit"));
        dispatch(setTargetUnit(props.unitDetails.unit));
        dispatch(setOverlayState(true));
    }

    return <tr className={`hcad_unitrow hcad_unitrow_status${props.unitDetails.status}`}>
        <td className="hcad_unitrow_td_unit">{props.unitDetails.unit}</td>
        <td className="hcad_unitrow_td_idle">{[pending]}</td>
        <td className="hcad_unitrow_td_status">{props.unitDetails.status}</td>
        <td className="hcad_unitrow_td_officer">{props.unitDetails.officer2 === "" ? props.unitDetails.officer1 : `${props.unitDetails.officer1}, ${props.unitDetails.officer2}`}</td>
        <td className="hcad_unitrow_td_badge">{props.unitDetails.badge2 === "" ? props.unitDetails.badge1 : `${props.unitDetails.badge1}, ${props.unitDetails.badge2}`}</td>
        <td className="hcad_unitrow_td_location">{props.unitDetails.location}</td>
        <td className="hcad_unitrow_td_calltype">{props.unitDetails.incidentType}</td>
        <td className="hcad_unitrow_td_incnum">{props.unitDetails.incidentNumber}</td>
        <td className="hcad_unitrow_td_actions">
            <button id="hcad_dispatchunitbtn" onClick={handleDispatch}>DP</button>
            <button id="hcad_clearunitbtn" onClick={handleClear} >CL</button>
            <button id="hcad_editunitbtn" onClick={handleEdit} >ED</button>
        </td>
    </tr>
}