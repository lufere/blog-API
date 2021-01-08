/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"

const Signup = props =>{
    useEffect(()=>{
        props.setUsername('');
        props.setPassword('');
    },[])

    function onSubmit(e){
        e.preventDefault();
        fetch('/sign-up',{
            method:'POST',
            headers:{'Content-Type': 'application/json',},
            body: JSON.stringify({
                "username": props.username,
                "password": props.password,
                "creator": true
            })
        })
            .then(response=>response.json())
            .then(data=>console.log(data))
            .catch(err=>console.error(err));
    }

    return(
        <div className='signup'>
        <h3>Sign up</h3>
            <form>
                <label> Username
                    <input type='text' name='username' value={props.username} onChange={props.onChange}></input>
                </label>
                <label> Password
                    <input type='password' name='password' value={props.password} onChange={props.onChange}></input>
                </label>
                <button type='submit' onClick={onSubmit}>Sign up</button>
            </form>
        </div>
    )
}

export default Signup