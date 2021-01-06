import { Link, useHistory } from "react-router-dom";

const LogIn = props => {
    const history = useHistory();

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
                // console.log(data);
                let token = data.token;
                localStorage.setItem('authToken', token);
                props.setUsername('');
                props.setPassword('');
                fetch('/users/5fe4f8d3690c0f10332c7695',{
                    headers: {
                        'Authorization': "Bearer " + token
                    }
                })
                    .then(response=>response.json())
                    .then(data=>{
                        console.log(data.user);
                        history.push('/');
                    })
            })
            .catch(err=>console.error(err));
    }

    return(
        <div>
            <Link to='/'>Back</Link>
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

export default LogIn