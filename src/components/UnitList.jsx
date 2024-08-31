import { useSelector } from "react-redux"
import { selectAllUnits } from "../features/unitSlice"
import "./UnitList.css";
import UnitRow from "./UnitRow";

export function UnitList() {

    const units = useSelector(selectAllUnits);

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
                </tr>
            </thead>
            <tbody>
                {units.map((x, i) => <UnitRow key={i} unitDetails={x} />)}
            </tbody>
        </table>
    </div>
}