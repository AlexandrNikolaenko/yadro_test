'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_HOST } from "./host";

export default function Card({data}) {
    let [sumData, setSumData] = useState({data, isCheck: false});

    useEffect(() => {
        if (!sumData.isCheck) {
            if (JSON.stringify(data) != JSON.stringify(localStorage.getItem(data.id)) && localStorage.getItem(data.id)) setSumData({data: localStorage.getItem(data.id), isCheck: true});
            else setSumData({...sumData, isCheck: true});
        }
    });

    console.log((new Date(sumData.data.createdAt)).toLocaleDateString());

    if (sumData.isCheck) {
        return (
            <button className="flex gap-4 rounded-4xl p-4 shadow-xl items-center border-2 border-gray-200 cursor-pointer" onClick={e => {
                e.preventDefault();
                document.getElementById(`card${sumData.data.id}`).click();
                console.log('here');
            }}>
                <Link className="hidden" id={`card${sumData.data.id}`} href={`${APP_HOST}/card/${sumData.data.id}`}/>
                <div className="min-w-50 h-50 rounded-2xl relative overflow-hidden">
                    <Image alt="avatar" src={sumData.data.avatar} fill={true} sizes="200"/>
                </div>
                <div className="flex flex-col gap-2.5 flex-start w-full">
                    <p className="font-bold text-xl">{sumData.data.name}</p>
                    <p className="text-sm">{(new Date(sumData.data.createdAt)).toLocaleDateString()}</p>
                    <p className="text-base">{sumData.data.about}</p>
                </div>
            </button>
        )
    } else return <></>
}