import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Admin() {
    const [loggedIn, setLogin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/token').then(res => {
            if(res.status === 200) {
                setLogin(true);
            }
            else {
                router.push('/login')
            }
        })
    },[])
    if(!loggedIn) {
        return <div></div>
    }
    else {
        return (
            <div>
                <div>
                    <h1>Admin</h1>
                </div>
            </div>
        )
    }
}