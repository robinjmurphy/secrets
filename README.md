# secrets

> Share passwords and secrets securely with using S3

A command-line tool for creating and accessing passwords and other secrets securely. It uses S3 for storage and IAM permissions for access control.

## Installation

```
npm install --global @robinjmurphy/secrets
```

## Usage

Store a secret:

```
secrets set npm_password supersecret
```

List secrets:

```bash
secrets ls
# => npm_password
```

Get a secret:

```bash
secrets get npm_password
# => supersecret
```
