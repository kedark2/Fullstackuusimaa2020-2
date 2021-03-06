const express = require("express");

let router = express.Router();

let database = [];
let id = 500;

router.get("/shopping",function(req,res) {
	let tempDatabase = database.filter(item => item.user === req.session.user)
	return res.status(200).json(tempDatabase);
})

router.post("/shopping",function(req,res) {
	let item = {
		id:id,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		user:req.session.user
	}
	id++;
	database.push(item);
	return res.status(200).json({message:"success"});
})

router.delete("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			if(database[i].user === req.session.user) {
				database.splice(i,1);
				return res.status(200).json({message:"succees"})
			} else {
				return res.status(409).json({message:"conflict"})
			}
		}
	}
	return res.status(404).json({message:"not found"})
})

router.put("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let newItem = {
		id:tempId,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		user:req.session.user
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			if(database[i].user === req.session.user) {
				database.splice(i,1,newItem);
				return res.status(200).json({message:"succees"})
			} else {
				return res.status(409).json({message:"conflict"})
			}
		}
	}
	return res.status(404).json({message:"not found"})
})

module.exports = router;