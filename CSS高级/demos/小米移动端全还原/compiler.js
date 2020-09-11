const fs = require.call(this, 'fs');
const path = require.call(this, 'path');
const cmd = require('node-cmd');

function load(dir, cb) {
    const url = path.resolve(__dirname, dir);
    console.log(url)
    const files = fs.readdirSync(url);
    files.forEach(filename => {
        cb(filename);
    })
}

function initLESS() {
    load('./less', (filename) => {
        if (filename.startsWith("_nc")) return;
        console.log(filename);
        const origin = path.resolve(__dirname, `less/${filename}`);
        const target = path.resolve(__dirname, `css/${filename.replace('less','css')}`);
        // console.log(`${origin} ${target}`);
        cmd.run(`lessc ${origin} ${target}`);
    })
}

function initSASS() {
    load('./sass', (filename) => {
        if (filename.startsWith("_nc")) return;
        console.log(filename);
        const origin = path.resolve(__dirname, `sass/${filename}`);
        const target = path.resolve(__dirname, `css/${filename.replace('scss','css')}`);
        console.log(`${origin} ${target}`);
        cmd.run(`node-sass --output-style nested  ${origin} > ${target}`);
    })
}

let lang = process.argv.find(i => i.startsWith('lang')).split('=')[1];
console.log(`init${lang.toUpperCase()}`);
eval(`init${lang.toUpperCase()}()`);