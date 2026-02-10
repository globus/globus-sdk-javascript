/**
 * Script to update all service methods to support the new configuration object pattern
 * with backward compatibility.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const SERVICES_DIR = path.join(__dirname, '../src/services');

// Pattern to match service method exports
const SERVICE_METHOD_PATTERN = /export const (\w+) = function \(([\s\S]*?)\): Promise</g;

function updateServiceFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if already has the necessary imports
  const hasNormalizeImport = content.includes('normalizeServiceMethodArgs');
  const hasNormalizeWithSegmentsImport = content.includes('normalizeServiceMethodArgsWithSegments');

  // Add imports if needed
  if (!hasNormalizeImport || !hasNormalizeWithSegmentsImport) {
    // Find the serviceRequest import line
    const importMatch = content.match(
      /import \{([^}]+)\} from ['"]\.\.\/\.\.\/shared\.js['"];/
    );

    if (importMatch) {
      const imports = importMatch[1].split(',').map(s => s.trim());

      if (!hasNormalizeImport && !imports.includes('normalizeServiceMethodArgs')) {
        imports.push('normalizeServiceMethodArgs');
        modified = true;
      }

      if (!hasNormalizeWithSegmentsImport && !imports.includes('normalizeServiceMethodArgsWithSegments')) {
        imports.push('normalizeServiceMethodArgsWithSegments');
        modified = true;
      }

      if (modified) {
        const newImport = `import {\n  ${imports.join(',\n  ')},\n} from '../../shared.js';`;
        content = content.replace(importMatch[0], newImport);
      }
    }
  }

  // Find all service method functions
  const methodMatches = [...content.matchAll(SERVICE_METHOD_PATTERN)];

  for (const match of methodMatches) {
    const methodName = match[1];
    const params = match[2].trim();

    // Skip if already using 'any' parameters (already updated)
    if (params.includes('any')) {
      continue;
    }

    // Determine if this is a method with segments or not
    const paramList = params.split(',').map(p => p.trim()).filter(Boolean);
    const hasSegments = paramList.length > 0 && !paramList[0].includes('options');

    // Build replacement
    if (hasSegments) {
      // Method with segments
      const oldFunction = match[0];
      const newParams = 'arg1: any, arg2?: any, arg3?: any';
      const newFunction = `export const ${methodName} = function (${newParams}): Promise`;

      // Find the function body and add normalization
      const functionStart = content.indexOf(oldFunction);
      const bodyStart = content.indexOf('{', functionStart) + 1;
      const firstStatement = content.substring(bodyStart, content.indexOf(';', bodyStart) + 1).trim();

      if (!firstStatement.includes('normalizeServiceMethodArgsWithSegments')) {
        const segmentName = paramList[0].replace(/[{}]/g, '').trim().split(':')[0].trim();
        const normalization = `\n  const { segments: ${segmentName}, request, options } = normalizeServiceMethodArgsWithSegments('${path.basename(filePath, '.ts')}.${methodName}', arg1, arg2, arg3);`;

        content = content.replace(oldFunction, newFunction);
        content = content.substring(0, bodyStart) + normalization + '\n' + content.substring(bodyStart);
        modified = true;
      }
    } else {
      // Method without segments
      const oldFunction = match[0];
      const newParams = 'arg1?: any, arg2?: any';
      const newFunction = `export const ${methodName} = function (${newParams}): Promise`;

      // Find the function body and add normalization
      const functionStart = content.indexOf(oldFunction);
      const bodyStart = content.indexOf('{', functionStart) + 1;
      const firstStatement = content.substring(bodyStart, content.indexOf(';', bodyStart) + 1).trim();

      if (!firstStatement.includes('normalizeServiceMethodArgs')) {
        const normalization = `\n  const { request, options } = normalizeServiceMethodArgs('${path.basename(filePath, '.ts')}.${methodName}', arg1, arg2);`;

        content = content.replace(oldFunction, newFunction);
        content = content.substring(0, bodyStart) + normalization + '\n' + content.substring(bodyStart);
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
    return true;
  }

  return false;
}

async function main() {
  // Find all TypeScript files in the services directory
  const serviceFiles = await glob(`${SERVICES_DIR}/**/service/**/*.ts`, {
    ignore: ['**/*.test.ts', '**/*.spec.ts', '**/test/**', '**/mock/**']
  });

  console.log(`Found ${serviceFiles.length} service files`);

  let updatedCount = 0;
  for (const file of serviceFiles) {
    if (updateServiceFile(file)) {
      updatedCount++;
    }
  }

  console.log(`\nUpdated ${updatedCount} files`);
}

main().catch(console.error);
