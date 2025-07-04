const { spawn } = require('child_process');
const path = require('path');

class CalculatorBridge {
  constructor() {
    const root = path.resolve(__dirname, '../../java-backend-operations');
    const javaSrc = path.join(root, 'src');
    const gsonJar = path.join(root, 'libs', 'gson-2.10.1.jar');

    const classpath = `${javaSrc}${path.delimiter}${gsonJar}${path.delimiter}`;

    this.proc = spawn('java', ['-cp', classpath, 'Main']);

    this.queue = [];

    this.proc.stdout.on('data', (data) => {
      const result = JSON.parse(data.toString().trim());
      const queued = this.queue.shift();
      if (queued && typeof queued.resolve === 'function') {
        queued.resolve(result);
      } else {
        console.warn('[CalculatorBridge] Received data but no pending request in queue:', result);
      }
    });

    this.proc.stderr.on('data', (err) => {
      console.error('[JAVA STDERR]', err.toString());
    });

    this.proc.on('exit', (code) => {
      console.log(`[JAVA PROCESS EXITED] code: ${code}`);
    });
  }

  calculate(payload) {
    return new Promise((resolve, reject) => {
      this.queue.push({ resolve, reject });
      this.proc.stdin.write(JSON.stringify(payload) + '\n');
    });
  }
}

module.exports = new CalculatorBridge();