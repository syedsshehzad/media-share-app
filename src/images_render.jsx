'use strict';

class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        var ext = this.props.Key.substr(this.props.Key.length - 4, 4);
        console.log(ext);
        var src, tag;
        if (ext == '.mp4') {
            src = 'data:video/mp4;base64,' + this.props.Body.toString('base64');
            tag = <video
                src={src}
                style={{ height: '100px', display: 'block', margin: '5px', border: 'solid 1px #ffffff' }}
                controls
            />
        } else if (ext.toLowerCase() == '.jpg') {
            src = 'data:image/jpg;base64,' + this.props.Body.toString('base64');
            tag = <img
                onClick={() => this.setState({ liked: true })}
                src={src}
                style={{ height: '100px', display: 'block', margin: '5px', border: 'solid 1px #ffffff' }}
            />
        } else {
            src = 'data:image/png;base64,' + this.props.Body.toString('base64');
            tag = <img
                onClick={() => this.setState({ liked: true })}
                src={src}
                style={{ height: '100px', display: 'block', margin: '5px', border: 'solid 1px #ffffff' }}
            />
        }

        return (
            <div style={{ background: '#d2ffc9', display: 'inline-block', width: '200px', padding: '5px', margin: '10px' }}>
                <h3>{this.props.Key}</h3>
                {tag}
                <a href={src} target='__blank' style={{ margin: '5px' }}>View Full Size</a>
                <a href={src} download={this.props.Key} style={{ margin: '5px' }}>Download</a>
                <button onClick={() => approvePic(this.props.Key)}>Approve</button>
                <button onClick={() => deletePic(this.props.Key)}>Delete</button>
            </div>
        );
    }
}

class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.items.map((item, index) =>
            <Photo Body={item.Body} Key={item.Key} key={index} />
        );
    }
}

class Counter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <p>Count = {this.props.count}</p>
    }
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { c: 0 }
    }


    render() {
        return <div><Counter count={this.state.c} /><button onClick={() => this.setState({ c: this.state.c + 1 })}>Inc</button></div>;
    }
}

var count = 0;

ReactDOM.render(<Parent />, document.querySelector('#content'));

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn: auth.isUserSignedIn(),
            user: auth.getUsername(),
            localStorage: auth.getCachedSession().isValid(),
            authorized: s3,
            numberOfPics: undefined
        }
    }

    refresh = () => {
        this.setState({
            signIn: auth.isUserSignedIn(),
            user: auth.getUsername(),
            localStorage: auth.getCachedSession().isValid(),
            authorized: s3,
            numberOfPics: undefined
        })
    }

    render() {
        return <div>
            <p>Hello {this.state.user}!</p>
            <p>Status: {this.state.signIn ? 'Signed In' : 'Signed Out'}</p>
            <p>Cached: {this.state.localStorage ? 'true' : 'false'}</p>
            <p>Authorized: {this.state.authorized ? 'true' : 'false'}</p>
            <p>Number of Pictures: {this.state.numberOfPics}</p>
            <button onClick={() => { console.log(auth); this.refresh() }}>Log Auth</button>

            <button onClick={() => { alert(auth.getState()); this.refresh() }}>Get State</button>

            <button onClick={() => { alert(document.cookie); this.refresh() }}>Get Cookie</button>

            <button onClick={() => { console.log(localStorage); this.refresh() }}>Log Local Storage</button>

            <button onClick={() => { auth.cacheTokensScopes(); this.refresh() }}>Cache Tokens</button>

            <button onClick={() => { auth.clearCachedTokensScopes(); this.refresh() }}>Clear Cache</button>

            <button onClick={() => { console.log(auth.getCachedSession()); this.refresh() }}>Log Cached Session</button>

            <button onClick={() => { console.log(auth.getSignInUserSession()); this.refresh(); }}>Get Sign In User Session</button>

            <button onClick={() => { auth.getSession(); this.refresh() }}>Sign In</button>

            <button onClick={() => { console.log(auth.getCurrentUser()); this.refresh() }}>Get Current User</button>

            <button onClick={() => { auth.signOut(); this.refresh() }}>Sign Out</button>

            <button onClick={() => { alert(location.href); this.refresh() }}>Get Href</button>

            <button onClick={() => { auth.parseCognitoWebResponse(location.href); this.refresh() }}>Parse Web Response</button>

            <h2>Get Access</h2>

            <button onClick={() => { authorize(auth.getCachedSession()); this.refresh() }}>Authorize</button>
            <button onClick={this.refresh}>Refresh</button>
        </div>
    }
}

var getData = function () {

    var items = [];

    s3.listObjectsV2(
        {
            Bucket: 'aws-cognito-resources'
        },
        function (err, data) {
            if (err) alert(err);
            var count = 0;
            data.Contents.forEach(function (item, index, array) {

                if (item.Key.indexOf('/') < 0) {
                    s3.getObject(
                        {
                            Bucket: 'aws-cognito-resources',
                            Key: item.Key
                        },
                        function (err, data) {
                            if (err) throw err;
                            items.push(
                                {
                                    Key: item.Key,
                                    Body: data.Body
                                }
                            );
                            console.log(items.length + " " + array.length + " " + count + " " + item.Size);
                            if (items.length == array.length - count) {
                                getPics(items);
                            }
                        }
                    );
                } else {
                    count++;
                }
            });
        }
    );
}

var getApproved = function () {

    var items = [];

    s3.listObjectsV2(
        {
            Bucket: 'aws-cognito-resources',
            Prefix: 'approved/'
        },
        function (err, data) {
            if (err) alert(err);
            var count = 0;
            data.Contents.forEach(function (item, index, array) {

                if (item.Key.length > 10) {
                    s3.getObject(
                        {
                            Bucket: 'aws-cognito-resources',
                            Key: item.Key
                        },
                        function (err, data) {
                            if (err) throw err;
                            items.push(
                                {
                                    Key: item.Key,
                                    Body: data.Body
                                }
                            );
                            console.log(items.length + " " + array.length + " " + count + " " + item.Size);
                            if (items.length == array.length - count) {
                                getPics(items);
                            }
                        }
                    );
                } else {
                    count++;
                }
            });
        }
    );
}

var deletePic = function (key) {
    s3.deleteObject(
        {
            Bucket: 'aws-cognito-resources',
            Key: key
        },
        function (err, data) {
            if (err) {
                alert(err.message);
                console.log(err);
            } else {
                console.log(data);
                getData();
            }
        }
    );
}

var approvePic = function (key) {
    s3.copyObject(
        {
            Bucket: 'aws-cognito-resources',
            CopySource: `aws-cognito-resources/${key}`,
            Key: `approved/${key}`
        },
        function (err, data) {
            if (err) {
                alert(err.message);
                console.log(err);
            } else {
                alert(data.CopyObjectResult.ETag);
                console.log(data);
                deletePic(key);
            }
        }
    );
}

var getPics = function (items) {
    var domContainer = document.querySelector('#react');
    ReactDOM.render(<Display items={items} />, domContainer);
}

ReactDOM.render(<Banner />, document.getElementById('banner'));

var refreshBanner = function () {
    ReactDOM.render(<Banner />, document.getElementById('banner'));
}

document.getElementById('submit').onclick = function (e) {
    var file = document.querySelector('input').files[0];
    var title = document.getElementsByName('title')[0].value;

    console.log(title)
    s3.upload(
        {
            Bucket: 'aws-cognito-resources',
            Key: title,
            Body: file
        },
        null,
        function (err, response) {
            if (err) {
                alert(err.message);
                console.log(err);
            } else {
                console.log(response);
                alert(`${response.key} was successfully uploaded to ${response.Bucket}.`);
            }

        }
    );
};
