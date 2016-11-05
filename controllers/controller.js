/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {

	burger.all(function (data) {
		// console.log(data);
		res.render('index', { burgers: data });
	});

});

router.post('/burgers/create', function (req, res) {

	if(req.body.burger_name) {
		burger.create({ burger_name: req.body.burger_name, devoured: 0 }, function () {
			res.redirect('/burgers');
		});
	} else {
		res.redirect('/burgers');
	}

});

router.put('/burgers/update/:id', function (req, res) {

	if(req.params.id) {
		burger.update({ devoured: req.body.devoured }, { id: req.params.id }, function () {
			res.redirect('/burgers');
		});
	} else {
		res.redirect('/burgers');
	}

});

router.delete('/burgers/delete/:id', function(req, res) {

	if(req.params.id) {
		burger.delete(req.params.id, function(data) {
			res.redirect('/burgers');
		});
	} else {
		res.redirect('/burgers');
	}

});

module.exports = router;
