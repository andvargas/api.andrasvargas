module.exports = {
  apps: [
    {
      name: "api",
      script: "index.js",
      watch: true,
      out_file: "/var/log/pm2/api/out.log",
      error_file: "/var/log/pm2/api/error.log",
    },
    {
      script: "worker.js",
    },
  ],
  deploy: {
    production: {
      key: "/home/ubuntu/.ssh/id_rsa.pub",
      user: "ubuntu",
      host: ["18.130.87.164"],
      ref: "origin/main",
      repo: "https://github.com/andvargas/api.andrasvargas.git",
      path: "/var/www/api.andrasvargas",
      "post-deploy": "npm install",
    },
  },
};
