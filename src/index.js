#!/usr/bin/env node
// Minimal CLI without dependencies
const fs = await import('fs');
const path = await import('path');
const args = process.argv.slice(2);

function help() {
  console.log(`
chain-scout — минимальный CLI
Использование:
  chain-scout --help
  chain-scout --version
  chain-scout --version
  chain-scout greet --name NAME
  chain-scout analyze ./file.json
`);
}

function greet(name) {
  console.log(`Hello, ${name || 'world'}!`);
}

function analyze(file) {
  if (!file) {
    console.error('Укажите путь к JSON файлу: chain-scout analyze ./file.json');
    process.exit(1);
  }
  const p = path.resolve(process.cwd(), file);
  if (!fs.existsSync(p)) {
    console.error('Файл не найден:', p);
    process.exit(1);
  }
  const raw = fs.readFileSync(p, 'utf8');
  try {
    const data = JSON.parse(raw);
    const keys = Object.keys(data);
    console.log('OK: JSON распознан. Ключи:', keys.join(', ') || '(пусто)');
  } catch (e) {
    console.error('Ошибка парсинга JSON:', e.message);
    process.exit(1);
  }
}

if (args.includes('--help') || args.length === 0) {
  help();
  process.exit(0);
}
if (args.includes('--version')) {
  console.log('0.1.0');
  process.exit(0);
}

const cmd = args[0];
if (cmd === 'greet') {
  const nameFlagIdx = args.findIndex(a => a === '--name');
  const name = nameFlagIdx !== -1 ? args[nameFlagIdx + 1] : undefined;
  greet(name);
} else if (cmd === 'analyze') {
  analyze(args[1]);
} else {
  console.error('Неизвестная команда:', cmd);
  help();
  process.exit(1);
}
