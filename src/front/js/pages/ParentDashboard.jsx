import React, { useContext, useState, useEffect } from "react";
import ParentSideBar from "../component/leftMenuParent/ParentSideBar.jsx";
import styled from "styled-components";
import img from "./../../img/background.jpg";
import { Context } from "../store/appContext.js";

let Content = styled.div`
  background-image: url(${img});
  flex: 1;
  padding: 1rem;
  margin-right: 0.5rem;
  aspect-ratio: 16 / 9;
`;

const ParentDashboard = () => {
  const [activeKey, setActiveKey] = useState("home");
  const { actions } = useContext(Context);
  const [info, setInfo] = useState("");

  const menuItems = [
    {
      key: "main",
      label: "Dashboard",
      icon: <i className="bi bi-speedometer2"></i>,
    },
    {
      key: "profile",
      label: "Profile",
      icon: <i className="bi bi-journal-text"></i>,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <i className="bi bi-journal-text"></i>,
    },
    {
      key: "reports",
      label: "Reports",
      icon: <i className="bi bi-journal-text"></i>,
    },
  ];

  const handleSelect = (key) => {
    setActiveKey(key);
    console.log("Selected:", key); // Aquí puedes manejar la navegación
  };

  useEffect(() => {
    let fetchInfo = async () => {
      const data = await actions.subjectsOperations("GET");
      let body = {
        nombre: "Materia 3",
        grado_id: 1,
        descripcion: "Arroz con pollo",
      };
      await actions.subjectsOperations("POST", body);

      setInfo(data);
    };
    console.log("inicia");
    fetchInfo();
  }, []);

  return (
    <div style={{ display: "flex", paddingTop: "100px" }}>
      <ParentSideBar
        items={menuItems}
        activeKey={activeKey}
        onSelect={handleSelect}
      />
      <Content>
        <h1>{`You selected: ${activeKey}`}</h1>
        <p>
          Este es el contenido principal. Cambia según el menú seleccionado.
          {console.table(info)}
        </p>
      </Content>
    </div>
  );
};

export default ParentDashboard;
