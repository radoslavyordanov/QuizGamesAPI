var mysql = require("mysql");
function REST_ROUTER(router,connection) {
	var self = this;
	self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection) {
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
		var options = {sql: 'SELECT results.id, results.user_id, results.score, results.date, results.type, username as name FROM results INNER JOIN users ON results.user_id = users.id WHERE type="cars" ORDER BY score DESC;', nestTables: false};
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
		var table = ["results","user_id","score", "type",req.body.user_id,req.body.score, "cars"];
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
		var options = {sql: 'SELECT results.id, results.user_id, results.score, results.date, results.type, username as name FROM results INNER JOIN users ON results.user_id = users.id WHERE type="logos" ORDER BY score DESC;', nestTables: false};
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
		var table = ["results","user_id","score", "type",req.body.user_id,req.body.score, "logos"];
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
		var options = {sql: 'SELECT results.id, results.user_id, results.score, results.date, results.type, username as name FROM results INNER JOIN users ON results.user_id = users.id WHERE type="cities" ORDER BY score DESC;', nestTables: false};
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
		var table = ["results","user_id","score", "type",req.body.user_id,req.body.score, "cities"];
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
		var options = {sql: 'SELECT results.id, results.user_id, results.score, results.date, results.type, username as name FROM results INNER JOIN users ON results.user_id = users.id ORDER BY score DESC;', nestTables: false};
		connection.query(options,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json(rows);
			}
		});
	});

	router.post("/login", function(req,res) {
		var query = "SELECT COUNT(*) as result, username, password, id, user_roleId from users WHERE username=? AND password=?;";
		var params = [req.body.username, req.body.password];
		query = mysql.format(query,params);
		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				if (rows[0].result == 1) {
					res.json({"status" : "success", "id": rows[0].id, "username" : rows[0].username, "password": rows[0].password, "user_roleId": rows[0].user_roleId});
				} else {
					res.json({"status" : "failure"});
				}
			}
		});
	});

	router.post("/register", function(req,res) {
		var checkQuery = "SELECT COUNT(*) as result from users WHERE username=?;";
		var params = [req.body.username];
		checkQuery = mysql.format(checkQuery,params);
		connection.query(checkQuery,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing register checkQuery"});
			} else {
				if (rows[0].result == 1) {
					res.json({"status" : "failure"});
				} else {
					var insertQuery = "INSERT INTO ??(??,??,??) VALUES(?,?,2);"
					var params = ["users","username","password","user_roleId",req.body.username, req.body.password];
					insertQuery = mysql.format(insertQuery,params);
					connection.query(insertQuery,function(err,rows){
						if(err) {
							res.json({"Error" : true, "Message" : "Error executing register insertQuery query"});
						} else {
							var selectQuery = "SELECT ??, ??, ?? FROM ?? WHERE username=? AND password=?;"
							var params = ["id", "username","password","users",req.body.username, req.body.password];
							selectQuery = mysql.format(selectQuery,params);
							connection.query(selectQuery,function(err,rows){
								if(err) {
									res.json({"Error" : true, "Message" : "Error executing register selectQuery query"});
								} else {
									res.json({"status" : "success", "id": rows[0].id, "username" : rows[0].username, "password": rows[0].password});
								}
							});
						}
					});	
				}
			}
		});

	});

	router.post("/addQuiz", function(req,res) {
		var insertQuizQuery = "INSERT INTO ??(??, ??) VALUES (?, ?);"
		var params = ["quiz", "quiz_image", "quiz_type", req.body.quizImage, req.body.quizType];
		insertQuizQuery = mysql.format(insertQuizQuery,params);
		connection.query(insertQuizQuery,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error inserting addQuiz"});
			} else { 
				var insertQuizChoices1 = "INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?);"
				var params1 = ["quiz_choices", "quiz_id", "choice", "is_right_choice", rows.insertId, req.body.quizChoices[0].choice, req.body.quizChoices[0].isRightChoice.toString()];
				insertQuizChoices1 = mysql.format(insertQuizChoices1,params1);
				
				connection.query(insertQuizChoices1,function(err,rows){
					if(err) {
						res.json({"Error" : true, "Message" : "Error inserting addQuiz"});
					} else { 
						if (req.body.quizChoices.length == 1){
							res.json({"status" : "success"});
						}
					}
				});

				if (req.body.quizChoices.length == 4) {
					var insertQuizChoices2 = "INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?);"
					var params2 = ["quiz_choices", "quiz_id", "choice", "is_right_choice", rows.insertId, req.body.quizChoices[1].choice, req.body.quizChoices[1].isRightChoice.toString()];
					var insertQuizChoices2 = mysql.format(insertQuizChoices2, params2);

					var insertQuizChoices3= "INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?);"
					var params3 = ["quiz_choices", "quiz_id", "choice", "is_right_choice", rows.insertId, req.body.quizChoices[2].choice, req.body.quizChoices[2].isRightChoice.toString()];
					var insertQuizChoices3 = mysql.format(insertQuizChoices3,params3);

					var insertQuizChoices4 = "INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?);"
					var params4 = ["quiz_choices", "quiz_id", "choice", "is_right_choice", rows.insertId, req.body.quizChoices[3].choice, req.body.quizChoices[3].isRightChoice.toString()];
					var insertQuizChoices4 = mysql.format(insertQuizChoices4,params4);

					var insertQuizChoices = insertQuizChoices2 + insertQuizChoices3 + insertQuizChoices4;
					connection.query(insertQuizChoices,function(err,rows){
						if(err) {
							res.json({"Error" : true, "Message" : "Error inserting addQuiz"});
						} else { 
							res.json({"status" : "success"});
						}
					});

				}

			}

		});
	});

}

module.exports = REST_ROUTER;