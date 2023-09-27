const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      users: [],
      newUser: {
        id: "",
        name: "",
        lastname: "",
        email: "",
        password: "",
        rep_password: "",
        region: "",
      },
      url: "http://localhost:3001",
      currentUser: null,
      // message: null,
      // newBook: {
      //   id: "",
      //   title: "",
      //   author: "",
      //   cathegory: "",
      //   number_of_pages: "",
      //   description: "",
      //   type: "",
      //   price: "",
      //   photo: "",
      // },
      // showBook: [],
      // oneBook: [],
      message: {
        message: "",
        user_from_id: "",
        user_to_id: "",
      },
      user: [],
    },

    actions: {
      //---------< funcion para  registro  de usuario >------------------------->
      handleChangeRegister: (e) => {
        const { newUser } = getStore();
        e.preventDefault();
        newUser[e.target.name] = e.target.value;
        setStore({ newUser });
        console.log("newUser:", getStore().newUser);
      },
      submitRegister: (e, navigate) => {
        e.preventDefault();
        if (getStore().newUser.password === getStore().newUser.rep_password) {
          getActions().saveUser(navigate);
        } else {
          alert("las contraseñas no coinciden");
        }
      },

      saveUser: async (navigate) => {
        try {
          const { url, newUser } = getStore();
          const response = await fetch(`${url}/api/register`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          console.log("data", data);
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
      },
      //----------< Login usuario >-------------------------------------------------------->
      //-----< funcion para  login  de usuario >------------------------------------------->
      handleSubmitLogin: async (e, navigate) => {
        e.preventDefault();
        try {
          const { url, email, password, currentUser } = getStore();
          let info = { email, password, currentUser };
          const response = await fetch(`${url}/api/login`, {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          const data = await response.json();
          console.log(data);

          if (data.access_token) {
            setStore({ currentUser: data });
            sessionStorage.setItem("currentUser", JSON.stringify(data));
            console.log("currentUser", currentUser);
            navigate("/profile");
          } else {
            setStore({
              alert: {
                text: "Usuario no registrado",
                show: true,
                textbtn: "Registrarme",
              },
            });
          }
        } catch (error) {
          console.log(error);
          console.log("hay un error en el login");
        }
      },
      handleChangeLogin: (e) => {
        setStore({
          [e.target.name]: e.target.value,
        });
      },
      checkUser: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: JSON.parse(sessionStorage.getItem("currentUser")),
          });
        }
      },
      logout: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: null,
          });
          sessionStorage.removeItem("currentUser");
        }
        navigate("/");
      },

      // //------------josé--------------------------
      // handleChangeBook: (e) => {
      //   const { newBook } = getStore();
      //   e.preventDefault();
      //   newBook[e.target.name] = e.target.value;
      //   setStore({ newBook });
      //   console.log("newBook:", getStore().newBook);
      // },
      // ////FUNC. PARA GUARDAR LIBRO
      // saveBook: async (navigate) => {
      //   try {
      //     const { url, newBook } = getStore();
      //     const response = await fetch(`${url}/api/registerBook`, {
      //       method: "POST",
      //       body: JSON.stringify(newBook),
      //       headers: { "Content-Type": "application/json" },
      //     });
      //     const data = await response.json();
      //     console.log("data", data);
      //     navigate("/");
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
      // ////FUNC. ENVIAR REGISTRO
      // submitBook: (e, navigate) => {
      //   e.preventDefault();
      //   getActions().saveBook(navigate);
      // },
      // ////FUNC LISTA DE LIBROS
      // getLibros: () => {
      //   var requestOptions = {
      //     method: "GET",
      //     redirect: "follow",
      //   };

      //   fetch("http://localhost:3001/api/libroVenta", requestOptions)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       getStore().showBook = data;
      //       console.log("conseguí los libros");
      //       console.log("showBook:", data);
      //     })
      //     .catch((error) => console.log("error", error));
      // },

      // ////FUNC DETALLE UN LIBRO
      // getOneBook: () => {
      //   var requestOptions = {
      //     method: "GET",
      //     redirect: "follow",
      //   };

      //   fetch(`http://localhost:3001/api/detalle-libro/${id}`, requestOptions)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       getStore().oneBook = data;
      //       console.log("conseguí el libro");
      //       console.log("oneBook:", data);
      //     })
      //     .catch((error) => console.log("error", error));
      // },

      //-----< mensages >--------------------->

      //-----< enviar mensaje >--------------->

      handleChangeMessage: (e) => {
        const { message } = getStore();
        e.preventDefault();
        const updatedMessage = { ...message };
        updatedMessage[e.target.name] = e.target.value;
        // message[e.target.name] = e.target.value;
        setStore({ message: updatedMessage });
        console.log("newMessage:", getStore().message);
      },
      //*************************************************************** */
      handleSubmitMessage: (e, navigate) => {
        const { message } = getStore();
        e.preventDefault();
        console.log("variable", message);

        getActions().saveMessage(navigate);
      },
      saveMessage: async (navigate) => {
        try {
          const { url, message } = getStore();
          const response = await fetch(`${url}/api/messages`, {
            method: "POST",
            body: JSON.stringify(message),
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          console.log("data", data);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
