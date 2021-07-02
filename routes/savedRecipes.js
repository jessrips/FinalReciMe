/*
  todo.js -- Router for the ToDoList
*/
const express = require('express');
const router = express.Router();
const SavedRecipe = require('../models/SavedRecipe')


/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings

*/

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* add the value in the body to the list associated to the key */
router.post('/',
  isLoggedIn,
  async (req, res, next) => {
      const sRecipe = new SavedRecipe(
        {item:req.body.item,
         createdAt: new Date(),
         difficulty:req.body.dif,
         recipeType:req.body.rtype,
         sourceLink:req.body.slink,
         userId: req.user._id
        })
      await sRecipe.save();
      res.redirect('/savedRecipes')
});

router.get('/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      await SavedRecipe.remove({_id:req.params.itemId});
      res.redirect('/savedRecipes')
});


// get the value associated to the key
router.get('/',
  isLoggedIn,
  async (req, res, next) => {
      res.locals.items = await SavedRecipe.find({userId:req.user._id})
      res.render('sRecipes');
});


module.exports = router;
