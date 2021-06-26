const path = require("path");
const fs = require("fs");
const execa = require("execa");


const packagesDir = path.resolve('packages');

const packages = fs.readdirSync(packagesDir).filter(name => {
  return fs.statSync(path.resolve(`packages/${name}`)).isDirectory();
});

runParallel(packages, build);

function runParallel(packages, iteratorFn) {
  const ret = [];

  for (const pkgName of packages) {
    const p = iteratorFn(pkgName);
    ret.push(p);
  }

  return Promise.all(ret);
}

async function build(pkgName) {
  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      `TARGET:${pkgName}`
    ], 
    { stdio: 'inherit' },
    );
}