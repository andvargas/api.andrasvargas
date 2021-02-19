module.exports = {
    apps: [{
        name: 'api.andrasvargas',
        script: './index.js'
    }],
    deploy: {
        production: {
            user: 'ubuntu',
            host: 'ec2-3-11-204-178.eu-west-2.compute.amazonaws.com',
            key: '~/.ssh/id_rsa.pub',
            ref: 'origin/main',
            repo: 'git@github.com:andvargas/api.andrasvargas.git',
            path: '/home/ubuntu/api.andrasvargas',
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
}