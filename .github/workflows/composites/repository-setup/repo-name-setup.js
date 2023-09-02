#!/usr/bin/env node

(() => {
  'use strict';

  const path = require('path');
  const {
    readFile,
    writeFile,
  } = require('fs').promises;

  const FILE_LIST = [
    'package.json',
    'package-lock.json',
  ];

  const {
    GITHUB_REPOSITORY,
    GITHUB_WORKSPACE,
    SI_PRIVATE_REPO,
  } = process.env;

  const REGEX = (/simplesenseio\/repository-template/giu);

  function readmeContents({
    github_pages: hasPages,
  }) {
    const contents = [`# ${ GITHUB_REPOSITORY }\n`];

    if ('true' === hasPages) {
      contents.push(`[![GitHub Pages](https://img.shields.io/static/v1?label=GitHub&message=Pages&color=informational&style=flat-square&logo=github)](https://simplesenseio.github.io/${ GITHUB_REPOSITORY.split('/').pop() }/)`);
    }

    contents.push(`[![Build](https://github.com/${ GITHUB_REPOSITORY }/actions/workflows/build.yaml/badge.svg?branch=main&style=flat-square)](https://github.com/${ GITHUB_REPOSITORY }/actions/workflows/build.yaml)`);

    return contents.join('\n');
  }

  async function main() {
    const {
      inputs,
    } = JSON.parse(process.argv[2]);
    const pkgFiles = [
      'package.json',
      'package-lock.json',
    ];

    for (const filename of FILE_LIST) {
      const filepath = path.resolve(GITHUB_WORKSPACE, `./${ filename }`);
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      let contents = (await readFile(filepath)).toString().replaceAll(REGEX, GITHUB_REPOSITORY);

      if ('false' === SI_PRIVATE_REPO && 'NPM' === inputs.artifact && pkgFiles.includes(filename)) {
        contents = JSON.parse(contents);
        contents.name = contents.name.replace('@simplesenseio/', '@simplesense/');
        contents = JSON.stringify(contents, null, 2);
      }

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      await writeFile(filepath, contents);
    }
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await writeFile(path.resolve(GITHUB_WORKSPACE, './README.md'), readmeContents(inputs));
  }

  main()
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
})();
