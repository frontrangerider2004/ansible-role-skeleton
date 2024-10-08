# Ansible Galaxy Role Template

This repo provides an ansible-galaxy template that you can use
to scaffold new roles.

## Usage

To quickly scaffold a new role first clone this repo. Then run the following
command within your project's `roles` directory.

```shell
ansible-galaxy role init --role-skeleton ~/Projects/ansible-role-skeleton/template_role foo_role
```

## Test Role

Ansible Galaxy generates a [test](./template_role/tests/) folder and playbook by default. This is designed to make it easy to run just the role you are developing but can also be converted to a unit-test playbook for validating template renders and other complex filter operations. See the `package.json` snippet below for useful setup to work with Simplesense Github actions.

```json
  "scripts": {
    "postinstall": "npm run install:galaxy",
    "install:galaxy": "ansible-galaxy install -r ./ansible/roles/requirements.yaml ",
    "lint:ansible": "cd ansible && simp-ansible-lint --parseable --project-dir .",
    "test": "npm run test:ansible",
    "test:ansible": "npx glob **/test.yaml --cmd 'ansible-playbook -vv'"
  },
  "devDependencies": {
    "@simplesenseio/ansible-lint": "^2.0.1",
    "@simplesenseio/shellcheck": "^2.0.2",
    "glob": "^11.0.0",
  },
```
