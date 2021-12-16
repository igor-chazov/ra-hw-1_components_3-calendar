/** 
 * @param date
 * @returns *[]
 */

export default function getCalendarWeeks(date) {
  const
    year = date.getFullYear(),
    month = date.getMonth(),
    currDate = date.getDate(),
    monthStartDate = new Date(year, month, 1),
    monthEndDate = new Date(year, month + 1, 0),

    monthStartDay = monthStartDate.getDay(),
    monthEndDay = monthEndDate.getDay(),
    monthDaysCount = monthEndDate.getDate();

  const calendarWeeks = [];

  let start = monthStartDay - 1;
  if (monthStartDay === 0) start = 0;

  for (let i = 1; i <= monthDaysCount;) {
    const calendarWeek = [];
    for (let j = start; j <= 6; j++) {
      if (i <= monthDaysCount) {
        calendarWeek[j] = {
          date: i,
          isOtherMonth: false,
          isCurrDate: i === currDate,
        };
        i += 1;
      }
    }
    start = 0;
    calendarWeeks.push(calendarWeek);
  }

  if (monthEndDay !== 0) {
    for (let i = monthEndDay; i <= 6; i++) {
      calendarWeeks[calendarWeeks.length - 1].push({
        date: i - monthEndDay + 1,
        isOtherMonth: true,
      })
    }
  }

  if (monthStartDay !== 1) {
    const prevMonthDaysCount = new Date(year, month, 0).getDate();
    let start = monthStartDay - 2;
    if (monthStartDay === 0) start = 5;

    for (let i = start; i >= 0; i -= 1) {
      calendarWeeks[0][i] = {
        date: prevMonthDaysCount + (i - start),
        isOtherMonth: true,
      }
    }
  }

  return calendarWeeks;
}