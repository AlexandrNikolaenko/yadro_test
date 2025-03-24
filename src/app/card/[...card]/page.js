'use client'

import { API_HOST } from "@/app/components/host";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
    let path = usePathname().split('/');
    let id = path[path.length - 1];
    console.log(id)
    let [data, setData] = useState({data: null, isLoad: false, isChecked: false})

    useEffect(() => {
        if (!data.isChecked) {
            async function getData() {
                try {
                    if (localStorage.getItem(id)) setData({data: localStorage.getItem(id), isLoad: true, isChecked: true});
                    else {
                        let res = await fetch(`${API_HOST}/users/${id}`, {method: 'GET'});
                        if (res.ok) setData({data: await res.json(), isLoad: true, isChecked: true});
                        else throw new Error(res.status);
                    }
                } catch(e) {
                    console.log(e);
                    setData({...data, isChecked: true})
                }
            }
            getData();
        }
    })

    if (data.isLoad) {
        return (
            <div className="max-w-4xl px-5 py-12 min-h-screen w-full flex flex-col gap-10 items-center mx-auto">
                <div className="min-w-50 max-w-50 h-50 rounded-2xl relative overflow-hidden">
                    <Image alt="avatar" src={data.data.avatar} fill={true} sizes="200"/>
                </div>
                <div className="flex flex-col gap-2.5 flex-start w-full">
                    <p className="font-bold text-xl">{data.data.name}</p>
                    <p className="text-sm">{(new Date(data.data.createdAt)).toLocaleDateString()}</p>
                    <p className="text-base">{data.data.about}</p>
                </div>
            </div>
        )
    }

    return (
        <>
        </>
    )
}