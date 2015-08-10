#! /usr/bin/env node

var package = require('./package');
var program = require('commander');
var AWS = require('aws-sdk');

var bucketName = process.env.SECRETS_BUCKET_NAME;

if (!bucketName) {
  console.error('Please set the SECRETS_BUCKET_NAME variable.');
  console.error('See https://github.com/robinjmurphy/secrets#create-your-secrets-bucket.');
  process.exit(1);
}

var s3 = new AWS.S3();

function ls() {
  s3.listObjects({
    Bucket: bucketName
  }, function (err, data) {
    if (err) throw err;

    data.Contents.forEach(function (object) {
      console.log(object.Key);
    });
  });
}

function set(key, value) {
  s3.putObject({
    Bucket: bucketName,
    Key: key,
    Body: value,
    ServerSideEncryption: 'AES256'
  }, function (err) {
    if (err) throw err;
  });
}

function get(key) {
  s3.getObject({
    Bucket: bucketName,
    Key: key
  }, function (err, data) {
    if (err) {
      if (err.code === 'NoSuchKey') return;
      throw err;
    }

    process.stdout.write(data.Body.toString());
  });
}

function rm(key) {
  s3.deleteObject({
    Bucket: bucketName,
    Key: key
  }, function (err) {
    if (err) throw err;
  });
}

program.version(package.version)
  .arguments('<key>')
  .action(get);

program.command('ls')
  .description('List all secrets')
  .action(ls);

program.command('get <key>')
  .description('Retrieve a secret')
  .action(get);

program.command('set <key> <value>')
  .description('Update a secret')
  .action(set);

program.command('rm <key>')
  .description('Remove a secret')
  .action(rm);

program.parse(process.argv);

if (!program.args.length) ls();
