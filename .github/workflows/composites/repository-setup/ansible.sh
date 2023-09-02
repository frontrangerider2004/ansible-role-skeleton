#!/usr/bin/env bash

ANSIBLE_DIR="ansible/roles"
mkdir -p "${ANSIBLE_DIR}"
cd "${ANSIBLE_DIR}" || exit 1
for ROLE in $(echo "${SI_ANSIBLE_ROLES}" | tr '[:upper:]' '[:lower:]' | tr ',' ' '); do
  ansible-galaxy init "${ROLE}"
  rm -f "${ROLE}/README.md" "${ROLE}/.travis.yml"
  echo -e '*\n!.gitignore\n' > "${ROLE}/files/.gitignore"
  echo -e '*\n!.gitignore\n' > "${ROLE}/templates/.gitignore"
  tee "${ROLE}/meta/main.yml" << END
galaxy_info:
  author: Simplesense
  description: ${SI_DESCRIPTION}
  min_ansible_version: 2.1
  galaxy_tags: []
dependencies: []
END

done
find . -depth -name "*.yml" -exec sh -c 'mv "$1" "${1%.yml}.yaml"' _ {} \;
