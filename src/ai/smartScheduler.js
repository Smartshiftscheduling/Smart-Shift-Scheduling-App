class SmartScheduler {

  constructor() {
    this.maxHoursPerWeek = 40;
  }

  // MAIN AUTO SCHEDULER
  autoSchedule(shifts, staff, constraints = {}) {

    const schedule = [];
    const staffHours = {};

    staff.forEach(emp => {
      staffHours[emp.id] = 0;
    });

    shifts.forEach(shift => {

      let availableStaff = staff.filter(emp => {

        const available =
          emp.availability.includes(shift.day) &&
          !this.hasConflict(emp.id, shift, schedule);

        const underHours =
          staffHours[emp.id] + shift.hours <= this.maxHoursPerWeek;

        return available && underHours;
      });

      if (availableStaff.length === 0) {
        schedule.push({
          ...shift,
          assigned: null,
          status: "UNFILLED"
        });
        return;
      }

      // Choose employee with least hours
      availableStaff.sort((a, b) =>
        staffHours[a.id] - staffHours[b.id]
      );

      const chosen = availableStaff[0];

      schedule.push({
        ...shift,
        assigned: chosen.id,
        status: "FILLED"
      });

      staffHours[chosen.id] += shift.hours;

    });

    return schedule;
  }


  // CONFLICT CHECK
  hasConflict(employeeId, shift, schedule) {

    return schedule.some(existing => {

      if (existing.assigned !== employeeId) return false;

      if (existing.day !== shift.day) return false;

      return (
        shift.start < existing.end &&
        shift.end > existing.start
      );

    });
  }


  // OPTIMIZATION ENGINE
  optimizeAllocation(staff, shifts, preferences = {}) {

    const optimized = [];

    shifts.forEach(shift => {

      let ranked = staff.map(emp => {

        let score = 0;

        if (emp.availability.includes(shift.day))
          score += 5;

        if (preferences[emp.id]?.includes(shift.id))
          score += 3;

        score += Math.random(); // break ties

        return { emp, score };

      });

      ranked.sort((a, b) => b.score - a.score);

      optimized.push({
        shift: shift.id,
        bestMatch: ranked[0].emp.id
      });

    });

    return optimized;
  }


  // SHIFT SWAP SUGGESTION
  suggestSwap(schedule, staff) {

    const swaps = [];

    schedule.forEach(shift => {

      if (!shift.assigned) return;

      const alternatives = staff.filter(emp =>
        emp.id !== shift.assigned &&
        emp.availability.includes(shift.day)
      );

      if (alternatives.length) {
        swaps.push({
          shift: shift.id,
          current: shift.assigned,
          suggested: alternatives[0].id
        });
      }

    });

    return swaps;
  }

}

export default SmartScheduler;