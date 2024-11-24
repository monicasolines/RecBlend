import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../styles/Calendar.css";
const HandleChange = value =>
  alert(`New date is: ${value.toLocaleDateString()}`);

const Calendario = ({ eventos }) => {
  const [value, onChange] = useState(new Date());

  const tileClassName = ({ date, view }) => {
    // Asegúrate de que estamos en la vista mensual
    if (view === "month") {
      // Formateamos la fecha para comparar
      const formattedDate = date.toISOString().split("T")[0];

      // Filtra los eventos que coinciden con la fecha actual
      const matchingEvents = eventos.filter(
        evento => evento.date === formattedDate
      );

      if (matchingEvents.length > 0) {
        // Si hay algún evento marcado como feriado
        if (matchingEvents.some(evento => evento.holiday)) {
          return "highlight-holiday"; // Clase CSS para feriados
        }
        return "highlight"; // Clase CSS para eventos regulares
      }
    }
    return null; // Ninguna clase si no hay eventos
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        tileClassName={tileClassName}
        value={value}
      />
    </div>
  );
};

export default Calendario;
