const express = require("express");
const router = express.Router();


router.get("/artigos", (req, res) => {
 res.send("ROTAS DE ARTIGOS!")
})


router.get("/admin/artigos/new", (req, res) => {
    res.send("ROTAS PARA CRIAR UM NOVO ARTIGO!")
   })
   
module.exports = router;