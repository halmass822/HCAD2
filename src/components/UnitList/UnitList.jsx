import { useDispatch, useSelector } from "react-redux"
import { editUnit, selectAllUnits, setCreateOrEditUnit, setOverlayState, setTargetUnit } from "../../features/unitSlice"
import "./UnitList.css";
import UnitRow from "./UnitRow";
import { addRemark, editCall, loadCall, selectCalls, selectLoadedCall, setFormState } from "../../features/callFormSlice";
import { getHHMM } from "../../utils/utilityFunctions";

export function UnitList() {
    const dispatch = useDispatch();
    const units = useSelector(selectAllUnits);
    const calls = useSelector(selectCalls);
    const loadedCall = useSelector(selectLoadedCall);

    function handleCreateUnitPress() {
        dispatch(setCreateOrEditUnit("create"));
        dispatch(setTargetUnit(""));
        dispatch(setOverlayState(true));
    }

    function handleUnitRowDblClick(targetIncidentNumber) {
        if(targetIncidentNumber) {
            const targetCall = calls.find((x) => x.incidentNumber === targetIncidentNumber);
            if(targetCall) {
                dispatch(loadCall(targetCall));
                dispatch(setFormState("select"));
            } 
        }
    }

    function clearUnit(targetUnitId, targetCallNumber) {
        const targetCall = calls.find((x) => x.incidentNumber === targetCallNumber);
        if(targetCall) dispatch(editCall({
            incidentNumber: targetCallNumber,
            assignedUnits: targetCall.assignedUnits.filter((x) => x !== targetUnitId),
            remarks: [...targetCall.remarks, {text: `${targetUnitId} CLEARED`, time: getHHMM()}]
        }));

        dispatch(editUnit({
                    unit: targetUnitId,
                    incidentNumber: "",
                    incidentType: "",
                    status: "AV"
                }));

    }

    function dispatchUnit(targetUnitId, oldIncidentNumber) {
        const oldCall = calls.find((x) => x.incidentNumber === oldIncidentNumber);
        if(loadedCall.incidentNumber) {
            if(oldIncidentNumber !== "") {
                dispatch(editCall({
                    incidentNumber: oldIncidentNumber,
                    assignedUnits: oldCall.assignedUnits.filter((x) => x !== targetUnitId)
                }));
            }
            const newCall = calls.find((x) => x.incidentNumber === loadedCall.incidentNumber);
            dispatch(editCall({
                incidentNumber: loadedCall.incidentNumber,
                assignedUnits: [...newCall.assignedUnits, targetUnitId]
            }));
            dispatch(editUnit({
                unit: targetUnitId,
                incidentNumber: loadedCall.incidentNumber,
                incidentType: loadedCall.callType,
                location: loadedCall.address,
                status: "DP"
            }));
            dispatch(addRemark({
                incidentNumber: loadedCall.incidentNumber,
                remark: {
                    text: `${targetUnitId} DISPATCHED`,
                    time: getHHMM()
                }
            }));
        }
    }

    // if(loadedCall.incidentNumber) {
    //     if(props.unitDetails.incidentNumber === loadedCall.incidentNumber) return; //ignore if already assigned to the call
        
    //     handleClear();

    //     dispatch(editCall({
    //         incidentNumber: loadedCall.incidentNumber,
    //         assignedUnits: [...loadedCall.assignedUnits, props.unitDetails.unit]
    //     }));
        
    //     dispatch(editUnit({
    //         unit: props.unitDetails.unit,
    //         incidentNumber: loadedCall.incidentNumber,
    //         incidentType: loadedCall.callType,
    //         location: loadedCall.address,
    //         status: "DP"
    //     }));

    return <div id="hcad_unitList_table_wrapper">
        <table id="hcad_unitList_table">
            <thead>
                <tr>
                    <th id="hcad_unitList_th_unit">Unit</th>
                    <th id="hcad_unitList_th_idle">Idle</th>
                    <th id="hcad_unitList_th_status">Status</th>
                    <th id="hcad_unitList_th_officer">Officer(s)</th>
                    <th id="hcad_unitList_th_badge">Badge(s)</th>
                    <th id="hcad_unitList_th_location">Location</th>
                    <th id="hcad_unitList_th_calltype">Calltype</th>
                    <th id="hcad_unitList_th_incnum">Inc. #</th>
                    <th id="hcad_unitList_th_actions"><button id="hcad_unitlist_createunit" onClick={handleCreateUnitPress}>ADD UNIT</button></th>
                </tr>
            </thead>
            <tbody>
                {units.map((x, i) => <UnitRow key={i} unitDetails={x} handleDblClick={handleUnitRowDblClick} dispatchUnit={dispatchUnit} clearUnit={clearUnit} />)}
            </tbody>
        </table>
    </div>
}