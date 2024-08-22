import CallRow from "./CallRow";

import { useSelector } from "react-redux";
import { selectCalls } from "../features/callFormSlice";

export default function CallList() {
    
    const calls = useSelector(selectCalls);
    
    return <table id="hcad_calllist_table">
        <thead>
            <tr>
                <th>Priority</th>
                <th>Pending</th>
                <th>Type</th>
                <th>Address</th>
                <th>Number</th>
                <th>Units</th>
            </tr>
        </thead>
        <tbody>
            {calls.map((x, i) => {
                <CallRow key={i} callDetails={x} />
            })}
        </tbody>
    </table>
};