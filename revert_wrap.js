const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/casestudies');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let updated = false;

  // Revert the p-4... whitespace-pre-wrap ones
  if (content.includes('whitespace-pre-wrap break-words')) {
    content = content.replace(
      /whitespace-pre-wrap break-words/g,
      'min-w-max'
    );
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Reverted ${file}`);
  }
});
