const expess = require("express");
const app = expess();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(expess.json());

const db = mysql.createConnection({
    host:"database-electiva.cr2iu0swgrdw.us-east-2.rds.amazonaws.com",
    user:"admin",
    password:"12345678",
    database:"electiva"
});


app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


app.get("/empleados",(req,res)=>{
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM empleados WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
}); 

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})


