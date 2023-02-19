module.exports = {
  apps: [
    {
      name: "api",
      script: "./index.js",
      restart_delay: 1000,
      out_file: "/var/log/pm2/api/out.log",
      error_file: "/var/log/pm2/api/error.log",
    },
  ],
  deploy: {
    production: {
      user: "andras",
      host: ["31.24.230.163"],
      ref: "origin/main",
      repo: "https://github.com/andvargas/api.andrasvargas.git",
      path: "/var/www/api/current",
      "post-deploy": "npm install",
    },
  },
};
