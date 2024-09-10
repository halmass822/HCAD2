export const callTypesDefault = [
    {
        name: "ASSAULT",
        priority: "1"
    },
    {
        name: "MVC",
        priority: "1"
    },
    {
        name: "POLICE ASSIST",
        priority: "3"
    },
    {
        name: "THEFT",
        priority: "2"
    },
    {
        name: "ASSIST FIRE/EMS",
        priority: "1"
    },
    {
        name: "TRAFFIC COMPLAINT",
        priority: "2"
    },
    {
        name: "DOMESTIC",
        priority: "0"
    },
    {
        name: "NEIGHBOUR DISPUTE",
        priority: "1"
    },
];

const currentTime = new Date().getTime();

export const blankCall = {
    incidentNumber: "",
    dateCreated: new Date().getTime(),
    assignedUnits: [],
    address: "",
    callType: "ASSAULT",
    priority: "1",
    remarks: [],
    callerName: "",
    callerPhone: "",
    callerAddress: ""
}

export const unitsDefault = [
    {
        officer1: "DOE",
        badge1: "45567",
        officer2: "",
        badge2: "",
        location: "10-19",
        unit: "6J101",
        status: "AV",
        idle: currentTime,
        incidentNumber: "",
        incidentType: "",
    }, 
    {
        officer1: "DARE",
        badge1: "45568",
        officer2: "",
        badge2: "",
        location: "10-19",
        unit: "6J102",
        status: "AV",
        idle: currentTime,
        incidentNumber: "",
        incidentType: "",
    },
    {
        officer1: "DAMIAN",
        badge1: "45569",
        officer2: "",
        badge2: "",
        location: "10-19",
        unit: "6J103",
        status: "AV",
        idle: currentTime,
        incidentNumber: "",
        incidentType: "",
    },
    {
        officer1: "FITCH",
        badge1: "45570",
        officer2: "",
        badge2: "",
        location: "10-19",
        unit: "6J104",
        status: "AV",
        idle: currentTime,
        incidentNumber: "",
        incidentType: "",
    },
    {
        officer1: "SHORE",
        badge1: "45571",
        officer2: "",
        badge2: "",
        location: "10-19",
        unit: "6J105",
        status: "AV",
        idle: currentTime,
        incidentNumber: "",
        incidentType: "",
    },
]