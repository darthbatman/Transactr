var ajax = require('ajax');
var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');

var x,y,z,deltaY,previousY;

var main = new UI.Card({
  title: 'Wallet',
  icon: 'images/menu_icon.png',
  subtitle: 'Waiting for a transaction!',
  subtitleColor: 'indigo', // Named colors
});

main.show();

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
	
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

var walletOpened = function() {
Accel.on('data', function(e) {          
        Accel.config(25, 1, true);
        
        x = e.accel.x;
        y = e.accel.y;
        z = e.accel.z;
	
				deltaY = y - previousY;
		
				if(deltaY > 400 || deltaY < -400) {
					console.log("Wallet Opened");
						 ajax(
         		 {
               url: 'http://2d5149ff.ngrok.io/walletOpen',
               method: 'get',
               type: 'json',
               crossDomain: true
          		});
				}
				previousY = y;
    });
};

var accel2 = function() {
     Accel.init();
     console.log("accel2 is called");
     setInterval(walletOpened, 10000);     
};

accel2();