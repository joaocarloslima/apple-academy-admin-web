"use server"

import { cookies } from "next/headers";
import { apiPost } from "./api";

export async function login(data: { email: string; password: string }) {
    try{
        const response = await apiPost("/login", data)
        const token = response.token;
    
        const cookiesStore = await cookies();
        cookiesStore.set("token", token)
        return true
    }catch (error) {
        return false;
    }
}

