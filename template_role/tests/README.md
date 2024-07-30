# Test Directory

Use the included [test playbook](./test.yaml) and [local inventory](./inventory)
configuration as a quick start to running the role or valiating any complex tasks.
The playbook in this directory will also be enumerated by Molecule
for testing across the entire collection.

To run the test:

1. `cd "$(rev-parse --show-toplevel)"`
2. `ansible-playbook roles/{{ role_name }}/tests/test.yaml`
