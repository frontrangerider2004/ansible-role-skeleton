#!/usr/bin/env node

(() => {
  'use strict';

  const {
    GITHUB_WORKSPACE,
  } = process.env;

  const {
    writeFile,
  } = require('fs').promises;
  const {
    get,
  } = require(`${ GITHUB_WORKSPACE }/.github/actions/util/github-request`); // eslint-disable-line import/no-dynamic-require, security/detect-non-literal-require

  async function main() {
    const {
      inputs,
    } = JSON.parse(process.argv[2]);
    const teams = await get('/orgs/simplesenseio/teams');
    const {
      slug,
    } = teams.find(({
      name,
    }) => name === inputs.organization_team);

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    return writeFile(`${ GITHUB_WORKSPACE }/.github/CODEOWNERS`, `* @simplesenseio/${ slug }\n`);
  }

  main()
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
})();
