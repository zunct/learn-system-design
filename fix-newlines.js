const fs = require('fs');
const glob = require('glob'); // Not available? I'll just use fs.readdirSync

const dir = 'src/components/casestudies';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = `${dir}/${file}`;
  let content = fs.readFileSync(filePath, 'utf8');
  
  let inPre = false;
  let newLines = [];
  
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    if (line.includes('<pre')) {
      inPre = true;
      newLines.push(line);
      continue;
    }
    
    if (line.includes('</pre>')) {
      inPre = false;
      newLines.push(line);
      continue;
    }
    
    if (inPre) {
      // Don't add {"\n"} to completely empty lines, though we might need it for blank lines in code!
      // Actually, if the line is just spaces, we should output `{"\n"}` so it creates a blank line.
      if (line.trim() === '') {
         newLines.push(line + '{"\\n"}');
      } else {
         // If it already has {"\n"}, don't add it again
         if (!line.endsWith('{"\\n"}')) {
             newLines.push(line + '{"\\n"}');
         } else {
             newLines.push(line);
         }
      }
    } else {
      newLines.push(line);
    }
  }
  
  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log(`Fixed ${file}`);
});
