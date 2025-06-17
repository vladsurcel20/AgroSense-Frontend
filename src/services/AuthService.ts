import axios, { AxiosError } from "axios"
import { toast } from "sonner"

interface AuthResponse {
    message?: string; 
    user?: any
  }

export const loginAPI = async (email: string, password: string) => {
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, 
            {email, password},
            { 
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }

        )
        return res;
        
    } catch (error) {
        const err = error as AxiosError<AuthResponse>;
        if(err.response?.data?.message){
          toast.error(err.response.data.message);
        } else {
          console.log(`Error: ${err.message}`);          
        }
    }

}

export const registerAPI = async (firstName: string, lastName: string, email: string, password: string) => {
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, 
            {firstName, lastName, email, password},
            { 
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
        return res
    } catch (error) {
        const err= error as AxiosError<AuthResponse>;
        if(err.response?.data?.message){
          toast.error(err.response.data.message);
        } else {
          console.log(`Error: ${err.message}`);          
        }
    }

}

export const logoutAPI = async () => {
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, {withCredentials: true})
        if(res){
            toast.success(res.data.message)
        }
    } catch (error: AxiosError | any) {
        console.error("Logout failed:", error); 
    }
}


export const checkAuthAPI = async () => {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {withCredentials: true})
        if(res.status === 401){
            toast.error(res.data.message)
        }
        return res
    } catch (error: AxiosError | any) {
        if(error.response?.data?.message && error.response.status !== 500){
            toast.error(error.response.data.message);
        } else {
            console.error("Error fetching account informations", error); 
        }
    }
}