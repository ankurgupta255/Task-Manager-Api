const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
const router=new express.Router()
const multer=require('multer')
const sharp=require('sharp')
const { sendWelcomeEmail,sendGoodByeEmail }=require('../emails/account')

router.post('/users',async (req,res)=>{
	const user=new User(req.body)
	try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user: user.getPublicProfile(), token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login',async (req,res)=>{
	try{
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token=await user.generateAuthToken()
        res.send({user: user.getPublicProfile(), token})
	}
	catch(e){
		res.status(400).send(e)
	}
})

router.post('/users/logout',auth,async (req,res)=>{
	try{
		req.user.tokens=req.user.tokens.filter((token)=>{
			return token.token!==req.token
		})
		await req.user.save()
		res.send()
	}
	catch(e){
		res.status(500).send()
	}
})

router.post('/users/logoutAll',auth,async (req,res)=>{
	try{
		req.user.tokens=[]
		await req.user.save()
		res.send()
	}
	catch(e){
		res.status(500).send()
	}
})

router.get('/users/me',auth,(req, res) => {
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
    res.send(req.user)
})

// router.get('/users/:id', (req, res) => {
//     const _id = req.params.id
//     User.findById(_id).then((user) =>{
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

router.patch('/users/me',auth,async (req,res)=>{
	const updates=Object.keys(req.body);
	const allowed=['name','email','password','age'];
	const isValid=updates.every((update)=>
		allowed.includes(update)
	)
	if(!isValid){
		return res.status(500).send({error: 'Invalid Parameter'})
	}
	try{
		const _id=req.user._id;
		const user=await User.findById(_id)
		updates.forEach((update)=>
			user[update]=req.body[update]
		)
		await user.save()
		// if(!user){
		// return res.status(404).send()
		// }
		res.send(user)
	}catch(e){
		res.status(500).send(e)
	}
	// .catch((e)=>{
	// 	
	// })
})

router.delete('/users/me',auth,(req,res)=>{
	const _id=req.user._id;
	User.findByIdAndDelete(_id).then((user)=>{
		// if(!user){
		// 	res.status(404).send()
		// }
		user.remove()
		res.send(user)
		sendGoodByeEmail(user.email,user.name)
	}).catch((e)=>{
		res.status(500).send()
	})
})
const upload =multer({
	limits: {
		fileSize: 1000000
	},
	fileFilter(req,file,cb){
		if(!file.originalname.endsWith('.jpg') && !file.originalname.endsWith('.jpeg') && !file.originalname.endsWith('.png')){
			return cb(new Error('File must be a Image'))
		}
		cb(undefined,true)
	}
})

router.post('/user/me/avatar',auth,upload.single('upload'),async (req,res)=>{
	const buffer=await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
	req.user.avatar=buffer
	await req.user.save()
	res.status(200).send()
},(error,req,res,next)=>{
	res.status(400).send({error: error.message})
})

router.delete('/user/me/avatar',auth,async (req,res)=>{
	req.user.avatar=undefined
	await req.user.save()
	res.status(200).send()
},(error,req,res,next)=>{
	res.status(400).send({error: error.message})
})

router.get('/user/:id/avatar',async (req,res)=>{
	try{
		const user=await User.findById(req.params.id)
		if(!user.avatar || !user){
			throw new Error()
		}
		res.set('Content-Type','image/jpg')
		res.send(user.avatar)
	}catch(e){
		res.status(400).send(e)
	}
	
})

module.exports=router