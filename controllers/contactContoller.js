const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactmodel');
//@desc to get all contacts
//@route GET /api/contacts
//@acess private

const getContact = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts)
});

//@desc to Create contacts
//@route POST /api/contacts
//@acess private

const createContact = asyncHandler(async(req,res)=>{ 
    // console.log(req.body);
    const {name,email,phno} = req.body;
    if(!name || !email || !phno){
        res.send(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phno,
        user_id:req.user.id
    });
    res.status(201).json(contact);
})

//@desc to Find contacts
//@route GET /api/contacts/:id
//@acess private

const findContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.send(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
})

//@desc to Update contacts
//@route PUT /api/contacts/:id
//@acess private
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.send(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id.toString()){
        res.send(401);
        throw new Error("Not authorized");
    }
    const updatecontact = await Contact.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    });
    res.status(200).json(updatecontact);
})

//@desc to Delete contacts
//@route DELETE /api/contacts/:id
//@acess private
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.send(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id.toString()){
        res.send(401);
        throw new Error("Not authorized");
    }
    await Contact.deleteOne({_id:req.params.id});
    // await Contact.remove();
    res.status(200).json({message:"Contact Deleted"});
})
module.exports = {getContact,createContact,findContact,updateContact,deleteContact};    