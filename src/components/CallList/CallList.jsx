import CallRow from "./CallRow";

import { useSelector } from "react-redux";
import { selectCalls, selectFormUIHeight } from "../../features/callFormSlice";

import "./CallList.css";
import { orderCallsByPriority } from "../../utils/utilityFunctions";

export default function CallList() {
    
    const calls = [...useSelector(selectCalls)];
    const callFormUIHeight = useSelector(selectFormUIHeight);

    return <div id="hcad_calllist_table_wrapper" style={{height: callFormUIHeight}}>
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
                {calls.sort(orderCallsByPriority).map((x, i) => <CallRow key={i} callDetails={x} />)}
            </tbody>
        </table>
    </div> 
};