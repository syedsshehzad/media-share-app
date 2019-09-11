// Import the Amazon S3 service client
var S3 = require('aws-sdk/clients/s3');
var cognito = require('aws-sdk/clients/cognitoidentity');
// var AWS = require('aws-sdk');
// var cognitoCreds = require('aws-sdk/lib/credentials');
// var amplify = require('aws-amplify');
var cognitoId = require('aws-sdk/clients/cognitoidentityserviceprovider');
var AmazonCognitoIdentity = require('amazon-cognito-auth-js');

var authData = {
	ClientId : '5l5897hr9aier4cfe9cbv6temp',
	AppWebDomain : 'syedshehzadsapp.auth.us-east-1.amazoncognito.com',
	TokenScopesArray : ['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
	RedirectUriSignIn : 'http://localhost',
	RedirectUriSignOut : 'http://localhost',
	// IdentityProvider : '<TODO: add identity provider you want to specify>', e.g. 'Facebook',
	UserPoolId : 'us-east-1_I1UXEGYVr', // Your user pool id here
	AdvancedSecurityDataCollectionFlag : 'true',
    Storage: document.cookie
};

var auth = new AmazonCognitoIdentity.CognitoAuth(authData);
console.log(auth.);

export {auth as authe};

// var credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:103f298b-1a26-48ef-9ec1-06af9ea8ed3d',
//     Logins: {
//         // Change the key below according to the specific region your user pool is in.
//         'cognito-idp.us-east-1.amazonaws.com/us-east-1_I1UXEGYVr': 'token'
//     }
// });


// Set credentials and region
// var s3 = new S3({
//     apiVersion: '2006-03-01',
//     region: 'us-west-1',
//     credentials: credentials
// });

// s3.listObjectsV2({Bucket: 'aws-cognito-resources'}, function(err, data) {
//     if (err) throw err;
//     console.log(data);
// });
