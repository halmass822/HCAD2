export default function CallRow(props) {
    return <tr key={props.incident_number}>
        <td>{props.callDetails.priority}</td>
        <td></td> {/* function calculating pending time since call added */}
        <td>{props.callDetails.callType}</td>
        <td>{props.callDetails.address}</td>
        <td>{props.callDetails.incident_number}</td>
        <td>{props.callDetails.assigned_units.map((x) => <p className="hcad_calllist_unit">{x}</p>)}</td>
    </tr>
}