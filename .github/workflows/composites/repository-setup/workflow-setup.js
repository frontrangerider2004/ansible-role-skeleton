#!/usr/bin/env node

(() => {
  'use strict';

  const {
    GITHUB_WORKSPACE,
  } = process.env;
  const {
    mergeYaml,
  } = require(`${ GITHUB_WORKSPACE }/.github/actions/util/yaml`); // eslint-disable-line import/no-dynamic-require, security/detect-non-literal-require

  async function main() {
    const {
      inputs,
    } = JSON.parse(process.argv[2]);

    if ('CloudFormation' === inputs.artifact) {
      await mergeYaml(
        `${ GITHUB_WORKSPACE }/.github/workflows/build.yaml`,
        `${ GITHUB_WORKSPACE }/.github/workflows/available/build/cloudformation.yaml`,
      );
    }
  }

  main()
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
})();
