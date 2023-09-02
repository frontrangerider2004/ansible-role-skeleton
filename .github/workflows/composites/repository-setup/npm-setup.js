#!/usr/bin/env node

(() => {
  'use strict';

  const path = require('path');

  const {
    GITHUB_WORKSPACE,
    SI_PRIVATE_REPO,
  } = process.env;
  const PKG_PATH = path.resolve(GITHUB_WORKSPACE, './package.json');

  // eslint-disable-next-line import/no-dynamic-require, security/detect-non-literal-require
  const pkgJson = require(PKG_PATH);
  const {
    writeFile,
  } = require('fs').promises;

  async function main() {
    let hasChanges = false;
    const {
      inputs,
    } = JSON.parse(process.argv[2]);

    if ('Jest' === inputs.unit_test) {
      hasChanges = true;

      pkgJson.jest = {
        collectCoverage: true,
        reporters: [
          'default',
          'github-actions',
        ],
        setupFiles: ['<rootDir>/test/setup/global-functions.js'],
        testPathIgnorePatterns: [
          '/node_modules/',
          '<rootDir>/\\.github/',
        ],
        verbose: true,
      };
      pkgJson.scripts.test = 'jest';
    }

    if ('false' === SI_PRIVATE_REPO) {
      pkgJson.description = inputs.description;
      pkgJson.license = 'Apache-2.0';
    }

    if ('CloudFormation' === inputs.artifact) {
      hasChanges = true;

      pkgJson.scripts['cloudformation:validate'] = 'aws cloudformation validate-template --template-body file://cloudformation.yaml 1> /dev/null';
      if ('Jest' === inputs.unit_test) {
        pkgJson.jest = {
          ...pkgJson.jest,
          collectCoverageFrom: ['lambda/**/*.js'],
          moduleDirectories: [
            'node_modules',
            '<rootDir>/lambda/layers/node-modules/nodejs/node_modules',
          ],
          moduleNameMapper: {
            '/opt/nodejs/(.*)': '<rootDir>/lambda/layers/$1/nodejs/$1',
          },
        };
      }
    } else if ('NPM' === inputs.artifact) {
      hasChanges = true;

      delete pkgJson.private;
      pkgJson.main = 'index.js';
      pkgJson.files = ['index.js'];
    }

    if (hasChanges) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      await writeFile(PKG_PATH, JSON.stringify(pkgJson, null, 2));
    }
  }

  main()
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
})();
