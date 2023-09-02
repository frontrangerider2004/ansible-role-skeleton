# Simplesense Repository Template

The purpose of this template is to provide an easy starting point for new repositories within the Simplesense organization. See [creating a repository from a template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-repository-from-a-template) for instructions.

Once a repository is created, manually run the "Repository Setup" workflow.

## GitHub Workflows

We should eventually move these into individual action repositories and update this template to pull them in with the `uses` clause. This will allow us to update them without having to make code changes in every repository. Unfortunately, GitHub doesn't have the greatest support for this right now and we can't do this until two features are implemented.

- [ ] Private Actions - https://github.com/github/roadmap/issues/74
- [ ] Private Workflow Templates - https://github.com/github/roadmap/issues/51

In order to mitigate this, we have moved our actions to a shared private repo [simplesenseio/github-actions](https://github.com/simplesenseio/github-actions).
