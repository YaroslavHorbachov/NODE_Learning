module.exports = {
    apps: [{
        name: "Node_App",
        script: "./index.js",
        env: {
            "NODE_ENV": "development",
        },
        env_production: {
            "NODE_ENV": "production"
        }
    }
]}
