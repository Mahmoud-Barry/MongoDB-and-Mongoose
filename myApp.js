require('dotenv').config();
mongoose  = require('mongoose');
let Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new Schema({
    name: String,
    age: Number,
    favoriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);




const createAndSavePerson = (done) => {
   let mah = new Person({name: 'Mah', age: 21, favoriteFoods:       ['petit poid', 'sagasaga']});
    mah.save((err, data) => err ? done(err) : done(null, data));
};

const createManyPeople = (arrayOfPeople, done) => {
  let manyPeople = Person.create(arrayOfPeople,(((err,data)=> err? done(err):done(null,data))))
  
};

const findPeopleByName = (personName, done) => {
  Persone.find({name:personName},(err,data)=> err? 
    console.log("eroroiosdfjsoi",err)
    : done(null,data))
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err) return console.error(err)
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId},(err,data)=> err? done(err):done(null,data))
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId},(err,person)=>{
    if(err) return done(err)
    if(!person) return console.log("no persone found")
    person.favoriteFoods.push(foodToAdd)
    person.save((err,data)=>{
      err? done(err): done(null,data)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,data)=>{
    err? done(err) : done(null,data)
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id:personId},(err,data)=>{
    err? done(err):done(null,data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:nameToRemove},(err,data)=>{
    err? done(err):done(null,data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 'asc'})
  .limit(2)
  .select(['name', 'favoriteFoods'])
  .exec((err, data) => {
    if(err) return console.log(err)
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
