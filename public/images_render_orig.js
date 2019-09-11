'use strict';

const e = React.createElement;

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return e(
      'img',
      {
        onClick: () => this.setState({ liked: true }),
        src: "data:image/png;base64," + this.props.Body.toString('base64')
      }
    );
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
      'div',
      { id: "display-pane" }

      // document.querySelector('#react').innerHTML += `<div id="display-pane${index}"></div>`;


    )
  }

  componentDidMount() {
    this.props.items.forEach(function (item, index, array) {
      ReactDOM.render(e(Photo, { Body: item }), document.querySelector(`#display-pane`));
    });
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
              items.push(data.Body);
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

var getPics = function (items) {
  var domContainer = document.querySelector('#react');
  ReactDOM.render(e(Display, { items }), domContainer);
  // ReactDOM.render(e(Photo, { Body: data.Body }), domContainer);
}

