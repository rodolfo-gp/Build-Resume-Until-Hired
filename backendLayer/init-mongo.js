db.createUser({
    user: "adminuser",
    pwd: "adminpassword",
    roles: [
        {
            role: "root",
            db: "admin"
        }
    ]
});
