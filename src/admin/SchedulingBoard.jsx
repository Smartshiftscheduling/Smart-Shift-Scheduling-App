import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SchedulingBoard = ({ staff, shifts, agent }) => {

  const [schedule, setSchedule] = useState(shifts);

  const runAutoSchedule = () => {

    const result = agent.autoSchedule(shifts, staff);

    setSchedule(result);

  };

  const assignEmployee = (shiftId, employeeId) => {

    const updated = schedule.map(shift => {

      if (shift.id === shiftId) {

        return {
          ...shift,
          assigned: employeeId
        };

      }

      return shift;

    });

    setSchedule(updated);

  };

  return (

    <div style={styles.container}>

      <div style={styles.header}>

        <h2>Weekly Schedule</h2>

        <button
          style={styles.autoButton}
          onClick={runAutoSchedule}
        >
          AI Auto Schedule
        </button>

      </div>

      <DndContext>

        <div style={styles.grid}>

          {days.map(day => (

            <div key={day} style={styles.dayColumn}>

              <div style={styles.dayHeader}>
                {day}
              </div>

              {schedule
                .filter(shift => shift.day === day.toLowerCase())
                .map(shift => (

                <div key={shift.id} style={styles.shiftCard}>

                  <div style={styles.shiftTime}>
                    {shift.start}:00 - {shift.end}:00
                  </div>

                  <div style={styles.assigned}>
                    {shift.assigned || "Unassigned"}
                  </div>

                  <select
                    style={styles.assignDropdown}
                    onChange={(e)=>assignEmployee(shift.id,e.target.value)}
                  >

                    <option>Assign</option>

                    {staff.map(emp => (

                      <option key={emp.id} value={emp.id}>
                        {emp.name}
                      </option>

                    ))}

                  </select>

                </div>

              ))}

            </div>

          ))}

        </div>

      </DndContext>

    </div>

  );

};

const styles = {

  container:{
    padding:"40px",
    color:"#fff"
  },

  header:{
    display:"flex",
    justifyContent:"space-between",
    marginBottom:"30px"
  },

  autoButton:{
    background:"#991b1b",
    border:"none",
    padding:"10px 20px",
    color:"#fff",
    cursor:"pointer",
    fontWeight:"bold"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"repeat(7,1fr)",
    gap:"15px"
  },

  dayColumn:{
    background:"#0a0a0a",
    border:"1px solid #1a1a1a",
    padding:"10px",
    minHeight:"400px"
  },

  dayHeader:{
    textAlign:"center",
    marginBottom:"10px",
    color:"#991b1b",
    fontWeight:"bold"
  },

  shiftCard:{
    background:"#111",
    padding:"10px",
    marginBottom:"10px",
    border:"1px solid #222"
  },

  shiftTime:{
    fontSize:"12px",
    marginBottom:"5px"
  },

  assigned:{
    fontSize:"14px",
    marginBottom:"5px"
  },

  assignDropdown:{
    width:"100%"
  }

};

export default SchedulingBoard;