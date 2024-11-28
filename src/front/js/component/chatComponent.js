// import React, { useContext, useState, useEffect } from "react";
// import { Context } from "../store/appContext";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ChatComponent = ({ userRole, userName, userAvatar }) => {
//     const { store, actions } = useContext(Context);
//     const [subject, setSubject] = useState("");
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         actions.getMessages(); 
//     }, []);

//     const handleSendMessage = () => {
//         if (message.trim() !== "" && subject.trim() !== "") {
//             const newMessage = {
//                 role: userRole,
//                 name: userName,
//                 avatar: userAvatar,
//                 subject,
//                 text: message,
//                 timestamp: new Date().toISOString(),
//             };
//             actions.sendMessage(newMessage);
//             setMessage("");
//             setSubject("");
//         }
//     };

//     return (
//         <div className="card my-3 shadow-sm">
//             <div className="card-header bg-primary text-white">
//                 <h5 className="mb-0">Chat</h5>
//             </div>
//             <div
//                 className="card-body"
//                 style={{ height: "300px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
//             >
//                 {store.mensajes.length > 0 ? (
//                     store.mensajes.map((msg, index) => (
//                         <div key={index} className="mb-3">
//                             <div className="d-flex align-items-start">
//                                 {msg.avatar ? (
//                                     <img
//                                         src={msg.avatar}
//                                         alt={`${msg.name}'s avatar`}
//                                         className="rounded-circle me-2"
//                                         style={{ width: "40px", height: "40px" }}
//                                     />
//                                 ) : (
//                                     <div
//                                         className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-2"
//                                         style={{ width: "40px", height: "40px" }}
//                                     >
//                                         {msg.name[0].toUpperCase()}
//                                     </div>
//                                 )}
//                                 <div>
//                                     <small>
//                                         <strong>{msg.name}</strong> - {msg.role}
//                                     </small>
//                                     <p className="mb-1">
//                                         <strong>Asunto:</strong> {msg.subject}
//                                     </p>
//                                     <p className="mb-1">{msg.text}</p>
//                                     <small className="text-muted">{new Date(msg.timestamp).toLocaleString()}</small>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-muted text-center">No hay mensajes aún.</p>
//                 )}
//             </div>
//             <div className="card-footer">
//                 <div className="mb-2">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Asunto"
//                         value={subject}
//                         onChange={(e) => setSubject(e.target.value)}
//                     />
//                 </div>
//                 <div className="input-group">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Escribe tu mensaje..."
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     />
//                     <button
//                         className="btn btn-primary"
//                         onClick={handleSendMessage}
//                         disabled={message.trim() === "" || subject.trim() === ""}
//                     >
//                         Enviar
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatComponent;


import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/ChatComponent.module.css";

const MensajesFicticios = [
    {
        role: "Docente",
        name: "Juan Pérez",
        avatar: null,
        subject: "Examen de Matemáticas",
        text: "El examen será el próximo lunes.",
        timestamp: new Date().toISOString(),
    },
    {
        role: "Representante",
        name: "María López",
        avatar: null,
        subject: "Consulta",
        text: "¿Podría confirmar el horario del examen?",
        timestamp: new Date().toISOString(),
    },
];

const ChatComponent = ({ userRole, userName, userAvatar }) => {
    const [messages, setMessages] = useState(MensajesFicticios); 
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim() !== "" && subject.trim() !== "") {
            const newMessage = {
                role: userRole,
                name: userName,
                avatar: userAvatar,
                subject,
                text: message,
                timestamp: new Date().toISOString(),
            };
            setMessages([...messages, newMessage]); 
            setMessage("");
            setSubject("");
        }
    };

    return (
        <div className={`${styles.CardChat} card my-3 shadow-sm`} >
            <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">Chat</h5>
            </div>
            <div
                className={`${styles.CardChat} card-body`}
                style={{ height: "200px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
            >
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className="mb-3">
                            <div className="d-flex align-items-start">
                                {msg.avatar ? (
                                    <img
                                        src={msg.avatar}
                                        alt={`${msg.name}'s avatar`}
                                        className="rounded-circle me-2"
                                        style={{ width: "40px", height: "40px" }}
                                    />
                                ) : (
                                    <div
                                        className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-2"
                                        style={{ width: "40px", height: "40px" }}
                                    >
                                        {msg.name[0].toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <small>
                                        <strong>{msg.name}</strong> - {msg.role}
                                    </small>
                                    <p className="mb-1">
                                        <strong>Asunto:</strong> {msg.subject}
                                    </p>
                                    <p className="mb-1">{msg.text}</p>
                                    <small className="text-muted">
                                        {new Date(msg.timestamp).toLocaleString()}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted text-center">No hay mensajes aún.</p>
                )}
            </div>
            <div className="card-footer">
                <div className="mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Asunto"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Escribe tu mensaje..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className="btn btn-secondary"
                        onClick={handleSendMessage}
                        disabled={message.trim() === "" || subject.trim() === ""}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
