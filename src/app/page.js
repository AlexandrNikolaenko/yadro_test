'use server'

import Card from "./components/userCards";

export default async function Home() {
  try {
    let res = await fetch('https://67dc4306e00db03c406778bd.mockapi.io/api/users', {method: 'GET'});
    if (res.ok) {
      return (
        <ul>
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
