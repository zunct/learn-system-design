import os
import re

dir_path = 'src/components/casestudies'

for filename in os.listdir(dir_path):
    if not filename.endswith('.jsx'):
        continue
        
    filepath = os.path.join(dir_path, filename)
    with open(filepath, 'r') as f:
        lines = f.readlines()
        
    new_lines = []
    in_pre = False
    
    for line in lines:
        stripped = line.rstrip('\n')
        
        if '<pre ' in stripped or '<pre>' in stripped:
            in_pre = True
            new_lines.append(stripped)
            continue
            
        if '</pre>' in stripped:
            in_pre = False
            new_lines.append(stripped)
            continue
            
        if in_pre:
            # Check if line has leading spaces and starts with a tag
            match = re.match(r'^( +)(<span|{)', stripped)
            
            # If the line already starts with {" "}, skip adding more
            if stripped.lstrip().startswith('{" ') or stripped.lstrip().startswith('{"\\n"}'):
                new_lines.append(stripped)
                continue
                
            if match:
                spaces = match.group(1)
                remainder = stripped[len(spaces):]
                # Inject {"   "} at the start
                new_line = f'{{"{spaces}"}}{remainder}'
                new_lines.append(new_line)
            else:
                new_lines.append(stripped)
        else:
            new_lines.append(stripped)
            
    with open(filepath, 'w') as f:
        f.write('\n'.join(new_lines) + '\n')
        
    print(f"Fixed indentation for {filename}")

