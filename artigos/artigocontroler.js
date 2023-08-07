const express = require("express");
const router = express.Router();
const categoria = require("../categorias/categoria");
const artigo = require("./artigo")
const slugify = require("slugify")

router.get("/admin/artigos", (req, res) => {
  artigo.findAll().then(artigos =>{
    return res.render("admin/artigos/index", {artigos: artigos})
  })
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
   
module.exports = router;