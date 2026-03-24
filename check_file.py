import os
path = r"c:\Users\mrgue\OneDrive\Documents\GitHub\BDL website\BinkoO-Digital-Lab\.trae\skills\Score Lighthouse\Score Lighthouse"
if os.path.exists(path):
    print(f"File exists. Size: {os.path.getsize(path)} bytes")
    # try reading a small chunk
    with open(path, 'rb') as f:
        print(f"First 100 bytes: {f.read(100)}")
else:
    print("File not found")
