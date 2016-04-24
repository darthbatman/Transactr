var twilio = require('twilio');
var app = require('express')();
var http = require('http').Server(app);
var bodyParser  = require('body-parser');
var request = require('request');
var jsonfile = require('jsonfile');
var checksum = require('checksum')
var cs = checksum('dshaw');
var fs = require('fs');
var sha256 = require('sha256');

var client = new twilio.RestClient('AC1855c5ea38c7b8de45e1ce3d85e2caf7','acd884dff899531302bdbd4767b9300e');

var cellNum = '+17327427351';

var sendText = true;

request({ url: "http://api.reimaginebanking.com/accounts/5713187b01c7065b0fceb5c4?key=f22e0b663e5763bc27e5a5b03f49999b", method: 'GET'}, function(err, res, body){
	// console.log("err: " + err);
	// console.log("res: " + res);
	var reminaingBalance = parseInt(body.split("balance\":")[1].split(",")[0]);
	console.log("body: " + reminaingBalance);
});

// http://api.reimaginebanking.com/accounts/5713187b01c7065b0fceb5c4/purchases?key=f22e0b663e5763bc27e5a5b03f49999b


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('<p>Hello HackRU Spring 2016</p>');
});

app.get('/smsReply', function(req, res){
	if (req.query.Body.toString().indexOf("$") != -1){
		var textString = req.query.Body.toString();
		var monetaryValue = textString.replace("$", "");
		var dollarAmt = monetaryValue.split(".")[0];
		var centAmt = monetaryValue.split(".")[1];
		console.log("dollarAmt: " + dollarAmt);
		console.log("centAmt: " + centAmt);

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		today = mm+'/'+dd+'/'+yyyy;
		console.log(today);

		request({ url: "http://api.reimaginebanking.com/accounts/5713187b01c7065b0fceb5c4?key=f22e0b663e5763bc27e5a5b03f49999b", method: 'GET'}, function(err, res, body){
				// console.log("err: " + err);
				// console.log("res: " + res);
				var reminaingBalance = parseInt(body.split("balance\":")[1].split(",")[0]);
				console.log("body: " + reminaingBalance);

				var file = __dirname + '/transaction.txt';
				var obj = {
					date: today,
					transAmt: monetaryValue,
					startBal: reminaingBalance,
					endBal: reminaingBalance - monetaryValue
				};
				 
				jsonfile.writeFile(file, obj, function (err) {
				  console.error(err);


					if (cs === '9b8cebc0421241d087f6ab7e815285af803de7e7') {
					  console.log('yay')
					}

					checksum.file('transaction.txt', function (err, sum) {
					   if (cs === '9b8cebc0421241d087f6ab7e815285af803de7e7') {
					     console.log('yay yay')
					     console.log(sum);

					     var obj = JSON.parse(fs.readFileSync('transaction.txt', 'utf8'));

					     sum = sha256(fs.readFileSync('transaction.txt', 'utf8'));
					     console.log("checksum: " + sum);
					     
					     // fs.watchFile('transaction.json', function () {
					     // 	console.log("watching");
							    fs.stat('transaction.txt', function (err, stats) {
							    	console.log(err);
							        console.log(stats.size);
							        var options = {
									  url:  "https://api.cloudapi.verizon.com/cloud/1/fileupload/intent?path=%2FVZMOBILE%2Fhistory&name=transaction.txt&size=" + stats.size + "&checksum=" + sum + "&chunk=false",
									  headers: {
									    "Authorization": "Bearer PFX77OUM2QQWV545KQ6IEBJ5R6Z2EIDK5LJE44C25UW7EL74WQ73JZ63C42RJVRSS3I5U7KTJJSWCY4CFIK3OCEJM7NIN3IYOSR6X7RSMCKWFNHEVXMSZ2YFKNUXEP3RZZF6PPBOWK3XVJ2SEHELTUFYFV55DQBG7CQS3HUCWYEM4PQZW3OBCOEH7KPWN76T2Q6MACXSYLJICOBI66TGB52RWGPUWUWDPALZQR5X4UC5LM5Q53WLLDWDIUOAA4TX6JILNVYF5WJDJQJU2IOUZP7LD6PQACGUAHT7XEGCUFGYCZ5BZMR3GACQIXYY4MOCVUHYZ5TFPQPQXBD7XU7YMTSZXOCLKLTTQUVSSRA"
									  }
									};

									function callback(error, response, body) {
										console.log("callback");
										console.log(error);
										console.log(response.statusCode);
									  if (!error && response.statusCode == 200) {
									  	console.log(response.body);
									    console.log(JSON.parse(response.body).uploadurls.uploadurl);
									    var newoptions = {
											  url: JSON.parse(response.body).uploadurls.uploadurl + "&checksum=" + sum,
											  headers: {
											    "Authorization": "Bearer PFX77OUM2QQWV545KQ6IEBJ5R6Z2EIDK5LJE44C25UW7EL74WQ73JZ63C42RJVRSS3I5U7KTJJSWCY4CFIK3OCEJM7NIN3IYOSR6X7RSMCKWFNHEVXMSZ2YFKNUXEP3RZZF6PPBOWK3XVJ2SEHELTUFYFV55DQBG7CQS3HUCWYEM4PQZW3OBCOEH7KPWN76T2Q6MACXSYLJICOBI66TGB52RWGPUWUWDPALZQR5X4UC5LM5Q53WLLDWDIUOAA4TX6JILNVYF5WJDJQJU2IOUZP7LD6PQACGUAHT7XEGCUFGYCZ5BZMR3GACQIXYY4MOCVUHYZ5TFPQPQXBD7XU7YMTSZXOCLKLTTQUVSSRA"
											  }
											};

											function newcallback(error, response, body) {
												console.log(error);
												console.log(response);
												console.log(body);
											}

											var obj = JSON.parse(fs.readFileSync('transaction.txt', 'utf8'));
											console.log(obj);

											request({
												url: JSON.parse(response.body).uploadurls.uploadurl + "&checksum=" + sum,
												method: "POST",
												//json: true,
												headers: {
													// "Content-Type": "application/octet-stream",
													//"Content-Transfer-Encoding": "binary",
													"Authorization": "Bearer PFX77OUM2QQWV545KQ6IEBJ5R6Z2EIDK5LJE44C25UW7EL74WQ73JZ63C42RJVRSS3I5U7KTJJSWCY4CFIK3OCEJM7NIN3IYOSR6X7RSMCKWFNHEVXMSZ2YFKNUXEP3RZZF6PPBOWK3XVJ2SEHELTUFYFV55DQBG7CQS3HUCWYEM4PQZW3OBCOEH7KPWN76T2Q6MACXSYLJICOBI66TGB52RWGPUWUWDPALZQR5X4UC5LM5Q53WLLDWDIUOAA4TX6JILNVYF5WJDJQJU2IOUZP7LD6PQACGUAHT7XEGCUFGYCZ5BZMR3GACQIXYY4MOCVUHYZ5TFPQPQXBD7XU7YMTSZXOCLKLTTQUVSSRA"
												},
												body: JSON.stringify(obj)
											}, function(err, res, body){
												//console.log(err);
												//console.log(res.statusCode);
												console.log(body);
												//console.log(body);
											});
									  }
									}

									request(options, callback);
							  //       request({ url: "https://api.cloudapi.verizon.com/cloud/1/fileupload/intent?path=%22%2Fhistory%22&name=%22transaction.json%22&size=%22" + stats.size + "%22&checksum=%22" + sum + "%22&chunk=false", method: 'GET'}, function(err, res, body){
									// 	// console.log("err: " + err);
									// 	// console.log("res: " + res);
									// 	console.log(res);
									// });
							    });
						//});

					     

					   }
					});


				});
		});

		

		client.sendSms({
					to: cellNum,
					from: '+17324918329',
					body: 'Transaction processing.'
				}, function (err, data) {
					//console.log(err);
					//console.log(data);
				});

		request({ url: "http://api.reimaginebanking.com/accounts/5713187b01c7065b0fceb5c4/purchases?key=f22e0b663e5763bc27e5a5b03f49999b", method: 'POST', json: {
		  "merchant_id": "57131d578a710f8e1232487a",
		  "medium": "balance",
		  "purchase_date": "2016-04-17",
		  "amount": parseFloat(monetaryValue),
		  "status": "pending",
		  "description": "string"
		}}, function(err, res, body){
			setTimeout(function(){
				request({ url: "http://api.reimaginebanking.com/accounts/5713187b01c7065b0fceb5c4?key=f22e0b663e5763bc27e5a5b03f49999b", method: 'GET'}, function(err, res, body){
				// console.log("err: " + err);
				// console.log("res: " + res);
				var reminaingBalance = parseInt(body.split("balance\":")[1].split(",")[0]);
				console.log("body: " + reminaingBalance);

				client.sendSms({
					to: cellNum,
					from: '+17324918329',
					body: 'Transaction processed. Remaining balance: ' + (reminaingBalance - monetaryValue)
				}, function (err, data) {
					//console.log(err);
					//console.log(data);
				});

				if (reminaingBalance < 10){
					// 
					request({ url: "http://api.reimaginebanking.com/atms?lat=40.5251&lng=-74.4409&rad=108&key=f22e0b663e5763bc27e5a5b03f49999b", method: 'GET'}, function(err, res, body){
						console.log(JSON.parse(res.body).data[0].name);
						console.log(JSON.parse(res.body).data[0].address.street_number + " " + JSON.parse(res.body).data[0].address.street_name + " " + JSON.parse(res.body).data[0].address.city + ", " + "NJ");
						//console.log(res.body.address);
						//console.log(res.body.address.street_number + res.body.address.street_name + res.body.address.city);
						//console.log(body)
					});
				}
			});
			}, 38000);
			
		});
	}
	// console.log('Message Sent to Twilio Number');
	// res.send('Message Sent to Twilio Number');
	// console.log(req.query.From + ": " + req.query.Body);
	// client.sendSms({
	// 				to: req.query.From,
	// 				from: '+17324918329',
	// 				body: 'Hello from HackRU Spring 2016 - RM'
	// 			}, function (err, data) {
	// 				//console.log(err);
	// 				//console.log(data);
	// 			});
});

app.get('/walletOpen', function(req, res){
	res.send("adsd");
	if (sendText){
		client.sendSms({
					to: cellNum,
					from: '+17324918329',
					body: 'Your wallet was opened. Did you make a transaction? If you did, enter the monetary value of the transaction. Otherwise, enter \"no\"'
				}, function (err, data) {
					console.log(err);
					console.log(data);
				});
		sendText = false;
		waitBro();
	}
	
});

http.listen(8080, function(){
	console.log('listening on *:8080');
	swearArray = [];
});

var waitBro = function(){
	setTimeout(function(){ sendText = true; }, 10000);
};