import React from "react";
import styled from "styled-components";
import Calendario from "./Calendario.jsx";
import BoxDisplay from "./BoxDisplay.jsx";
import GaugeChart from "./GaugeChart.jsx";
const Wrapper = styled.div`
  margin: 0 auto;
  min-height: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.9px);
  -webkit-backdrop-filter: blur(0.9px);
`;
const eventos = [
  { date: "2024-11-12", title: "Evento de prueba", holiday: false },
  { date: "2024-11-23", title: "Evento de prueba", holiday: true },
  { date: "2024-11-26", title: "Otro evento", holiday: false },
];
const MainDashboard = () => {
  return (
    <Wrapper className="container-fluid">
      <div className="row d-flex">
        <div className="col-md-8 col-sm-12 ">
          <Calendario eventos={eventos} />
        </div>
        <div className="col-md-4 col-sm-12 ">
          <BoxDisplay>
            <h2 className="text-center mt-0">Promedio del estudiante</h2>
            <GaugeChart max={20} />
            <h5 className="text-center mb-2">Nombre estudiante</h5>
          </BoxDisplay>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <BoxDisplay width={"100%"} aspect="16/9"></BoxDisplay>
        </div>
      </div>
    </Wrapper>
  );
};

export default MainDashboard;
