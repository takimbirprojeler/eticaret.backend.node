# eticaret.backend.node
[![.github/workflows/node.js.yml](https://github.com/takimbirprojeler/eticaret.backend.node/actions/workflows/node.js.yml/badge.svg)](https://github.com/takimbirprojeler/eticaret.backend.node/actions/workflows/node.js.yml) 
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)  

## description
this repository contains all node base services and libraries


## prerequisites
- node 18 or later
- docker
- zsh 

## depends on
- [scripts](https://github.com/takimbirprojeler/eticaret.scripts)
- [proto](https://github.com/takimbirprojeler/eticaret.backend.proto)
## instalation
### clone this repository
```shell
 
 # ssh
git clone git@github.com:takimbirprojeler/eticaret.backend.node.git ecommerce/backend.node

# http
git clone https://github.com/takimbirprojeler/eticaret.backend.node.git ecommerce/backend.node

# github cli
gh repo clone takimbirprojeler/eticaret.backend.node
```

#### install dependencies

```
rm -rf yarn.lock && yarn
```
load proto files

```bash
yarn load:proto libs/proto
```

load scripts

```bash
yarn load:scripts scripts
```
stand up the development database
```bash
yarn load:db --dev
```

start dev server
```bash
yarn start:dev
```
