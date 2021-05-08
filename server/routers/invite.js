import express from 'express'
import { body, param } from 'express-validator'
import LevelAccess from '../middlewares/LevelAcess.js'
import JWTAuth from '../middlewares/JWTAuthentication.js'
import { BASE_ACCESS_LEVEL } from '../env.js'
import validateBody from '../middlewares/CheckValidation.js'
import Invite from '../models/Invitation.js'
import User from '../models/User.js'

const router = express.Router()

router.post(
    '/generate',
    JWTAuth,
    LevelAccess(BASE_ACCESS_LEVEL),
    body('level').exists().notEmpty().isInt({min: 1, max:BASE_ACCESS_LEVEL}),
    validateBody,
    async (req, res)=>{
        const {level} = req.body
        if(level< req.auth.level){
            return res.status(400).json({
                error: 'Can\'t create invite with higher level of access as your'
            })
        }
        const user = await User.findOne({username: req.auth.username})
        const invite = new Invite({level, creator: user.id})
        await invite.save()
        return res.status(200).json({
            code: invite.code
        })
    }
)

router.get(
    '/',
    JWTAuth,
    async (req, res)=>{
        const {level} = req.auth
        const data = await Invite.find({level: {'$gte':level}}, null, {sort: {used: 1, created: -1}})
        console.log(data)
        return res.json(data)
    }
)

router.delete(
    '/:code',
    JWTAuth,
    param('code').exists().notEmpty(),
    validateBody,
    async (req, res)=>{
        const {code} = req.params
        if(!await Invite.exists({code})){
            return res.status(404).json({
                error: 'Invite not found'
            })
        }
        const invite = await Invite.findOne({code})
        if(invite.used){
            return res.status(400).json({
                error: 'Can\'t delete used invite'
            })
        }
        const user = await User.findOne({username: req.auth.username})
        if( user.id == invite.creator || invite.level>req.auth.level ){
            await Invite.deleteOne({code})
            return res.status(200).json()
        }
        return res.status(400).json({
            error: 'Low level of access'
        })
    }
)

export default router
