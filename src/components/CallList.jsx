const { useSelector } = require("react-redux")
const { selectCalls } = require("../features/callFormSlice")

export default function CallList() {
    
    const calls = useSelector(selectCalls);
    
    return <table id="hcad_calllist_table">
        <thead>
            <tr>
                <th>Priority</th>
                <th>Pending</th>
                <th>Address</th>
                <th>Number</th>
                <th>Units</th>
            </tr>
        </thead>
        <tbody>
            {calls.map((x, i) => {
                //unit row component
            })}
        </tbody>
    </table>
}