const promisify = require('util');
const fs = require('fs');
const convert = require('heic-convert');

/* ファイル取得処理 */
fs.readdir('./', (err, files)=>{
    if (err) throw err;

    const heicFiles = files.filter((file) => {
      return fs.statSync(file).isFile() && /.*\.heic$/.test(file);
    })

    heicFiles.forEach((file)=> {
      convertJPEG(file)
    });
});

async function convertJPEG(file) {
  try{
    const fileName = file.replace("heic", "jpg") //名前変換
    const inputBuffer = await promisify(fs.readFile)(`./${file}`);
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 1
    });
    await promisify(fs.writeFile)(`./${fileName}`, outputBuffer);
  }catch(err){
    console.log(err)
  }
};