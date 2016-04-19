var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
	var self = this;
	self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
	router.get("/",function(req,res){
		res.json({"Message" : "Hello World !"});
	});
	
	router.get("/quiz/cars",function(req,res){
		var options = {sql: 'SELECT quiz.quiz_id, quiz_image, quiz_type, choice_id, choice, is_right_choice FROM quiz  JOIN quiz_choices ON quiz.quiz_id = quiz_choices.quiz_id WHERE quiz_type="cars";', nestTables: false};
		connection.query(options,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json(rows);
			}
		});
	});

	router.get("/quiz/logos",function(req,res){
		var options = {sql: 'SELECT quiz.quiz_id, quiz_image, quiz_type, choice_id, choice, is_right_choice FROM quiz  JOIN quiz_choices ON quiz.quiz_id = quiz_choices.quiz_id WHERE quiz_type="logos";', nestTables: false};
		connection.query(options,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json(rows);
			}
		});
	});

	router.get("/quiz/cities",function(req,res){
		var options = {sql: 'SELECT quiz.quiz_id, quiz_image, quiz_type, choice_id, choice, is_right_choice FROM quiz  JOIN quiz_choices ON quiz.quiz_id = quiz_choices.quiz_id WHERE quiz_type="cities";', nestTables: false};
		connection.query(options,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json(rows);
			}
		});
	});

	router.get("/results/cars",function(req,res){
		var options = {sql: 'SELECT * FROM results WHERE type="cars" ORDER BY score DESC;', nestTables: false};
		connection.query(options,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json(rows);
			}
		});
	});

	router.post("/results/cars",function(req,res){
		var query = "INSERT INTO ??(??,??, ??) VALUES (?,?,?)";
		var table = ["results","name","score", "type",req.body.name,req.body.score, "cars"];
		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json({"Error" : false, "Message" : "Result added!"});
			}
		});
	});

	router.get("/results/logos",function(req,res){
		var options = {sql: 'SELECT * FROM results WHERE type="logos" ORDER BY score DESC;', nestTables: false};
		connection.query(options,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json(rows);
			}
		});
	});

	router.post("/results/logos",function(req,res){
		var query = "INSERT INTO ??(??,??, ??) VALUES (?,?,?)";
		var table = ["results","name","score", "type",req.body.name,req.body.score, "logos"];
		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json({"Error" : false, "Message" : "Result added!"});
			}
		});
	});

	router.get("/results/cities",function(req,res){
		var options = {sql: 'SELECT * FROM results WHERE type="cities" ORDER BY score DESC;', nestTables: false};
		connection.query(options,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json(rows);
			}
		});
	});

	router.post("/results/cities",function(req,res){
		var query = "INSERT INTO ??(??,??, ??) VALUES (?,?,?)";
		var table = ["results","name","score", "type",req.body.name,req.body.score, "cities"];
		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json({"Error" : false, "Message" : "Result added!"});
			}
		});
	});

	router.get("/results/all",function(req,res){
		var options = {sql: 'SELECT * FROM results ORDER BY score DESC;', nestTables: false};
		connection.query(options,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json(rows);
			}
		});
	});


}

module.exports = REST_ROUTER;