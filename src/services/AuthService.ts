import axios, { AxiosError } from "axios"
import { toast } from "sonner"

const baseUrl = "http://localhost:5000/api/auth"

interface AuthResponse {
    message?: string; 
  }


export const loginAPI = async (email: string, password: string) => {
    try{
        const res = await axios.post<AuthResponse>(baseUrl + "/login", 
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
        const res = await axios.post(baseUrl + "/register", 
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