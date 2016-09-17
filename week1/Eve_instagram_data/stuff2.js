"use strict"
//1st argument, what to render in the form of a  .jsx a primite react compoment
//2nd argument - where to render it



var ReactDemo = React.createClass({
  render: function() {

    //you can add a bunch of stuff here
    //like a fucntion with it's own return line
    var silly = 'Oh hi sillyness'


    return (
      <div id="fun">
        <CommentBox
          //this is a prop
          //define some props
          comment = "Hello Eve's World!"
          //numeric values in curlies
          number = {123}
          //variables in curlies
          argVar = {silly}
          //boolean values in curlies
          testing = {true}

        />
        <EventGenerator
        //this is a prop
          text = "Click This!"
          propPoop = "Hi"
        />
      </div>
    );
  }
});

//--class 1----------//---------------//

var CommentBox = React.createClass({
  render: function() {
    return (
      //now refer to the props we have
      //display the value of the prop
      <div>
      //curlies denote that it's a reference
      <div>{this.props.comment}</div>
      <div>{this.props.argVar}</div>
      <div>{this.props.number}</div>
      </div>
    );
  }
});

//--class 2----------//---------------//

var EventGenerator = React.createClass({
  render: function() {
    return (
      <div>
      <button>
       {this.props.propPoop}
      </button>
      <button>
       {this.props.text}
      </button>
      </div>
    );
  }
});

ReactDOM.render(
  <ReactDemo/>,
  document.getElementById('react-content')
);


var access_token = '1449686549.f191ea3.b71c686f322b45cab2ff9907286850fe'
var client_id = 'f191ea3ae51940d4b68540095656af83'

var request_id = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + access_token

var request_likes = 'https://api.instagram.com/v1/users/self/media/liked?access_token=' + access_token

var captionArray = [],
    likesAmt = [],
    imgURLs = [];



$.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: request_id,
    success: function(response) {

        //---------option 1 -------------//
        // for (var i=0; i<response.data.length; i++){
        //
        //   if (response.data[i].caption){
        //   // console.log(response.data[i].caption.text)
        //   captionArray.push(response.data[i].caption.text)
        //   likesAmt.push(response.data[i].likes.count)
        //
        // } else{
        //   captionArray.push('none')
        // }
        // }

        //---------option 2 -------------//

        var keysSorted = Object.keys(response.data).sort(function(a, b) {
            return response.data[a].likes.count - response.data[b].likes.count
        })

        // for (var key in response.data) {
        //     console.log(key)
        // }

        for (var i = 0; i < response.data.length; i++) {

            if (response.data[i].caption) {

                captionArray.push(response.data[i].caption.text)
                likesAmt.push(response.data[i].likes.count)
                imgURLs.push(response.data[i].images.thumbnail.url)

            } else {
                captionArray.push('none')
                likesAmt.push(response.data[i].likes.count)
                imgURLs.push(response.data[i].images.thumbnail.url)
            }


        }


        displayInfo(captionArray, likesAmt, imgURLs);
    }
});






function displayInfo(captions, likes, imgs) {
    for (var i in captions) {
        // console.log(likes[i])
        var container = document.createElement('div');
        $('#my-content').append(container);

        container.setAttribute('id', 'container-' + i);
        $('#container-' + i).addClass('container');

        $('.container').draggable();

        var img = document.createElement('img');
        img.src = imgURLs[i]
        $('#container-' + i).append(img);
        var num = document.createElement('p');
        num.setAttribute('class', 'nums');
        $('#container-' + i).append(num);
        num.innerHTML = 'likes: ' + likes[i]
        var rnd = Math.floor((Math.random() * 3) + -3);
        var oElement = document.getElementById('container-' + i);
        oElement.style.webkitTransform = 'rotate(' + rnd + 'deg)';
        //scale up based on likes amount
        if (likes[i] > 10 && likes[i] < 15) {
            console.log('btwn 10 and 15')
            oElement.style.webkitTransform = 'scale(.9)';
        } else if (likes[i] <= 10) {
            console.log('less 10')
            oElement.style.webkitTransform = 'scale(.3)';
        } else if (likes[i] >= 15) {
            console.log('largest')
            oElement.style.webkitTransform = 'scale(1.5)';
        }
        var captionText = document.createElement('p');
        captionText.setAttribute('class', 'captions');
        $('#container-' + i).append(captionText);
        captionText.innerHTML = captions[i]

    }
}