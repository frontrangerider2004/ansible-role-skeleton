# {{ role_name }} Test

Unit testing for the {{ role_name }} role. Use the included [test playbook](./test.yaml) and [local inventory](./inventory)
configuration as a quick start to running the role or valiating any complex tasks.

The playbook in this directory will also be enumerated by Molecule for testing across the entire collection.

## Usage

From the ansible root directory run:

```shell
ansible-playbook roles/{{ role_name }}/tests/test.yaml
```
