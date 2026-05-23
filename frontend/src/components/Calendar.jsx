import "./Calendar.css";

function Calendar() {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const todayDate = today.getDate();

  const countDay = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const prevLast = new Date(year, month, 0).getDate();

  let Days = [];
  for (let i = firstDay; i > 0; i--) {
    Days.push({
      day: prevLast - i + 1,
      type: "prev",
    });
  }
  for (let i = 1; i <= countDay; i++) {
    Days.push({
      day: i,
      type: "current",
    });
  }
  for (let i = 1; Days.length < 42; i++) {
    Days.push({
      day: i,
      type: "next",
    });
  }

  return (
    <table>
      <tbody>
        <tr className="month">
          <td colSpan="7">{month + 1}月</td>
        </tr>
        <tr className="week">
          <td>日</td>
          <td>月</td>
          <td>火</td>
          <td>水</td>
          <td>木</td>
          <td>金</td>
          <td>土</td>
        </tr>
        {[...Array(6)].map((_, i) => (
          <tr key={i} className="day">
            {[...Array(7)].map((_, j) => (
              <td
                key={j}
                className={`
                day ${Days[i * 7 + j].type} 
                ${Days[i * 7 + j].day === todayDate && Days[i * 7 + j].type === "current" ? "today" : ""}
                `}
              >
                {Days[i * 7 + j].day}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Calendar;
