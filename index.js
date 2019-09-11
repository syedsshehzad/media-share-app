// Import the Amazon S3 service client
var S3 = require('aws-sdk/clients/s3');
var AWS = require('aws-sdk');
// var amplify = require('aws-amplify');
var AmazonCognitoIdentity = require('amazon-cognito-auth-js');
// var dynamodb = require('aws-sdk/clients/dynamodb');

var authData = {
	ClientId: '5l5897hr9aier4cfe9cbv6temp',
	AppWebDomain: 'syedshehzadsapp.auth.us-east-1.amazoncognito.com',
	TokenScopesArray: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
	RedirectUriSignIn: 'https://shehzadsite.s3.amazonaws.com/index.html',
	RedirectUriSignOut: 'https://shehzadsite.s3.amazonaws.com/index.html',
	// IdentityProvider : '<TODO: add identity provider you want to specify>', e.g. 'Facebook',
	UserPoolId: 'us-east-1_I1UXEGYVr', // Your user pool id here
	AdvancedSecurityDataCollectionFlag: 'true',
	Storage: localStorage
};

auth = new AmazonCognitoIdentity.CognitoAuth(authData);

auth.userhandler = {
	onFailure: function (err) {
		alert(err);
		console.log(err);
	},
	onSuccess: function (authSession) {
		console.log(authSession);
	}
};

s3 = null;

/**
 * @function authorize(@param userSession)
 */

authorize = function (userSession) {

	var credentials = new AWS.CognitoIdentityCredentials(
		{
			IdentityPoolId: 'us-east-1:103f298b-1a26-48ef-9ec1-06af9ea8ed3d',
			Logins: {
				// Change the key below according to the specific region your user pool is in.
				'cognito-idp.us-east-1.amazonaws.com/us-east-1_I1UXEGYVr': userSession.idToken.jwtToken
			}
		},
		{
			region: 'us-east-1'
		}
	);

	s3 = new S3({
		apiVersion: '2006-03-01',
		region: 'us-east-1',
		credentials: credentials
	});

	s3.getBucketLocation({Bucket: 'aws-cognito-resources'}, function(err, data) {
		if (err) {
			alert(err.message);
			console.log(err);
		} else {
			console.log(data);
			document.getElementById('content').innerHTML += `<h2>Ready ${data.LocationConstraint}</h2>`;
		}
	});

}

albumBucketName = 'aws-cognito-resources';

// A utility function to create HTML.
getHtml = function(template) {
	return template.join('\n');
  }
  
  // List the photo albums that exist in the bucket.
  listAlbums = function() {
	  s3.listObjects({Delimiter: '/', Bucket: albumBucketName}, function(err, data) {
		if (err) {
		  return alert('There was an error listing your albums: ' + err.message);
		} else {
		  var albums = data.CommonPrefixes.map(function(commonPrefix) {
			var prefix = commonPrefix.Prefix;
			var albumName = decodeURIComponent(prefix.replace('/', ''));
			return getHtml([
			  '<li>',
				'<button style="margin:5px;" onclick="viewAlbum(\'' + albumName + '\')">',
				  albumName,
				'</button>',
			  '</li>'
			]);
		  });
		  var message = albums.length ?
			getHtml([
			  '<p>Click on an album name to view it.</p>',
			]) :
			'<p>You do not have any albums. Please Create album.';
		  var htmlTemplate = [
			'<h2>Albums</h2>',
			message,
			'<ul>',
			  getHtml(albums),
			'</ul>',
		  ]
		  document.getElementById('viewer').innerHTML = getHtml(htmlTemplate);
		}
	  });
	}
	
	// Show the photos that exist in an album.
  viewAlbum = function(albumName) {
	  var albumPhotosKey = encodeURIComponent(albumName) + '/';
	  s3.listObjects({Prefix: albumPhotosKey, Bucket: albumBucketName}, function(err, data) {
		if (err) {
		  return alert('There was an error viewing your album: ' + err.message);
		}
		// 'this' references the AWS.Response instance that represents the response
		var href = this.request.httpRequest.endpoint.href;
		var bucketUrl = href + albumBucketName + '/';
	
		var photos = data.Contents.map(function(photo) {
		  var photoKey = photo.Key;
		  var photoUrl = bucketUrl + encodeURIComponent(photoKey);
		  return getHtml([
			'<span>',
			  '<div>',
				'<br/>',
				'<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
			  '</div>',
			  '<div>',
				'<span>',
				  photoKey.replace(albumPhotosKey, ''),
				'</span>',
			  '</div>',
			'</span>',
		  ]);
		});
		var message = photos.length ?
		  '<p>The following photos are present.</p>' :
		  '<p>There are no photos in this album.</p>';
		var htmlTemplate = [
		  '<div>',
			'<button onclick="listAlbums()">',
			  'Back To Albums',
			'</button>',
		  '</div>',
		  '<h2>',
			'Album: ' + albumName,
		  '</h2>',
		  message,
		  '<div>',
			getHtml(photos),
		  '</div>',
		  '<h2>',
			'End of Album: ' + albumName,
		  '</h2>',
		  '<div>',
			'<button onclick="listAlbums()">',
			  'Back To Albums',
			'</button>',
		  '</div>',
		]
		document.getElementById('viewer').innerHTML = getHtml(htmlTemplate);
	  });
	}
	
