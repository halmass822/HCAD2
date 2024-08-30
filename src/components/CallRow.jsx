import { useEffect, useState } from "react";
import { getMMSS } from "../utils/utilityFunctions";
import { useDispatch } from "react-redux";
import { loadCall } from "../features/callFormSlice";

export default function CallRow(props) {

    const [pending, setPending] = useState("--:--");
    const dispatch = useDispatch();

    useEffect(() => {
        const intervalid = setInterval(() => {
            setPending(getMMSS(Date.now() - props.callDetails.dateCreated));
        }, 1000);
        return () => clearInterval(intervalid);
    }, [])

    return <tr className="hcad_callrow noselect" key={props.incident_number} onDoubleClick={() => dispatch(loadCall(props.callDetails))}>
        <td className="noselect">{props.callDetails.priority}</td>
        <td className="noselect">{pending}</td>
        <td className="noselect">{props.callDetails.callType}</td>
        <td className="hcad_callrow_td_address noselect">{props.callDetails.address}</td>
        <td className="noselect">{props.callDetails.incidentNumber}</td>
        <td className="hcad_callrow_td_units noselect">{props.callDetails.assignedUnits.join(", ")}</td>
    </tr>
}