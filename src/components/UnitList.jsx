import { useDispatch, useSelector } from "react-redux"
import { selectAllUnits, setCreateOrEditUnit, setOverlayState, setTargetUnit } from "../features/unitSlice"
import "./UnitList.css";
import UnitRow from "./UnitRow";

export function UnitList() {
    const dispatch = useDispatch();
    const units = useSelector(selectAllUnits);

    function handleCreateUnitPress() {
        dispatch(setCreateOrEditUnit("create"));
        dispatch(setTargetUnit(""));
        dispatch(setOverlayState(true));
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
                {units.map((x, i) => <UnitRow key={i} unitDetails={x} />)}
            </tbody>
        </table>
    </div>
}