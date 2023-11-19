# Test optimization guide

```bash
npx vite-bundle-visualizer -o public/stats.local.html
```

then open /chat/stats.local.html too view result

## Before:

```txt
dist/chat/index.html                          0.39 kB │ gzip:  0.27 kB
dist/chat/assets/index-e3d23bbf.css           1.10 kB │ gzip:  0.50 kB
dist/chat/assets/ChatTrigger-04128529.js      3.93 kB │ gzip:  1.68 kB
dist/chat/assets/createSvgIcon-9487aaef.js   30.52 kB │ gzip: 12.34 kB
dist/chat/assets/ChatContainer-d72799c3.js  219.43 kB │ gzip: 67.29 kB
dist/chat/assets/index-342c6312.js          283.92 kB │ gzip: 95.63 kB
```

## Tree-Sharking

```txt
dist/chat/index.html                          0.39 kB │ gzip:  0.27 kB
dist/chat/manifest.json                       0.98 kB │ gzip:  0.29 kB
dist/chat/assets/index-e3d23bbf.css           1.10 kB │ gzip:  0.50 kB
dist/chat/assets/ChatTrigger-820c3dab.js      3.93 kB │ gzip:  1.68 kB
dist/chat/assets/createSvgIcon-78a6cf85.js   30.53 kB │ gzip: 12.34 kB
dist/chat/assets/ChatContainer-c828e75f.js  209.16 kB │ gzip: 63.82 kB
dist/chat/assets/index-77f4ded6.js          252.90 kB │ gzip: 83.20 kB
```
