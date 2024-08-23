import CallRow from "./CallRow";

import { useSelector } from "react-redux";
import { selectCalls } from "../features/callFormSlice";

import "./CallList.css";

export default function CallList() {
    
    const calls = useSelector(selectCalls);
    
    return <div id="hcad_calllist_table_wrapper">
        <table id="hcad_calllist_table">
        <thead>
                <tr>
                    <th id="hcad_calllist_th_priority">Priority</th>
                    <th id="hcad_calllist_th_pending">Pending</th>
                    <th id="hcad_calllist_th_type">Type</th>
                    <th id="hcad_calllist_th_address">Address</th>
                    <th id="hcad_calllist_th_number">Number</th>
                    <th id="hcad_calllist_th_units">Units</th>
                </tr>
                </thead>
            <tbody>
                {calls.map((x, i) => {
                    return <CallRow key={i} callDetails={x} />
                })}
            </tbody>
        </table>
    </div> 
};