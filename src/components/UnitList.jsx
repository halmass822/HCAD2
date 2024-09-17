import { useDispatch, useSelector } from "react-redux"
import { selectAllUnits, setCreateOrEditUnit, setOverlayState, setTargetUnit } from "../features/unitSlice"
import "./UnitList.css";
import UnitRow from "./UnitRow";
import { loadCall, selectCalls, setFormState } from "../features/callFormSlice";

export function UnitList() {
    const dispatch = useDispatch();
    const units = useSelector(selectAllUnits);
    const calls = useSelector(selectCalls);

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

    return <div id="hcad_unitList_table_wrapper">
        <table id="hcad_unitList_table">
            <thead>
                <tr>
                    <th id="hcad_unitList_th_unit">Unit</th>
                    <th id="hcad_unitList_th_idle">Idle</th>
                    <th id="hcad_unitList_th_status">Status</th>
                    <th id="hcad_unitList_th_officer">Officer(s)</th>
                    <th id="hcad_unitList_th_badge">Badge</th>
                    <th id="hcad_unitList_th_location">Location</th>
                    <th id="hcad_unitList_th_calltype">Calltype</th>
                    <th id="hcad_unitList_th_incnum">Inc. #</th>
                    <th id="hcad_unitList_th_actions"><button id="hcad_unitlist_createunit" onClick={handleCreateUnitPress}>ADD UNIT</button></th>
                </tr>
            </thead>
            <tbody>
                {units.map((x, i) => <UnitRow key={i} unitDetails={x} handleDblClick={handleUnitRowDblClick} />)}
            </tbody>
        </table>
    </div>
}