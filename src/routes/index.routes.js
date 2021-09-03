const{Router}=require('express');
const router=Router();
const Image=require('../models/Image');
const {unlink}=require('fs-extra');
const path= require('path');



router.get('/', async (req, res) => {
  const images = await Image.find();
  res.render('index', { images });
});
  

  router.get('/about', (req, res) => {
    res.send('about!')
  });

  router.get('/upload', (req, res) => {
   
    res.render('upload')
  })
  
  router.post('/upload',async (req, res) => {
    const image=new Image();
    image.title=req.body.title;
    image.description=req.body.description;
    image.filename=req.file.fieldname;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname=req.file.originalname;
    image.mimetype=req.file.mimetype;
    image.size=req.file.size;
    

    await image.save();
    console.log(image);
    res.redirect('/');

    
  });

router.get('/image/:id', async(req, res)=>{
  const { id } = req.params;
  const image = await Image.findById(id);
  console.log(image);
  res.render('profile', { image });
});

  router.get('/image/:id/delete',async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/');
  });

module.exports=router;