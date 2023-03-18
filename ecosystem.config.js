module.exports = {
  apps: [
    {
      name: "api",
      script: "index.js",
      out_file: "/var/log/pm2/api/out.log",
      error_file: "/var/log/pm2/api/error.log",
    },
    {
      script: "worker.js",
    },
  ],
  deploy: {
    production: {
      key: "/home/andras/.ssh/id_ed25519",
      user: "andras",
      host: ["18.130.87.164"],
      ref: "origin/main",
      repo: "https://github.com/andvargas/api.andrasvargas.git",
      path: "/var/www/api.andrasvargas",
      "post-deploy": "npm install",
    },
  },
};
