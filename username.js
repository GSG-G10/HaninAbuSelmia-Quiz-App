const username = document.getElementById('username');
const saveUserNameBtn = document.getElementById('saveUserNameBtn');

username.addEventListener('keyup', () => {
    if(username.value){
        saveUserNameBtn.disabled = false;
    } else{
        alert("sorry, you can't start quiz without enter your name")
    }
    
});

saveUserName = (e) => {
    e.preventDefault();

    localStorage.setItem('username', username.value);
    window.location.assign('question.html');
};