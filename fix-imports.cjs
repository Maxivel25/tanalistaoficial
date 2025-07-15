const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src');

function fixFileImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  const fixed = content
    .replace(/(['"])\.\/\.\.\//g, '$1../') // transforma "./../" em "../"
    .replace(/(['"])\/+\.\.\//g, '$1../')  // transforma "/../" em "../"
    .replace(/(['"])\/+components\//g, '$1components/') // tira barras a mais
    .replace(/(['"])components\//g, '$1../components/'); // normaliza para ../components/

  fs.writeFileSync(filePath, fixed, 'utf-8');
  console.log(`✅ Corrigido: ${filePath}`);
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.jsx')) {
      fixFileImports(fullPath);
    }
  });
}

walk(baseDir);
