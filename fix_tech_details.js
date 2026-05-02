const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/casestudies');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let updated = false;

  // Fix header flex container
  if (content.includes('border-b border-slate-800 flex items-center justify-between bg-slate-950')) {
    content = content.replace(
      /border-b border-slate-800 flex items-center justify-between bg-slate-950/g,
      'border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-950 gap-2'
    );
    updated = true;
  }

  // Fix pre wrapper
  if (content.includes('className="p-4 bg-[#0d1117] overflow-x-auto"')) {
    content = content.replace(
      /className="p-4 bg\[#0d1117\] overflow-x-auto">\s*<pre className="text-sm font-mono leading-relaxed"/g,
      'className="w-full bg-[#0d1117] overflow-x-auto">\n              <pre className="p-4 text-sm font-mono leading-relaxed min-w-max"'
    );
    updated = true;
  }

  // Also fix other <pre> tags without wrapper
  if (content.includes('<div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-800">') ||
      content.includes('<div className="bg-slate-950 rounded-xl border border-slate-800 p-6 font-mono text-sm overflow-x-auto">')) {
    content = content.replace(
      /className="([^"]*)overflow-x-auto([^"]*)">\s*<pre/g,
      'className="$1overflow-x-auto w-full$2">\n          <pre className="min-w-max"'
    );
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
