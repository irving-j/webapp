import React, { useEffect, useState } from 'react'
import axios from 'axios'

const styles = {
    h1: {
        color: "#f0f8ff"
    },
    heading: {
        height: "100px",
        backgroundColor: "#00ced1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    select: {
        margin: "10px"
    },
    table: {
        marginLeft: "auto", 
        marginRight: "auto"
    },
    tableHeading: {
        backgroundColor: "#add8e6"
    },
    tableRow: {
        backgroundColor: "#f2f2f2"
    }
}

function Container({children}){
    return (
    <div >{children}</div>
    )
}

function Grid(props){
    const date = new Date().toLocaleDateString()

    return (
        <table style={styles.table}>
            <thead>
                <tr>
                    <th colspan="5" style={styles.tableHeading}>{props.station} - {date}</th>
                </tr>
            </thead>
            <th style={styles.tableHeading}>Time</th><th style={styles.tableHeading}>Destination</th><th style={styles.tableHeading}>Train</th><th style={styles.tableHeading}>Track</th><th style={styles.tableHeading}>Status</th>
            {props.outbound && props.outbound.map((row) => {
                return <tr style={styles.tableRow}><td>{row.time}</td><td>{row.destination}</td><td>{row.train}</td><td>{row.track}</td><td>{row.status}</td></tr>
            })}
            {props.inbound && props.inbound.length > 0 && <tr><td colspan="5">Inbound</td></tr>}
            {props.inbound && (
                props.inbound.map((row) => {
                    return <tr style={styles.tableRow} ><td>{row.time}</td><td>{row.destination}</td><td>{row.train}</td><td>{row.track}</td><td>{row.status}</td></tr>
                })
            )
            }   
        </table>
    );
}

function DepartureBoard() {
    const [station, setStation] = useState("North Station")
    const [stationList, setStationList] = useState(["Choose a station..."])
    const [scheduleData, setScheduleData] = useState([])

    const stationsEP = '/api/stations'
    const scheduleEP = `/api/schedules?station=${station}`

    const handleChange = function(e) {
        setStation(e.target.value)
    }

    useEffect(() => {
        const fetchStations = async () => {
            const result = await axios
                .get(stationsEP)
                .then(res => setStationList(res.data))
                .catch(err => console.log(err))
        }
        const fetchSchedules = async () => {
            const result = await axios
                .get(scheduleEP)
                .then(res => setScheduleData(res.data))
                .catch(err => console.log(err))
        }
        fetchStations()
        fetchSchedules()
    },[stationsEP, scheduleEP])

    return (
        <div>
            <div style={styles.heading} >
                <h1 style={styles.h1} >Commuter Rail Schedule</h1>
            </div>
            Station: 
            <select style={styles.select} onChange={handleChange} >
                {stationList.map((station) => {
                    return <option value={station} >{station}</option>
                    }
                )}
            </select>
            <Container >
                <Grid {...scheduleData} />
            </Container>
        </div>
        
    );
}

export default DepartureBoard;