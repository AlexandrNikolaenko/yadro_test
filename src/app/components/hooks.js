'use client'

import { useState, useEffect } from "react";

export default function useGetData(query, id) {
    let [data, setData] = useState({data: null, isLoad: false, isChecked: false})

    useEffect(() => {
        if (!data.isChecked) {
            async function getData() {
                try {
                    if (localStorage.getItem(`${id}`)) setData({data: JSON.parse(localStorage.getItem(`${id}`)), isLoad: true, isChecked: true});
                    else {
                        let res = await fetch(query, {method: 'GET'});
                        if (res.ok) setData({data: await res.json(), isLoad: true, isChecked: true});
                        else throw new Error(res.status);
                    }
                } catch(e) {
                    console.log(e);
                    setData({...data, isChecked: true});
                }
            }
            getData();
        }
    });

    return data;
}