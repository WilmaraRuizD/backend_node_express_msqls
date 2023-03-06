const express =require('express');
const router=express.Router();

const mysqlConnection=(require('../db/config'));

//consultar todas las categorias 
router.get('/',(req,res)=>{
  mysqlConnection.query(`SELECT * FROM categoria`,(err,rows,fields)=>{
   if(!err){
     if(rows){
       res.json(rows);
     //   res.status(200).json({ error: 'OK' })
     }else{
         res.status(204).json({ error: 'NO CONTENT BD libros ' })   
     }
     }
   else
   {res.status(500).json({ error: 'INTERNAL SERVER ERROR' })       
 }
 });
 });


module.exports = router;