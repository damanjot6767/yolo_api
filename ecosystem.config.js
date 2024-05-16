module.exports = {
    apps: [{
        name: "stmina_api",
        script: "./server.js",
        max_memory_restart: "750M",
        env_production: {
            NODE_ENV: "production"
        },
        env_development: {
            NODE_ENV: "development"
        }
    }]
}
