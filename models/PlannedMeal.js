'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var plannedMealSchema = Schema( {
  item: String,
  dateTime: Date,
  createdAt: Date,
  userId: ObjectId
} );

module.exports = mongoose.model( 'PlannedMeal', plannedMealSchema );

var plannedMealObject = mongoose.model( 'PlannedMeal', plannedMealSchema );

var mysort = {dateTime: 1};

plannedMealObject.find({}, function (err, result) {

    if (err) {

        console.log("error query");

    } else {

        console.log(result);

    }

}).sort(mysort);
