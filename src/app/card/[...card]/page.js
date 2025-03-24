'use client'

import { API_HOST, APP_HOST } from "@/app/components/host";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useGetData from "@/app/components/hooks";

export default function Page() {
    let path = usePathname().split('/');
    let id = path[path.length - 1];
    let data = useGetData(`${API_HOST}/users/${id}`, id);

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
                <Link href={`${APP_HOST}/edit/${id}`} className="py-3 px-5 rounded-full shadow-md text-base flex items-center gap-2.5 border-gray-200 border-2"><Image alt="edit" width={20} height={20} src={'/Edit.svg'}/><span className="text-inherit">Edit</span></Link>
            </div>
        )
    }

    return (
        <>
        </>
    )
}