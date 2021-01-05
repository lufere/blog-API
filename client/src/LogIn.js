
const LogIn = props => {

    function onSubmit(event){
        event.preventDefault();
        console.log('test');
        fetch('/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username":"test",
                "password":"test"
            })
        })
            .then(response=>response.json())
            .then(data=>console.log(data))
    }

    return(
        <div>
            <form>
                <label>Username:
                    <input name='username' id='username' type='text'></input>
                </label>
                <label >Password:
                    <input name='password' id='password' type='password'></input>
                </label>
                <button onClick={onSubmit} type='submit'>Log In</button>
            </form>
        </div>
    )
}

export default LogIn