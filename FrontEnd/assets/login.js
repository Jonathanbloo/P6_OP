    async function loginForm(mail, pass) {
        const dataForm = {
            email: mail,
            password: pass,
        };
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForm),
        });
        const resultLogin = await response.json();
        console.log(resultLogin);
        if (!resultLogin.token) {
            alert('Erreur dans l’identifiant ou le mot de passe');
        } else {
            localStorage.setItem('token', resultLogin.token);
            window.sessionStorage.setItem('loged', 'true');
            window.location.replace("index.html");
        }
    }
    const form = document.getElementById('login__form');
    console.log(form);
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            await loginForm(email, password);
        });
    } else {
        console.error("Element #login__form non trouvé !");
    }

    

