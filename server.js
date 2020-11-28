const fs = require('fs');
const url = require('url');
const express = require('express');
const randomize = require('randomatic');
const bodyParser = require('body-parser');
const { deserialize } = require('v8');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken');
const Users = require('./db/users');
const  Products = require('./db/products');
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());


app.get('/api', (req, res) => {
    res.statusCode=200;
    res.send();
});


app.post('/api/users', async function (req, res) {
    let newUser = req.body;

        // Validar si vienen las propiedades
        if(!newUser.nombre || !newUser.apellido || !newUser.correo || !newUser.sexo || !newUser.fecha || !newUser.password) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: nombre, apellido, correo, sexo, fecha y passwor');
        }
        else {
            // Validar si existe un usuario con el mismo correo o nombres y apellidos
            let sameEmailUser = await Users.find({correo: newUser.correo});
            let sameNameUser = await Users.find({nombre: newUser.nombre, apellido: newUser.apellido});

            if(sameEmailUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo correo');
            }
            else if(sameNameUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo nombre');
            }
            else {
                // Encriptar contraseña
                newUser.password = bcrypt.hashSync(newUser.password, 10);

                let userDocument = Users(newUser);
                userDocument.save()
                    .then(user => {
                        res.statusCode = 201;
                        res.send(user);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });       
            }
        }
});

app.post('/api/login', async function (req, res) {
    // Programar aquí lógica de token
    Users.findOne({correo:req.body.correo}, function(err, result) {
        if (result==null){
            res.statusCode =400;
            res.send("Correo o contraseña incorrecta");
        }
         else{
            if(bcrypt.compareSync(req.body.password, result.password)) {
                let token = jwt.sign({nombre: result.nombre, id: result._id}, 'secret');
                res.statusCode = 202;
                res.send(token);
            }else {
                res.statusCode = 400;
                res.end();
            }   
        }
      });
});

app.use(authMiddleware);

app.get('/api/users', (req, res) => {
    //response.set('Access-Control-Allow-Origin', '*');
    Users.find()
    .then(users => {
        res.statusCode = 200;
        res.send(users);
    })
    .catch(reason => {
        res.statusCode = 500;
        res.end();
    });
});

app.get('/api/products', (req, res) => {
    Products.find()
    .then(products => {
        res.statusCode = 200;
        res.send(products);
    })
    .catch(reason => {
        res.statusCode = 500;
        res.end();
    });
});

app.post('/api/products',(req,res)=>{
    req.body.user_id = req.user_id;
    let newProduct = Products(req.body);
    newProduct.save()
        .then(product=>{
            res.statusCode =201;
            res.send(product);
        })
        .catch(reason=>{
            res.statusCode=500;
            res.end();
        });
});

app.get('/api/users/:email',function (req,res) {
    let email= req.params.email;
    Users.findOne({correo:req.params.email}, function(err, result) {
        if (result==null){
            res.statusCode =400;
            res.send();
        }
         else{
             res.statusCode=200;
             res.send(result);  
        }
      });
});
app.put('/api/users/:email',function (req,res) {
    let newUser=req.body;
    if(!newUser.nombre || !newUser.apellido || !newUser.correo || !newUser.sexo || !newUser.fecha || !newUser.password) {
        res.statusCode = 400;
        res.send('Las propiedades requeridas son: nombre, apellido, correo, sexo, fecha y passwor');
    }
    else {
        Users.findOne({nombre:newUser.nombre}, function(err, result) {
            if (result==null){
                Users.findOneAndUpdate({correo:req.params.email},{$set:{nombre:newUser.nombre}})
                  res.statusCode=202;
                  res.send("Editado")
            }
             else{
                 res.statusCode=400;
                 res.send("Ya existe un usuario con el mismo Nombre");  
            }
          });
        // Validar si existe un usuario con el mismo correo o nombres y apellidos
        /*let sameEmailUser = Users.find({correo: newUser.correo});
        let sameNameUser = Users.find({nombre: newUser.nombre});
        res.statusCode=202;
        res.send(sameEmailUser.length);
        if(sameEmailUser.length > 0) {
            res.statusCode = 400;
            res.send('Ya existe un usuario con el mismo correo');
        }
        else if(sameNameUser.length > 0) {
            res.statusCode = 400;
            res.send('Ya existe un usuario con el mismo nombre');
        }/*
        else {
        Users.findOneAndUpdate({correo:req.params.email},{$set:{"nombre":newUser.nombre}}, function(err, result) {
            if (result==null){
                res.statusCode =400;
                res.send();
            }
             else{
                 res.statusCode=200;
                 res.send(result);  
            }
          });
    }*/
}
});









app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

async function authMiddleware(req, res, next) {
    if(!req.headers['x-auth-user']) {
        res.statusCode = 401;
        res.end();
    }
    else {
        // Validar que el token sea válido
        let token = req.headers['x-auth-user'];
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.statusCode = 401;
                res.end();
            }
            else {
                req.nombre = decoded.nombre;
                req.user_id = decoded.id;
                next();
            }
        });        
    }
}