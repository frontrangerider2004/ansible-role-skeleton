#!/usr/bin/env node

(() => {
  'use strict';

  const {
    GITHUB_REPOSITORY,
    GITHUB_WORKSPACE,
  } = process.env;

  const {
    get,
    patch,
    put,
  } = require('../../../actions/util/github-request'); // eslint-disable-line node/no-missing-require
  const {
    saveYaml,
  } = require('../../../actions/util/yaml'); // eslint-disable-line node/no-missing-require
  const {
    setOutput,
  } = require('../../../actions/util/github-action'); // eslint-disable-line node/no-missing-require


  function getConfig(teamName, teams) {
    const reviewTeam = teams.find(({
      name,
    }) => name === teamName).slug;
    const releaseTeam = 'Prototype' === teamName ? reviewTeam : teams.find(({
      name,
    }) => name === `${ teamName } Release`).slug;

    if (undefined === reviewTeam || undefined === releaseTeam) throw new Error('cannot determine team');
    /* eslint-disable camelcase */
    return {
      branch_protection: {
        restrictions: {
          teams: [releaseTeam],
        },
      },
      branch_protection_override: {
        dev: {
          restrictions: {
            teams: [...new Set([ releaseTeam, reviewTeam ])],
          },
        },
      },
    };
    /* eslint-enable camelcase */
  }

  async function main() {
    const {
      inputs,
    } = JSON.parse(process.argv[2]);
    const {
      private: privateRepo,
    } = await patch(`/repos/${ GITHUB_REPOSITORY }`, {
      data: {
        description: inputs.description,
      },
    });
    const names = [];
    const teams = await get('/orgs/simplesenseio/teams');
    const repoConfig = getConfig(inputs.organization_team, teams);

    if ('None' !== inputs.artifact) names.push(inputs.artifact.toLowerCase());
    if (inputs.organization_team.startsWith('Tools')) names.push('tool');
    if (inputs.organization_team.startsWith('Prototype')) names.push('prototype');
    if (names.length) {
      await put(`/repos/${ GITHUB_REPOSITORY }/topics`, {
        data: {
          names,
        },
      });
    }

    await setOutput({
      key: 'private',
      value: privateRepo,
    });

    await saveYaml(`${ GITHUB_WORKSPACE }/.github/repo.yaml`, repoConfig);
  }

  main()
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
})();
