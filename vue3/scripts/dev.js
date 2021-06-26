const path = require("path");
const fs = require("fs");
const execa = require("execa");


const packages = ['reactivity'];

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
      '-cw',
      '--environment',
      `TARGET:${pkgName}`
    ], 
    { stdio: 'inherit' },
    );
}