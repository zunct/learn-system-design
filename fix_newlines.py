import os

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
            if stripped.endswith('{"\\n"}'):
                new_lines.append(stripped)
            else:
                new_lines.append(stripped + '{"\\n"}')
        else:
            new_lines.append(stripped)
            
    with open(filepath, 'w') as f:
        f.write('\n'.join(new_lines) + '\n')
        
    print(f"Fixed {filename}")

