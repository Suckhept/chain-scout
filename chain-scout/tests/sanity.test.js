// Простой smoke‑тест: скрипт должен запускаться и отдавать help без ошибок
import { spawnSync } from 'child_process';
const res = spawnSync('node', ['src/index.js', '--help'], { encoding: 'utf8' });
if (res.status !== 0) {
  console.error('CLI returned non-zero exit code', res.status, res.stderr);
  process.exit(1);
}
if (!res.stdout.includes('chain-scout')) {
  console.error('Help output miss expected text');
  process.exit(1);
}
console.log('tests run ok');
