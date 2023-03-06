const express=require('express');
const app=express();
const dev=require('dotenv').config()
const morgan = require('morgan');
const path = require('path');
const cors=require('cors');


//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());



//Archivos estaticos
 app.use(express.static(path.join(__dirname, 'public'))); 
//inicializor servidor
app.set('port', process.env.PORT||3000)

//firebase 

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
 });


//router
app.use(require('./router/categorias'));
app.use(require('./router/libros'));

app.use('/api/libros',require('./router/libros'));
app.use('/api/categoria',require('./router/categorias'));