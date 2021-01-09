/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const LogIn = props => {
    const history = useHistory();

    useEffect(()=>{
        props.setUsername('');
        props.setPassword('');
    },[])

    function onSubmit(event){
        event.preventDefault();
        fetch('/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": props.username,
                "password": props.password
            })
        })
            .then(response=>response.json())
            .then(data=>{
                console.log(data.status);
                if(data.status===400){
                    console.log('info', data.info)
                    if(data.info && data.info.message) alert(data.info.message);
                    props.setPassword('');
                }
                if(data.status===200){
                    let token = data.token;
                    let user = data.user;
                    console.log('user', data.user)
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('authToken', token);
                    props.setUsername('');
                    props.setPassword('');
                    history.push('/');
                }
                // fetch('/users/5fe4f8d3690c0f10332c7695',{
                //     headers: {
                //         'Authorization': "Bearer " + token
                //     }
                // })
                //     .then(response=>response.json())
                //     .then(data=>{
                //         console.log(data.user);
                //         history.push('/');
                //     })
            })
            .catch(err=>console.error(err));
    }

    if(JSON.parse(localStorage.getItem('currentUser'))){
        return(
            <div>
                <Link to='/'>Back</Link>
                <p>You're already logged in {JSON.parse(localStorage.getItem('currentUser')).username}</p>
            </div>
        )
    }else{
        return(
            <div>
            <h3>Log in</h3>
                <form>
                    <label>Username:
                        <input
                            name='username' 
                            id='username' 
                            type='text' 
                            value={props.username} 
                            onChange={props.onChange}
                        />
                    </label>
                    <label >Password:
                        <input
                            name='password' 
                            id='password' 
                            type='password' 
                            value={props.password} 
                            onChange={props.onChange}
                        />
                    </label>
                    <button onClick={onSubmit} type='submit'>Log In</button>
                </form>
            </div>
        )
    }
}

export default LogIn