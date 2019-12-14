const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/startDB', { useNewUrlParser: true })


const solarSystemSchema = new Schema({ 
    planets: [{type: Schema.Types.ObjectId, ref: 'Planets'}],
    starName: String,
})
  
  const planetSchema = new Schema({ 
    name: String,
    system: {type: Schema.Types.ObjectId, ref: 'SolarSys'},
    visitors: [{type: Schema.Types.ObjectId, ref: 'Visitors'}]
    
})

  const visitorsSchema = new Schema({ 
    name: String,
    homePlanet: {type: Schema.Types.ObjectId, ref: 'Planets'},
    visitedPlanets: [{type: Schema.Types.ObjectId, ref: 'Planets'}]
})

const SolarSys = mongoose.model("SolarSys", solarSystemSchema)
const Planets = mongoose.model("Planets", planetSchema)
const Visitors = mongoose.model("Visitors", visitorsSchema)
  

let s1 = new SolarSys ({
    planets:[],
    starName: "Moon"
})

let p1 = new Planets ({
    name: "Saturn",
    system: s1.id,
    visitors:[]
})

let v1 = new Visitors ({
    name: "Danny",
    homePlanet: p1.id,
    visitedPlanets: [p1.id]
})

// s1.planets.push()

// s1.save()
// p1.save()
// v1.save()

// console.log(s1)
// console.log(p1)
// console.log(v1)

Visitors.find({})
.populate({
    path: 'visitedPlanets',
        populate: {
            path: 'planets'
        }
})
.exec(function(err, visitor){
    console.log(visitor[0])
})




// .populate("visitedPlanets")
// .exec(function(err, visitor){
//     console.log(visitor)
// })



// Book.findOne({})
//     .populate({
//         path: 'reviews',
//         populate: {
//             path: 'critic'
//         }
//     })
//     .exec(function (err, book) {
//         console.log(book.reviews)
//     })

// Book.findOne({})
//     .populate("reviews")
//     .exec(function (err, book) {
//         console.log(book.reviews)
//     })



const fetchData = async function (surname) {
    let answer = await Person.find({ lastName: surname })
    console.log(answer)
}

fetchData(hagai)