# secrets

> Share passwords and secrets securely using S3

A command-line tool for creating and accessing passwords and other secrets securely. It uses [S3](https://aws.amazon.com/s3/) for storage and [IAM permissions](http://docs.aws.amazon.com/IAM/latest/UserGuide/policies_permissions.html) for access control. Perfect for sharing passwords within your team.

## Installation

```
npm install --global @robinmurphy/secrets
```

Make sure you've exported your AWS credentials:

```
export AWS_ACCESS_KEY=...
export AWS_SECRET_ACCESS_KEY=...
```

Follow the [bucket setup](#bucket-setup) guide to create your S3 bucket.

## Usage

Store a secret:

```
secrets set npm_password supersecret
```

List secrets:

```bash
secrets
# => npm_password
```

Get a secret:

```bash
secrets npm_password
# => supersecret
```

Remove a secret:

```
secrets rm npm_password
```

## Bucket setup

### Create your secrets bucket

Use the AWS Console to create a new bucket, or use the following CloudFormation template:

```json
{
  "Resources": {
    "S3Bucket": {
      "Type": "AWS::S3::Bucket"
    }
  }
}

```

Export the name of the bucket you created:

```
export SECRETS_BUCKET_NAME=my-secrets-bucket
```

### Set up IAM permissions

You control access to your secrets using [IAM permissions](http://docs.aws.amazon.com/IAM/latest/UserGuide/policies_permissions.html). The easiest way to do this is to create an IAM _policy_ that has read/write access to your bucket and [attach it](http://docs.aws.amazon.com/IAM/latest/UserGuide/policies_using-managed.html#attach-managed-policy-console) to users, groups or roles that need access. Here's an example policy document that grants read/write access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::my-secrets-bucket"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": ["arn:aws:s3:::my-secrets-bucket/*"]
    }
  ]
}
```

You can create separate read/write policies if you don't want everyone to be able to modify your secrets.
