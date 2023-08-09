const express = require("express");
const router = express.Router();
const categoria = require("../categorias/categoria");
const artigo = require("./artigo")
const slugify = require("slugify")

//incluindo na minha busca o model
router.get("/admin/artigos", (req, res) => {
  artigo.findAll({
    include: [{ model: categoria }],
  })
    .then((artigos) => {
      // Faz uma iteração pelos artigos para verificar e corrigir categorias nulas
      artigos.forEach((artigo) => {
        if (!artigo.categoria) {
          artigo.categoria = { title: "Categoria Inválida" }; // Define uma categoria padrão
        }
      });

      return res.render("admin/artigos/index", { artigos: artigos });
    })
    .catch((error) => {
      console.error("Erro:", error);
      return res.status(500).send("Erro interno do servidor");
    });
});



router.get("/admin/artigos/new", (req, res) => {
     categoria.findAll().then(categorias =>{
         res.render("admin/artigos/new", {categorias: categorias})
     })
   })

   router.post("/artigos/save", (req, res) =>{
    var title = req.body.title;
    var body = req.body.body;
    var categoria = req.body.categoria;

    artigo.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoriaId: categoria
    }).then(() =>{
      return  res.redirect("/admin/artigos");
    });
   });

    //rota deleção de categoria
    router.post("/artigos/delete", (req,res) =>{
      var id = req.body.id;
  //verificando de der algun resultado indefinido       
      if(id != undefined){
         if(!isNaN(id)){
           
            //função delete
            artigo.destroy({
               where: {
                  id: id
               }
            }).then(() =>{
               res.redirect("/admin/artigos");
            })


         }else{ /// se nao  for numerico
            res.redirect("/admin/artigos");
         }
      }else{ // se for null
         res.redirect("/admin/artigos");
      }
   });

   
module.exports = router;