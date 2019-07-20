const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
const ObjectID=mongodb.ObjectID

const connectionURL=process.env.CONNECTION_URL
const databaseName='task-manager'

// const id=new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{useNewUrlParser: true},(error,client)=>{
	if(error){
		return console.log('Unable to connect to database')
	}
	const db=client.db(databaseName)

	// db.collection('users').insertOne({
	// 	_id: id,
	// 	name:'Ankur',
	// 	age: 19
	// },(error,result)=>{
	// 	if(error){
	// 		return console.log('Unable to Insert User')
	// 	}
	// 	console.log(result.ops)
	// })

	// db.collection('users').find({
	// 	age: 19
	// }).toArray((error,result)=>{
	// 	if(error){
	// 		return console.log('No Such record Exists')
	// 	}
	// 	console.log(result)
	// })

	// db.collection('tasks').findOne({
	// 	_id: new ObjectID("5d2790e92735a6395c8366c9")
	// },(error,result)=>{
	// 	if(error){
	// 		return console.log('Unable to find the record')
	// 	}
	// 	console.log(result)
	// })

	// db.collection('tasks').find({
	// 	completed: false
	// }).toArray((error,result)=>{
	// 	if(error){
	// 		return console.log('Unable to find the record')
	// 	}
	// 	console.log(result)
	// })



	// const update=db.collection('users').updateOne({
	// 	_id: new ObjectID("5d279478e304db3c503597ac")
	// },{
	// 	$inc:{
	// 		age: 1
	// 	}
	// })

	// update.then((result)=>{
	// 	console.log(result)
	// })
	// .catch((error)=>{
	// 	console.log(error)
	// })

	const update=db.collection('users').deleteMany({
		completed: false
	})

	update.then((result)=>{
		console.log(result)
	})
	.catch((error)=>{
		console.log(error)
	})

	// db.collection('tasks').insertMany([{
	// 	description:'Grades Semester 1',
	// 	completed: true
	// 	},
	// 	{
	// 	description:'Grades Semester 2',
	// 	completed: false
	// 	}],(error,result)=>{
	// 	if(error){
	// 		return console.log('Unable to Insert User')
	// 	}
	// 	console.log(result.ops)
	// })

})