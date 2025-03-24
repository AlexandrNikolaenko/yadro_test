'use server'

import Card from "./components/userCards";
import { API_HOST } from "./components/host";

export default async function Home() {
  try {
    let res = await fetch(`${API_HOST}/users`, {method: 'GET'});
    if (res.ok) {
      return (
        <ul className="flex flex-col-reverse gap-8 max-w-4xl w-full mx-auto py-12 px-4">
          {(await res.json()).map(user => <Card data={user} key={user.id}/>)}
        </ul>
      );
    } else throw new Error(res.status);
  } catch (e) {
    console.log(e);
    return (
      <></>
    )
  }

  
}
