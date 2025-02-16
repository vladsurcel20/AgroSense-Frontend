import axios, { AxiosError } from "axios"

const baseUrl = "http://localhost:5173/api/auth"

interface AuthResponse {
    token: string
}


export const loginAPI = async (email: string, password: string) => {
    try{
        const res = await axios.post<AuthResponse>(baseUrl + "/login", 
            {email, password},
            { headers: { 'Content-Type': 'application/json' }}
        )
        return res
    } catch (error) {
        const err= error as AxiosError ;
        if(err.response?.data){
          alert(err.response.data);
        } else {
          console.log(`Error: ${err.message}`);          
        }
    }

}

export const registerAPI = async (firstName: string, lastName: string, email: string, password: string) => {
    try{
        const res = await axios.post(baseUrl + "/register", 
            {firstName, lastName, email, password},
            { headers: { 'Content-Type': 'application/json' }}
        )
        return res
    } catch (error) {
        const err= error as AxiosError ;
        if(err.response?.data){
          alert(err.response.data);
        } else {
          console.log(`Error: ${err.message}`);          
        }
    }

}