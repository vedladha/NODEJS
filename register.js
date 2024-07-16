async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const response = await fetch("/auth/api/register", {
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
        showToast();
    }
    else{
        console.log("ERROR");
    }
}

function showToast(){
    let toast = document.createElement('div');
    let toastBox = document.getElementById('toast-box');
    toast.classList.add('toast');
    toast.innerHTML = 'success';
    toastBox.appendChild(toast);
    setTimeout(()=>{
        toast.remove();
    }, 5000)

  }