import { useEffect, useState } from "react";
import { getMMSS } from "../utils/utilityFunctions";

export default function CallRow(props) {

    const [pending, setPending] = useState("--:--");

    useEffect(() => {
        const intervalid = setInterval(() => {
            setPending(getMMSS(Date.now() - props.callDetails.date_created));
        }, 1000);
        return () => clearInterval(intervalid);
    }, [])

    return <tr key={props.incident_number}>
        <td>{props.callDetails.priority}</td>
        <td>{pending}</td>
        <td>{props.callDetails.callType}</td>
        <td>{props.callDetails.address}</td>
        <td>{props.callDetails.incident_number}</td>
        <td>{props.callDetails.assigned_units.map((x, i) => <p key={i} className="hcad_calllist_unit">{x}</p>)}</td>
    </tr>
}