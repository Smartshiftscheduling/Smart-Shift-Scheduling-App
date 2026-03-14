import React, { useState } from 'react';

const ScheduleBuilder = ({ staff, shifts, onScheduleChange }) => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const [schedule, setSchedule] = useState({});

  // Initialize schedule from shifts
  React.useEffect(() => {
    const initialSchedule = {};
    shifts.forEach(shift => {
      if (shift.assigned) {
        if (!initialSchedule[shift.assigned]) {
          initialSchedule[shift.assigned] = {};
        }
        initialSchedule[shift.assigned][shift.day] = shift;
      }
    });
    setSchedule(initialSchedule);
  }, [shifts]);

  const getShiftDisplay = (employeeId, day) => {
    const employeeSchedule = schedule[employeeId];
    if (!employeeSchedule || !employeeSchedule[day]) {
      return 'OFF';
    }
    const shift = employeeSchedule[day];
    return `${shift.start}-${shift.end}`;
  };

  const handleCellClick = (employeeId, day) => {
    // For now, just toggle between OFF and a default shift
    // In a full implementation, this would open a shift selection modal
    const currentShift = schedule[employeeId]?.[day];
    const newSchedule = { ...schedule };

    if (!newSchedule[employeeId]) {
      newSchedule[employeeId] = {};
    }

    if (currentShift) {
      // Remove shift
      delete newSchedule[employeeId][day];
    } else {
      // Add default shift (9-5)
      newSchedule[employeeId][day] = {
        id: `shift_${employeeId}_${day}`,
        day,
        start: 9,
        end: 17,
        hours: 8,
        assigned: employeeId
      };
    }

    setSchedule(newSchedule);
    onScheduleChange && onScheduleChange(newSchedule);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ color: '#fff', marginBottom: 20 }}>Schedule Builder</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(7, 1fr)', gap: '2px', fontFamily: 'monospace' }}>
        {/* Header row */}
        <div style={{ padding: '8px', background: '#333', color: '#fff', fontWeight: 'bold' }}>Employee</div>
        {days.map(day => (
          <div key={day} style={{ padding: '8px', background: '#333', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
            {day}
          </div>
        ))}

        {/* Employee rows */}
        {staff.map(employee => (
          <React.Fragment key={employee.id}>
            <div style={{ padding: '8px', background: '#222', color: '#fff', fontWeight: 'bold' }}>
              {employee.id.charAt(0).toUpperCase() + employee.id.slice(1)}
            </div>
            {days.map(day => (
              <div
                key={`${employee.id}-${day}`}
                onClick={() => handleCellClick(employee.id, day)}
                style={{
                  padding: '8px',
                  background: getShiftDisplay(employee.id, day) === 'OFF' ? '#18181b' : '#991b1b',
                  color: '#fff',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1px solid #333',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {getShiftDisplay(employee.id, day)}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div style={{ marginTop: 20, color: '#ccc', fontSize: '14px' }}>
        Click on cells to toggle shifts. Green = scheduled, Dark = off.
      </div>
    </div>
  );
};

export default ScheduleBuilder;