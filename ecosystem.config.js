module.exports = {
  apps: [
    {
      name: "api",
      script: "index.js",
      exp_backoff_restart_delay: 100,
      watch: true,
      out_file: "/var/log/pm2/api/out.log",
      error_file: "/var/log/pm2/api/error.log",
    },
  ],
  deploy: {
    production: {
      key: "~/.ssh/andrasvargas.pem",
      user: "ubuntu",
      host: ["18.130.87.164"],
      ref: "origin/main",
      repo: "https://github.com/andvargas/api.andrasvargas.git",
      path: "/var/www/api.andrasvargas",
      "post-deploy": "npm install",
    },
  },
};
