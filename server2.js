var express = require('express');
var bodyParser = require('body-parser');
// var Busboy = require('busboy');
var path = require('path');
var os = require('os');
var fs = require('fs');
var https = require('https');
var AWS = require('aws-sdk');
// var request = require('request');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');


var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


app.post('/login', (req, res) => {

    console.log('req.body.hash');
    var hash = req.body.hash;
    var token = '';

    var i = 10;
    while (i < hash.length && hash[i] != '&') {
        token += hash[i];
        i++;
    }

    console.log(token);

    var credentials = new AWS.CognitoIdentityCredentials(
        {
            Logins: {
                // Change the key below according to the specific region your user pool is in.
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_I1UXEGYVr': token
            },
            IdentityPoolId: 'us-east-1:103f298b-1a26-48ef-9ec1-06af9ea8ed3d'
        },
        {
            region: 'us-east-1'
        }
    );

    // console.log('LOGINS:');
    // console.log(credentials.params.Logins);

    // var prom = credentials.getPromise();

    // credentials.get(function (err) {

    var S3 = new AWS.S3({
        region: 'us-east-1',
        credentials: credentials
    });


    S3.listBuckets((err, data) => {
        console.log(err);
        console.log(data);
    });

    var items = [];

    S3.listObjectsV2(
        {
            Bucket: 'aws-cognito-resources'
        },
        function (err, data) {
            console.log(err);
            console.log(data.Contents);
            var count = 0;
            data.Contents.forEach(function (item, index, array) {
                if (item.Size.valueOf() > 0) {
                    console.log(item.Size.valueOf());
                    S3.getObject(
                        {
                            Bucket: 'aws-cognito-resources',
                            Key: item.Key,
                            // ResponseContentEncoding: 'base64',
                            // ResponseContentType: 'image'
                        },
                        function (err, data) {
                            if (err) throw err;
                            items.push({
                                name: item.Key,
                                buffer: data.Body.toString('base64')
                            });

                            if (items.length == array.length - count) {
                                // res.contentType('png');
                                res.send(items);
                                // res.end(items[2], 'base64', function() {console.log('done')})
                            }
                        }
                    );
                } else {
                    count++;
                }
            });

        }
    );



    // S3.getObject(
    //     {
    //         Bucket: 'aws-cognito-resources',
    //         Key: 'Google.png',
    //         ResponseContentType: 'image',
    //     }, function (err, data) {
    //         if (err) throw err;
    //         res.contentType('png');
    //         res.send(data.Body);
    //     }
    // );
    //     console.log(err);
    // });

});


app.listen(80, function () {
    console.log('server started');
});
