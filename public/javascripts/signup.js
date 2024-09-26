alert('welcome')
const signup_form = document.querySelector("#signup-form");

signup_form.addEventListener('submit', async evt =>{
    evt.preventDefault();
    const email = signup_form['email'].value;
    const password1 = signup_form['password1'].value;
    const password2 = signup_form['password2'].value;

    if(email.length < 6){
        alert("Email length must be extensive");
        return
    }
    if(password1 != password2){
        alert("both password must be the same... ");
        signup_form["password1"].style.borderBottom = "5px solid red"
        signup_form['password1'].style.borderBottom = '5px solid red';

        setTimeout(() =>{
            signup_form["password1"].style.borderBottom = "1px solid royalblue"
            signup_form["password2"].style.borderBottom = "1px solid royalblue"
        }, 3000)
        return
    }
    try{
        const response = await fetch ('/user-api/signup', {
            'method' : 'post', 
            'headers': {
                'Content-Type':'application/json'
            },
            'body' : JSON.stringify({
                'email' : email,
                'password1' : password1,
                'password2' : password2
            })
        })
        if(response.ok){
            let data = await response.json();
            alert(data.message);
            alert('redirecting you to login')
        }else{
            const error = await response.json();
            alert("Signup not successful")
            alert(error.message)
        }
    }catch(error){
        console.log(error.message);
        alert(error.message)
    }
})