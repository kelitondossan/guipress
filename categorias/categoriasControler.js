const express = require("express");
const router = express.Router();


router.get("/categorias", (req, res) => {
 res.send("ROTAS DE CATEGORIAS!")
})


router.get("/admin/categorias/new", (req, res) => {
    res.send("ROTAS PARA CRIAR UMA NOVA CATEGORIA!")
   })
   
module.exports = router;