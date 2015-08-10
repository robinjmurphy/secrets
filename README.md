# secrets

> Share passwords and secrets securely with using S3

A command-line tool for creating and accessing passwords and other secrets securely. It uses S3 for storage and IAM permissions for access control.

## Installation

```
npm install --global @robinjmurphy/secrets
```

Make sure you've exported your AWS credentials (including the region):

```
export AWS_REGION=eu-west-1
export AWS_ACCESS_KEY=...
export AWS_SECRET_ACCESS_KEY=...
```

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

You control access to your secrets using IAM permissions. The easiest way to do this is to create an IAM _policy_ that has read/write access to your bucket and attach it to users, groups or roles that should have access. Here's an example policy document for read/write access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::test"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": ["arn:aws:s3:::test/*"]
    }
  ]
}
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
