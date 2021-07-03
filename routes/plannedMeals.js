/*
  todo.js -- Router for the ToDoList
*/
const express = require('express');
const router = express.Router();
const PlannedMeal = require('../models/PlannedMeal')


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
      const meal = new PlannedMeal(
        {item:req.body.item,
          dateTime:req.body.dateTime,
          createdAt: new Date(),
          userId: req.user._id
        })
      await meal.save();
      res.redirect('/plannedMeals')
});

router.get('/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      await PlannedMeal.remove({_id:req.params.itemId});
      res.redirect('/plannedMeals')
});


// get the value associated to the key
router.get('/',
  isLoggedIn,
  async (req, res, next) => {
      res.locals.items = await PlannedMeal.find({userId:req.user._id})
      res.render('mealPlanner');
});


module.exports = router;
