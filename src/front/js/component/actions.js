export const register = async (dataForm) => {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        });
        const result = await response.json();
        if (response.ok) {
            return result; 
        } else {
            console.error('Error en el registro:', result);
            return false;
        }
    } catch (error) {
        console.error('Error en la solicitud de registro:', error);
        return false;
    }
};









export const loginUser = async (dataForm) => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataForm),
        });

        const result = await response.json();
        
        if (response.ok) {

            localStorage.setItem('token', result.token);

            return {
                success: true,
                user: result.user,
            };
        } else {
            return {
                success: false,
                message: result.msg,
            };
        }
    } catch (error) {
        console.error('Error en loginUser:', error);
        return {
            success: false,
            message: 'Error en la solicitud de inicio de sesión. Inténtalo de nuevo.',
        };
    }
};