const express = require("express")
const app = express();
const bodyparser = require("body-parser");
const connection = require("./database/database")
const categoriacontroler = require("./categorias/categoriasControler")
const artigoscontroler = require("./artigos/artigocontroler")


const categoria = require("./categorias/categoria");

const artigo = require("./artigos/artigo");

//view engine chama com set e nao com get
app.set('view engine','ejs');

//chamamos a pasta public que importa css, img, videos
app.use(express.static('public'));

//body-parser para formulçarios
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


//database.js o que voce criou na pasta database
connection.authenticate()
.then(() => {
    console.log("conexão feita com sucesso");
}).catch((error) => {
    console.log(error);
})

//routes controlers
app.use("/", categoriacontroler );
app.use("/", artigoscontroler);


//chamndo a viwes da pasta views para mostrar no navgador
app.get("/", (req, res) => {
    artigo.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(artigos =>{
        categoria.findAll().then(categorias =>{
            res.render("index",{artigos: artigos, categorias: categorias});
        });
       
    });
      
})

app.get("/:slug", (req,res) =>{
    var slug = req.params.slug;
    artigo.findOne({
        where: {
            slug: slug
        }

    }).then(artigo =>{
        if(artigo != undefined){
            categoria.findAll().then(categorias =>{
                res.render("artigos",{artigo: artigo, categorias: categorias});
            });        
        }else{
            res.redirect("/");
        }
    
    }).catch( err =>{
        res.redirect("/");
    }); 
})




app.listen(8080, () => {
console.log("servidor esta rodando na porta 8080!");
})