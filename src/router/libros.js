const express =require('express');
const router=express.Router();

const mysqlConnection=(require('../db/config'));

//consultar todos los libros 
router.get('/',(req,res)=>{
 mysqlConnection.query(`SELECT * FROM libros `,(err,rows,fields)=>{
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
//traer por id un libro
router.get('/:id',(req,res) =>{
  const {id}= req.params;
  
  mysqlConnection.query(`SELECT * FROM libros WHERE id=?`,[id],(err,rows,fields)=>{
        if(!err){
            if(id == null){
              res.status(204).json({ error: 'NO CONTENT BD libros ' })  
            }
            else{
            res.json(rows) ;}
          }
        else
        {res.status(500).json({ error: 'INTERNAL SERVER ERROR' })}
    });
});
//consultar libro por categoria 

router.get('/filtraCategoria/:categoria_id',(req,res) =>{
  const {categoria_id}= req.params;
  console.log(categoria_id);
  mysqlConnection.query(`SELECT * FROM libros WHERE categoria_id=?`,[categoria_id],(err,rows,fields)=>{
        if(!err){
            if(categoria_id == null){
              res.status(204).json({ error: 'NO CONTENT BD libros ' })  
            }
            else{
            res.json(rows) ;}
          }
        else
        {res.status(500).json({ error: 'INTERNAL SERVER ERROR' })}
    });
});

//Actualizar libros

router.put('/:id',(req,res)=>{
  const {newlibros}=req.body
  const {id} = req.params;

      mysqlConnection.query(`SELECT * FROM libros WHERE id=?`,[id],(err,rows,fields)=>{
          if(!err){
              if(id== null){
                res.status(204).json({ error: 'NO CONTENT BD WLANS BOOKS ' })  
              }
              else{
                if(rows.length>0){
                  mysqlConnection.query('UPDATE libros set ? WHERE id = ?' , [req.body, id], (err, rows)=>{
                      if(!err) {
                       res.json({status: 'libro Updated'});
                        
                        } else {
                          console.log(err);
                        }
                      })
               ;}
              else{res.status(409).json({ error:` libro con id ${id} no existe `})}}
            }
          else
          {res.status(500).json({ error: 'INTERNAL SERVER ERROR' })}
      })
})


//crear registro 
router.post('/',(req,res)=>{
  const data=req.body;
  console.log(data);
     mysqlConnection.query('INSERT INTO libros set ?', data,(err,libros)=>{
      if(!err){
      console.log(libros)
      res.json({status: 'libros creado exitosamente'});
    }
      else{
          res.json(err);
      }
     });
  });

//borra libros 

router.delete('/:id',(req,res) =>{
  const {id}= req.params;
console.log(id)
  mysqlConnection.query(`SELECT * FROM libros WHERE id=?`,[id],(err,rows,fields)=>{
        if(!err){
            if(id== null){
              res.status(204).json({ error: 'NO CONTENT BD WLAN-BOOKS  ' })  
            }
            else{
              if(rows.length>0){
      mysqlConnection.query('DELETE FROM libros WHERE id= ?',[id],(err,rows)=>{
      if(!err){
        res.status(200).json({ error: 'OK' })
      }
      else
      {res.status(500).json({ error: 'Internal error server' })}
  } );
              }
            else{res.status(409).json({ error: 'inmuebles con id no existe' })}}
          }
        else
        {res.status(500).json({ error: 'INTERNAL SERVER ERROR' })}
    });
});


module.exports = router;