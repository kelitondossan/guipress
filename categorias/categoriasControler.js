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
         res.redirect("/admin/categorias");
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

   router.post("/categorias/delete", (req,res) =>{
      var id = req.body.id;
  //verificando de der algun resultado indefinido       
      if(id != undefined){
         if(!isNaN(id)){
           
            //função delete
            categoria.destroy({
               where: {
                  id: id
               }
            }).then(() =>{
               res.redirect("/admin/categorias");
            })


         }else{ /// se nao  for numerico
            res.redirect("/admin/categorias");
         }
      }else{ // se for null
         res.redirect("/admin/categorias");
      }
   });


  router.get("/admin/categorias/edit/:id", (req, res) =>{
   var id = req.params.id;
    
   if(isNaN(id)){
      res.redirect("/admin/categorias");
   }

    categoria.findByPk(id).then(categoria => {
      if(categoria != undefined){
           
         res.render("admin/categorias/edit",{categoria: categoria});

      }else{
               // Use o comando return após enviar a resposta para evitar o erro.
        return   res.redirect("/admin/categorias");
      }
    }).catch(erro => {
          // Use o comando return após enviar a resposta para evitar o erro.
       return res.redirect("/admin/categorias");
    })
  })

  //rota de atualização dos dados da categoria
router.post("/categorias/update", (req,res) =>{
   var id = req.body.id;
   var title = req.body.title;

   categoria.update({title: title, slug: slugify(title)}, {
      where: {
         id: id
      }
   }).then(() => {
      return res.redirect("/admin/categorias");
   })
})


module.exports = router;