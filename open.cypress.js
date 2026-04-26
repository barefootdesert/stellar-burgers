const { spawn } = require('child_process');
const path = require('path');

const cypressBin = path.join(__dirname, 'node_modules', '.bin', 'cypress');

const child = spawn(cypressBin, ['open'], {
  env: {
    ...process.env,
    ELECTRON_EXTRA_LAUNCH_ARGS: '--disable-gpu --disable-software-rasterizer --disable-gpu-compositing --disable-gpu-sandbox'
  },
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => process.exit(code));
