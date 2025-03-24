'use client'

import useGetData from "@/app/components/hooks";
import { API_HOST, APP_HOST } from "@/app/components/host";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Page() {
    let path = usePathname().split('/');
    let id = path[path.length - 1];
    let data = useGetData(`${API_HOST}/users/${id}`, id);
    let [error, setError] = useState(null);

    function save(e) {
        e.preventDefault();
        if (document.getElementById('name').value.length >= 250) {
            setError('Username must be shorter than 250 symbols');
            return
        }
        if (document.getElementById('about').value.length <= 100) {
            setError('Description must be longer than 100 symbols');
            return
        }
        localStorage.setItem(`${id}`, JSON.stringify({...data.data, ...Object.fromEntries(new FormData(e.target))}));
        console.log(localStorage.getItem(`${id}`));
        redirect(`${APP_HOST}/`, 'replace');
    }

    if (data.isLoad) {
        return (
            <form className="max-w-4xl px-5 py-12 min-h-screen w-full flex flex-col gap-10 items-center mx-auto" onSubmit={save}>
                {
                    error &&
                    <label className="text-xl text-red-500">{error}</label>
                }
                <InputField placeholder={'Change username'} name={'name'} label={'Put in field the new username'} defaulValue={data.data.name}/>
                <InputField placeholder={'Write new description'} name={'about'} label={'Put in field new "about" description for user'} defaulValue={data.data.about}/>
                <button className="cursor-pointer py-3 px-5 rounded-full shadow-md text-base flex items-center gap-2.5 border-gray-200 border-2">Save changes</button>
            </form>
        )
    }
    
    return(
        <>
        </>
    )
}

function InputField({placeholder, name, label, defaulValue}) {
    return (
        <>
            <label htmlFor={name} className="text-xl">{label}</label>
            <input placeholder={placeholder} name={name} id={name} defaultValue={defaulValue} className="w-full outline-none px-5 py-3 rounded-full placeholder:text-base border-2 border-gray-200"/>
        </>
    )
}