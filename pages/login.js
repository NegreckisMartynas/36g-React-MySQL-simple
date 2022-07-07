import { redirect } from "next/dist/server/api-utils";

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <form method="post" action="/api/login" onSubmit={loginSubmit}>
                <div>
                    <label htmlFor="login-email">E-mail: </label>
                    <input id="login-email" type="email" name="email"/>
                </div>
                <div>
                    <label htmlFor="login-password">Password: </label>
                    <input id="login-password" type="password" name="password"/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}


function loginSubmit(event) {
    event.preventDefault();
    const formData = {};
    new FormData(event.target).forEach((value, key) => formData[key] = value);
    console.log(formData);
    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(formData)
    }).then(async res => { //login success - 200; fail - 400
        if(res.status === 200) {
            const body = await res.json();
            document.cookie = `accessToken=${body.token}`;//set cookies
            window.location.href = '/admin';
        } else {
            alert('Invalid username or password');
        }
    });
}