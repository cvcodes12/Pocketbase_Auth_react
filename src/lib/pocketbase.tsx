import PocketBase from 'pocketbase';
import { string } from 'zod';

type AuthForm = {
    email: string,
    password: string,
    passwordConfirm: string,
    name:string,
}

const url = import.meta.env.VITE_POCKET_URL;

const pb = new PocketBase(url);

export const isUserValid = pb.authStore.isValid; 

export async function login(email: string, password: string){
     await pb.collection("users").authWithPassword(email, password);
    const recordId = pb.authStore.record?.id;
    return recordId;
}

export function signout(){
    pb.authStore.clear();
    

    window.location.reload();
}

export async function signup(data: AuthForm){
    await pb.collection("users").create(data);
    await pb.collection("users").authWithPassword(data.email, data.password);
    const recordId = pb.authStore.record?.id;
    return recordId;


}
export default pb;