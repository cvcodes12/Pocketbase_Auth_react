import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { signup } from "../lib/pocketbase";
import { useState } from "react";


type AuthForm = {
    email: string,
    password: string,
    passwordConfirm: string,
    name:string,
}

const schema = zod.object({
    name: zod.string().min(1, 'Username is required'),
    email: zod.string().email('Invalid email address').min(1, 'Email is required'),
    password: zod.string().min(8, 'Password must be atleast 8 characters long').nonempty('Password is required'),
    passwordConfirm: zod.string().nonempty('Confirm Password is required'),
}).refine(data => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
});


const resolver = zodResolver(schema);



export default function Signup() {
    const { register, handleSubmit, formState: { errors } ,reset} = useForm<AuthForm>({
        resolver,
        });    
    const navigate = useNavigate();
        const [signupError, setSignupError] = useState<string | null>(null);
    
        const onSubmit: SubmitHandler<AuthForm> = (data) =>{ 
            console.log(data)
            signup(data).then((recordId)=>{
                navigate(`/dashboard/${recordId}`);
            }).catch((error)=>{
                console.error(error);
                setSignupError("Error creating account");

            });
        }

    return(
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h1 className="text-center font-bold text-lg">Sign Up</h1>
                <form className="flex flex-col p-4 gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Username</label>
                    <input type="text" placeholder="Username" className="input input-bordered" {...register('name')}/>
                    {errors.name && <p className='text-sm text-red-500'>{errors.name.message as string}</p>}

                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Email" className="input input-bordered" {...register('email')}/>
                    {errors.email && <p className='text-sm text-red-500'>{errors.email.message as string}</p>}

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" className="input input-bordered" {...register('password')}/>
                    {errors.password && <p className='text-sm text-red-500 '>{errors.password.message as string}</p>}
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" type="password" className="input input-bordered" {...register('passwordConfirm')}/>
                    {errors.passwordConfirm && <p className='text-sm text-red-500 '>{errors.passwordConfirm.message as string}</p>}
                    {signupError && <p className='text-sm text-red-500'>{signupError}</p>}

                    <button className="btn btn-neutral my-4">Sign Up</button>
                    <p>Already have an account? <Link to='/login' className="link">Login account</Link></p>
                </form>
            </div>

        </div>
    )
}
