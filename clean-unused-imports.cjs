const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const baseDir = path.join(__dirname, 'src');

function cleanImports(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');

  let ast;
  try {
    ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
    });
  } catch (e) {
    console.warn(`⚠️ Erro ao analisar: ${filePath}`);
    return;
  }

  const usedIdentifiers = new Set();
  const importedSpecifiers = new Map(); // Map<localName, fullImportLine>

  traverse(ast, {
    ImportDeclaration(path) {
      const importLine = path.node;
      importLine.specifiers.forEach((specifier) => {
        const localName = specifier.local.name;
        importedSpecifiers.set(localName, path.toString());
      });
    },
    Identifier(path) {
      usedIdentifiers.add(path.node.name);
    },
  });

  const lines = code.split('\n');
  const filteredLines = lines.filter((line) => {
    if (!line.trim().startsWith('import')) return true;

    for (const [localName, importLine] of importedSpecifiers.entries()) {
      if (line.includes(localName) && !usedIdentifiers.has(localName)) {
        return false; // Remove essa linha
      }
    }

    return true;
  });

  const cleaned = filteredLines.join('\n');
  fs.writeFileSync(filePath, cleaned, 'utf-8');
  console.log(`✂️ Limpou imports não usados em: ${filePath}`);
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.jsx')) {
      cleanImports(fullPath);
    }
  });
}

walk(baseDir);
