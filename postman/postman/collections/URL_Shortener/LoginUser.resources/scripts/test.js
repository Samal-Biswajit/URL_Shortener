const response = pm.response.json();
if (response.token) {
    pm.environment.set("TOKEN", response.token);
    console.log("Token saved to environment variable TOKEN");
}

