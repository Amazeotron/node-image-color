var gm = require('gm'),
  huey = require('huey'),
  src = __dirname + '/public/images/red.jpg';

// Huey gets the dominant color of an image.
// This is different than the average color, which
// can be gotten via gm's scale, with a 1x1 value,
// writing that pixel out to a file, then using huey
// to sample the color.
getDominantColor(src, true, function (val) {
  console.log('The dominant color is: %s', val);
});

getAverageColor(src, true, function (val) {
  console.log('The average color is: %s', val);
});

function getDominantColor (imgSrc, isHex, callback) {
  huey(imgSrc, function (err, rgb, image) {
    if (err) throw err;
    var red = image.data[0],
      green = image.data[1],
      blue = image.data[2],
      shifted = red << 16 | green << 8 | blue;

    if (isHex) {
      callback('#' + shifted.toString(16));
    } else {
      callback([red, green, blue]);
    }
  });
}

function getAverageColor (imgSrc, isHex, callback) {
  var out = __dirname + '/public/images/1x1.png';
  gm(imgSrc)
  .scale(1,1)
  .write(out, function (err) {
    if (err) throw err;
    getDominantColor(out, isHex, function (val) {
      callback(val);
    });
  });
}



// Server stuff
//var Static = require('node-static'),
//    file = new Static.Server('./public');
//require('http').createServer(function (req, res) {
//  "use strict";
//  req.addListener('end', function () {
//    file.serve(req, res);
//  }).resume();
//}).listen(8080);
