"use server"

import { cookies } from "next/headers";
import { apiPost } from "./api";
import { redirect } from "next/navigation";

export async function login(data: { email: string; password: string }) {
    try{
        const response = await apiPost("/login", data)
    
        const cookiesStore = await cookies();
        cookiesStore.set("token", response.token)
        cookiesStore.set("name", response.name)
        cookiesStore.set("email", response.email)
        cookiesStore.set("avatarPath", response.avatarPath || `https://avatar.iran.liara.run/username?username=${response.name}`)
        cookiesStore.set("id", response.id)
        return true
    }catch (error) {
        return false;
    }
}

export async function logout(){
    const cookiesStore = await cookies();
    cookiesStore.delete("token")
    cookiesStore.delete("name")
    cookiesStore.delete("email")
    cookiesStore.delete("avatarPath")
    cookiesStore.delete("id")

    redirect("/")
}

