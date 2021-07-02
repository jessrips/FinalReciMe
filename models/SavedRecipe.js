
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var savedRecipeSchema = Schema( {
  item: String,
  difficulty: String,
  sourceLink: String,
  recipeType: String,
  createdAt: Date,
  userId: ObjectId
} );

module.exports = mongoose.model( 'SavedRecipe', savedRecipeSchema );
