const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here


// router.get('/blog',(req,res)=>{
//     res.json({ok:'blog'})
// })


router.get('/blog', async (req,res)=>{
    try{
        const Skipvalue = (req.query.page-1)*5;
        let user = await Blog.find({topic:req.query.search}).skip(Skipvalue).limit(5) ;
        user=user.find((topic)=> topic.topic===req.query.search)
        if(user){
            res.status(200).json({
                status: "Success",
                user
            })
        }else{
            res.status(400).json({
                status: "failed",
                message:`topic is not found in page no ${req.query.page}`
            })
        }
        
    }catch(e){
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
})


router.post('/blog',async (req,res)=>{
    try{
        const user = await Blog.create(req.body)
        res.status(200).json({
            status: "Success",
            user
        })
    }catch(e){
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
})


router.put("/blog/:id", async (req, res) => {
    try {
        // Code to update the document
        console.log(req.body)
        const user = await Blog.update({_id: req.params.id}, req.body);

        res.status(200).json({
            status: "Success",
            user
        })

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});


router.delete("/blog/:id", async (req, res) => {
    try {
        // Code to update the document
        const user = await Blog.deleteOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            user
        })
    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});


module.exports = router;