module.exports = {
  apps: [
    {
      name: 'chulfudoc-front',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3100',
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
}