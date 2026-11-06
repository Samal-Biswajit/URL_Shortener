const response = pm.response.json();
if (response.id) {
    pm.environment.set("URL_ID", response.id);
    console.log("URL ID saved to environment variable URL_ID");
}

