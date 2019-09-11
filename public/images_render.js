'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photo = function (_React$Component) {
    _inherits(Photo, _React$Component);

    function Photo(props) {
        _classCallCheck(this, Photo);

        var _this = _possibleConstructorReturn(this, (Photo.__proto__ || Object.getPrototypeOf(Photo)).call(this, props));

        _this.state = { liked: false };
        return _this;
    }

    _createClass(Photo, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var ext = this.props.Key.substr(this.props.Key.length - 4, 4);
            console.log(ext);
            var src, tag;
            if (ext == '.mp4') {
                src = 'data:video/mp4;base64,' + this.props.Body.toString('base64');
                tag = React.createElement('video', {
                    src: src,
                    style: { height: '100px', display: 'block', margin: '5px', border: 'solid 1px #ffffff' },
                    controls: true
                });
            } else if (ext.toLowerCase() == '.jpg') {
                src = 'data:image/jpg;base64,' + this.props.Body.toString('base64');
                tag = React.createElement('img', {
                    onClick: function onClick() {
                        return _this2.setState({ liked: true });
                    },
                    src: src,
                    style: { height: '100px', display: 'block', margin: '5px', border: 'solid 1px #ffffff' }
                });
            } else {
                src = 'data:image/png;base64,' + this.props.Body.toString('base64');
                tag = React.createElement('img', {
                    onClick: function onClick() {
                        return _this2.setState({ liked: true });
                    },
                    src: src,
                    style: { height: '100px', display: 'block', margin: '5px', border: 'solid 1px #ffffff' }
                });
            }

            return React.createElement(
                'div',
                { style: { background: '#d2ffc9', display: 'inline-block', width: '200px', padding: '5px', margin: '10px' } },
                React.createElement(
                    'h3',
                    null,
                    this.props.Key
                ),
                tag,
                React.createElement(
                    'a',
                    { href: src, target: '__blank', style: { margin: '5px' } },
                    'View Full Size'
                ),
                React.createElement(
                    'a',
                    { href: src, download: this.props.Key, style: { margin: '5px' } },
                    'Download'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return approvePic(_this2.props.Key);
                        } },
                    'Approve'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return deletePic(_this2.props.Key);
                        } },
                    'Delete'
                )
            );
        }
    }]);

    return Photo;
}(React.Component);

var Display = function (_React$Component2) {
    _inherits(Display, _React$Component2);

    function Display(props) {
        _classCallCheck(this, Display);

        return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));
    }

    _createClass(Display, [{
        key: 'render',
        value: function render() {
            return this.props.items.map(function (item, index) {
                return React.createElement(Photo, { Body: item.Body, Key: item.Key, key: index });
            });
        }
    }]);

    return Display;
}(React.Component);

var Counter = function (_React$Component3) {
    _inherits(Counter, _React$Component3);

    function Counter(props) {
        _classCallCheck(this, Counter);

        return _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).call(this, props));
    }

    _createClass(Counter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'p',
                null,
                'Count = ',
                this.props.count
            );
        }
    }]);

    return Counter;
}(React.Component);

var Parent = function (_React$Component4) {
    _inherits(Parent, _React$Component4);

    function Parent(props) {
        _classCallCheck(this, Parent);

        var _this5 = _possibleConstructorReturn(this, (Parent.__proto__ || Object.getPrototypeOf(Parent)).call(this, props));

        _this5.state = { c: 0 };
        return _this5;
    }

    _createClass(Parent, [{
        key: 'render',
        value: function render() {
            var _this6 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(Counter, { count: this.state.c }),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return _this6.setState({ c: _this6.state.c + 1 });
                        } },
                    'Inc'
                )
            );
        }
    }]);

    return Parent;
}(React.Component);

var count = 0;

ReactDOM.render(React.createElement(Parent, null), document.querySelector('#content'));

var Banner = function (_React$Component5) {
    _inherits(Banner, _React$Component5);

    function Banner(props) {
        _classCallCheck(this, Banner);

        var _this7 = _possibleConstructorReturn(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).call(this, props));

        _this7.refresh = function () {
            _this7.setState({
                signIn: auth.isUserSignedIn(),
                user: auth.getUsername(),
                localStorage: auth.getCachedSession().isValid(),
                authorized: s3,
                numberOfPics: undefined
            });
        };

        _this7.state = {
            signIn: auth.isUserSignedIn(),
            user: auth.getUsername(),
            localStorage: auth.getCachedSession().isValid(),
            authorized: s3,
            numberOfPics: undefined
        };
        return _this7;
    }

    _createClass(Banner, [{
        key: 'render',
        value: function render() {
            var _this8 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    null,
                    'Hello ',
                    this.state.user,
                    '!'
                ),
                React.createElement(
                    'p',
                    null,
                    'Status: ',
                    this.state.signIn ? 'Signed In' : 'Signed Out'
                ),
                React.createElement(
                    'p',
                    null,
                    'Cached: ',
                    this.state.localStorage ? 'true' : 'false'
                ),
                React.createElement(
                    'p',
                    null,
                    'Authorized: ',
                    this.state.authorized ? 'true' : 'false'
                ),
                React.createElement(
                    'p',
                    null,
                    'Number of Pictures: ',
                    this.state.numberOfPics
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            console.log(auth);_this8.refresh();
                        } },
                    'Log Auth'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            alert(auth.getState());_this8.refresh();
                        } },
                    'Get State'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            alert(document.cookie);_this8.refresh();
                        } },
                    'Get Cookie'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            console.log(localStorage);_this8.refresh();
                        } },
                    'Log Local Storage'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            auth.cacheTokensScopes();_this8.refresh();
                        } },
                    'Cache Tokens'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            auth.clearCachedTokensScopes();_this8.refresh();
                        } },
                    'Clear Cache'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            console.log(auth.getCachedSession());_this8.refresh();
                        } },
                    'Log Cached Session'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            console.log(auth.getSignInUserSession());_this8.refresh();
                        } },
                    'Get Sign In User Session'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            auth.getSession();_this8.refresh();
                        } },
                    'Sign In'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            console.log(auth.getCurrentUser());_this8.refresh();
                        } },
                    'Get Current User'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            auth.signOut();_this8.refresh();
                        } },
                    'Sign Out'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            alert(location.href);_this8.refresh();
                        } },
                    'Get Href'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            auth.parseCognitoWebResponse(location.href);_this8.refresh();
                        } },
                    'Parse Web Response'
                ),
                React.createElement(
                    'h2',
                    null,
                    'Get Access'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            authorize(auth.getCachedSession());_this8.refresh();
                        } },
                    'Authorize'
                ),
                React.createElement(
                    'button',
                    { onClick: this.refresh },
                    'Refresh'
                )
            );
        }
    }]);

    return Banner;
}(React.Component);

var getData = function getData() {

    var items = [];

    s3.listObjectsV2({
        Bucket: 'aws-cognito-resources'
    }, function (err, data) {
        if (err) alert(err);
        var count = 0;
        data.Contents.forEach(function (item, index, array) {

            if (item.Key.indexOf('/') < 0) {
                s3.getObject({
                    Bucket: 'aws-cognito-resources',
                    Key: item.Key
                }, function (err, data) {
                    if (err) throw err;
                    items.push({
                        Key: item.Key,
                        Body: data.Body
                    });
                    console.log(items.length + " " + array.length + " " + count + " " + item.Size);
                    if (items.length == array.length - count) {
                        getPics(items);
                    }
                });
            } else {
                count++;
            }
        });
    });
};

var getApproved = function getApproved() {

    var items = [];

    s3.listObjectsV2({
        Bucket: 'aws-cognito-resources',
        Prefix: 'approved/'
    }, function (err, data) {
        if (err) alert(err);
        var count = 0;
        data.Contents.forEach(function (item, index, array) {

            if (item.Key.length > 10) {
                s3.getObject({
                    Bucket: 'aws-cognito-resources',
                    Key: item.Key
                }, function (err, data) {
                    if (err) throw err;
                    items.push({
                        Key: item.Key,
                        Body: data.Body
                    });
                    console.log(items.length + " " + array.length + " " + count + " " + item.Size);
                    if (items.length == array.length - count) {
                        getPics(items);
                    }
                });
            } else {
                count++;
            }
        });
    });
};

var deletePic = function deletePic(key) {
    s3.deleteObject({
        Bucket: 'aws-cognito-resources',
        Key: key
    }, function (err, data) {
        if (err) {
            alert(err.message);
            console.log(err);
        } else {
            console.log(data);
            getData();
        }
    });
};

var approvePic = function approvePic(key) {
    s3.copyObject({
        Bucket: 'aws-cognito-resources',
        CopySource: 'aws-cognito-resources/' + key,
        Key: 'approved/' + key
    }, function (err, data) {
        if (err) {
            alert(err.message);
            console.log(err);
        } else {
            alert(data.CopyObjectResult.ETag);
            console.log(data);
            deletePic(key);
        }
    });
};

var getPics = function getPics(items) {
    var domContainer = document.querySelector('#react');
    ReactDOM.render(React.createElement(Display, { items: items }), domContainer);
};

ReactDOM.render(React.createElement(Banner, null), document.getElementById('banner'));

var refreshBanner = function refreshBanner() {
    ReactDOM.render(React.createElement(Banner, null), document.getElementById('banner'));
};

document.getElementById('submit').onclick = function (e) {
    var file = document.querySelector('input').files[0];
    var title = document.getElementsByName('title')[0].value;

    console.log(title);
    s3.upload({
        Bucket: 'aws-cognito-resources',
        Key: title,
        Body: file
    }, null, function (err, response) {
        if (err) {
            alert(err.message);
            console.log(err);
        } else {
            console.log(response);
            alert(response.key + ' was successfully uploaded to ' + response.Bucket + '.');
        }
    });
};