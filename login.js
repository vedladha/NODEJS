async function login(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    

    const response = await fetch("/auth/api/login", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    if(!response.error) {
        console.log("successfully registered");
    }
    else{
        console.log("ERROR");
    }
}