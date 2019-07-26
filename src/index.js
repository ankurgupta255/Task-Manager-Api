const express=require('express')
require('./db/mongoose')
const Task=require('./models/task')
const userRouter=require('./routers/user');
const taskRouter=require('./routers/task');
const bcrypt=require('bcryptjs')
const cors=require('cors');
const app=express()
const port=process.env.PORT || 3000
const url='https://github.com/ankurgupta255/Task-Manager-Api'

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
	res.send(`Welcome to the Task-Manager-API. Refer to the Documentation at ${url} to get to know better how this API works...`)
})

app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
	console.log('Server is up on port ' + port)
})
