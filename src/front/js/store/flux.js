const baseUrl = process.env.BACKEND_URL + "/api"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			profesores: [],
			grados: [],
			materias: []
		},
		actions: {






			// Operaciones CRUD para crear, editar y eliminar profesores

			getTeachers: async () => {
				const response = await fetch(baseUrl + "/admin/teachers")
				try {
					if (!response.ok) throw Error(response.statusText)
					return false

					const data = await response.json()
					setStore({ profesores: data })
				} catch (error) {
					console.error("Error", error)
					return false
				}
			},

			updateTeacher: async (id) => {
				const token = localStorage.getItem("token");
				try {
					const updateTeacher = await fetch(baseUrl + "/admin/teacher/" + id, {
						method: "PUT",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						}
					})

					if (!updateTeacher.ok) throw Error(updateTeacher.statusText)
					setStore({ profesores: data })

				} catch (error) {
					console.error("Error", error)
				}
			},

			postTeacher: async (teacherData) => {
				const token = localStorage.getItem("token");
				try {
					const createTeacher = await fetch(baseUrl + "/admin/teacher", {
						method: "POST",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify(teacherData)
					})

					if (!createTeacher.ok) throw Error(createTeacher.statusText)
					setStore({ profesores: data })

				} catch (error) {
					console.error("Error", error)
				}
			},

			// Operaciones CRUD para traer y crear grados

			getCourses: async () => {
				const response = await fetch(baseUrl + "/admin/grados")
				try {
					if (!response.ok) throw Error(response.statusText)
					return false

					const data = await response.json()
					setStore({ grados: data })
				} catch (error) {
					console.error("Error", error)
					return false
				}
			},

			postCourses: async (gradoData) => {
				const token = localStorage.getItem("token");
				try {
					const createCourse = await fetch(baseUrl + "/admin/grados", {
						method: "POST",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify(gradoData)
					})

					if (!createCourse.ok) throw Error(createCourse.statusText)
					//setStore({ grados: data })

				} catch (error) {
					console.error("Error", error)
				}
			},

			// Operaciones CRUD para crear materias
			createSubject: async (subjectData) => {
				const response = await fetch(baseUrl + "/admin/materias")
				try {
					if (!response.ok) {
						const createSubject = await fetch(baseUrl + "/admin/materias", {
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({ subjectData })
						})
						const data = await response.json()
						setStore({ materias: data })
					}
				} catch (error) {
					console.error("Error", error)
				}
			}
		}
	};
};

export default getState;
