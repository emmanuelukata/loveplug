const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'public', 'products');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

(async () => {
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const sizeMB = (stat.size / 1024 / 1024).toFixed(1);
    
    if (stat.size > 500 * 1024) { // Only compress if > 500KB
      console.log(`Compressing ${file} (${sizeMB}MB)...`);
      await sharp(filePath)
        .resize(800, 800, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(filePath + '.tmp');
      fs.unlinkSync(filePath);
      fs.renameSync(filePath + '.tmp', filePath);
      const newSize = (fs.statSync(filePath).size / 1024 / 1024).toFixed(1);
      console.log(`  Done: ${newSize}MB`);
    } else {
      console.log(`Skipping ${file} (${sizeMB}MB) - already small`);
    }
  }
  console.log('All done!');
})();
