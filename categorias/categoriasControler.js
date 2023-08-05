const express = require("express");
const router = express.Router();
const categoria = require("./categoria");
const slugify = require("slugify");

router.get("/admin/categorias/new", (req, res) => {
    res.render("admin/categorias/new")
   });

   //slugify traforma string em uma url ex: pc de vc com o slugify ele otimiza para pc-de-vc
   //usar sempre o metodo post  para formularios
   router.post("/categorias/save", (req, res) => {
      var title = req.body.title;
      if(title != undefined){
       categoria.create({
        title: title,
        slug: slugify(title)
       }).then(() =>{
         res.redirect("/");
       })

      }else{
        res.redirect("/admin/categorias/new");
      }
   });

   router.get("/admin/categorias", (req, res) => {
  //pegando os dados do BD e rederiZANDO NA VIEW
     categoria.findAll().then(categorias =>{
        res.render("admin/categorias/index", {categorias: categorias});
     });

  
   });


module.exports = router;