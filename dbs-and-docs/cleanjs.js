const testcallback = require("notebook")("tripott/dbs-and-docs-test-searchable-ids/latest");

const PouchDB = require('pouchdb');
require('pouchdb/extras/memory');
var db = new PouchDB('movie', {
    adapter: 'memory'
});

let movie = [{
    _id: "actor_EmmaWatson",
    type: "actor",
    firstName: "Emma",
    lastName: "Watson",
    phone: "200 222 2222",
    email: "hermione@yahoo.com",
    active: true
}, {
    _id: "actor_TomCruise",
    type: "actor",
    firstName: "Tom",
    lastName: "Cruise",
    phone: "843 555 1144",
    email: "tomcruise@gmail.com",
    active: true
}, {
    _id: "actor_JohnCandy",
    type: "actor",
    firstName: "John",
    lastName: "Candy",
    phone: "404 867 5309",
    email: "JCandy@sctv.com",
    active: false
}, {
    _id: "actor_ShiaLaBeouf",
    type: "actor",
    firstName: "Shia",
    lastName: "LaBeouf",
    phone: "303 543 9876",
    email: "shia@disturbia.com",
    active: true
}, {
    _id: "actor_PierceBrosnan",
    type: "actor",
    firstName: "Pierce",
    lastName: "Brosnan",
    phone: "330 111 1234",
    email: "pierce@dantespeak.com",
    active: true
}, {
    _id: "movie_PierceBrosnan_1997_DantesPeak",
    name: "Dante\'s Peak",
    actorID: "actor_PierceBrosnan",
    role: "Harry Dalton",
    year: 1997,
    desc: "A vulcanologist (Pierce Brosnan) arrives at a countryside town recently named the second most desirable ... Videos. Dante's Peak -- Pierce Brosnan and Linda Hamilton star in this adrenaline-pumping adventure"
}, {
    _id: "movie_ShiaLaBeouf_2008_IndianaJonesandtheKingdomoftheCrystalSkull",
    name: "Indiana Jones and the Kingdom of the Crystal Skull",
    actorID: "actor_ShiaLaBeouf",
    role: "Mutt Williams",
    year: 2008,
    desc: "The movie pays tribute to the science fiction B-movies of the era, pitting Indiana Jones against Soviet agents—led by Irina Spalko (Cate Blanchett)—searching for a telepathic crystal skull. Indiana is aided by his former lover Marion Ravenwood (Karen Allen) and their son Mutt Williams (Shia LaBeouf)"
}, {
    _id: "movie_JohnCandy_1989_UncleBuck",
    name: "Uncle Buck",
    actorID: "actor_JohnCandy",
    role: "Buck Russell",
    year: 1989,
    desc: "Bachelor and all round slob (John Candy), Buck, babysits his brother's rebellious teenage daughter and her cute younger brother and sister."
}, {
    _id: "movie_JohnCandy_1987_SpaceBalls",
    name: "Space Balls",
    actorID: "actor_JohnCandy",
    role: "Barf the Mog",
    year: 1987,
    desc: "Planet Spaceballs\' President Skroob sends Lord Dark Helmet to steal planet Druidia\'s abundant supply of air to replenish their own, and only Lone Starr can stop them."
}, {
    _id: "movie_JohnCandy_1987_PlanesTrainsandAutomobiles",
    name: "Planes Trains and Automobiles",
    actorID: "actor_JohnCandy",
    role: "Del Griffith",
    year: 1987,
    desc: "A man must struggle to travel home for Thanksgiving with an obnoxious slob of a shower curtain ring salesman as his only companion."
}, {
    _id: "movie_JohnCandy_1986_LittleShopofHorrors",
    name: "Little Shop of Horrors",
    actorID: "actor_JohnCandy",
    role: "Wink Wilkinson",
    year: 1987,
    desc: "A nerdy florist finds his chance for success and romance with the help of a giant man-eating plant who demands to be fed."
}, {
    _id: "movie_TomCruise_1986_TopGun",
    name: "Top Gun",
    actorID: "actor_TomCruise",
    role: "Pete Mitchell",
    year: 1986,
    desc: "As students (Tom Cruise) at the United States Navy's elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom."
}, {
    _id: "movie_TomCruise_1989_RainMan",
    name: "Rain Man",
    actorID: "actor_TomCruise",
    role: "Charlie Babbitt",
    year: 1988,
    desc: "Selfish yuppie Charlie Babbitt's (Tom Cruise) father left a fortune to his savant brother Raymond (Dustin Hoffman) and a pittance to Charlie; they travel cross-country."
}, {
    _id: "movie_EmmaWatson_2005_HarryPotterandtheGobletofFire",
    name: "Harry Potter and the Goblet of Fire",
    actorID: "actor_EmmaWatson",
    role: "Hermione Granger",
    year: 2005,
    desc: "Harry finds himself mysteriously selected as an under-aged competitor in a dangerous tournament between three schools of magic."
}, {
    _id: "movie_EmmaWatson_2007_HarryPotterandtheOrderofthePhoenix",
    name: "Harry Potter and the Order of the Phoenix",
    actorID: "actor_EmmaWatson",
    role: "Hermione Granger",
    year: 2007,
    desc: "With their warning about Lord Voldemort's return scoffed at, Harry and Dumbledore are targeted by the Wizard authorities as an authoritarian bureaucrat slowly seizes power at Hogwarts."
}];

db.bulkDocs(movie, function(err, response) {
    if (err) {
        return console.log(err);
    }
    // handle result
    if (response) {

        // list all the actors.
        db.allDocs({
                // start and end keys that encompass every string with a given prefix
                // using special high Unicode character '\uffff'
                include_docs: true,
                attachments: false,
                startkey: "actor_",
                endkey: "actor_\uffff"
            },
            testcallback(null, {
                ok: true,
                startid: "actor_EmmaWatson",
                endid: "actor_TomCruise"
            }))

        // list all the movies with Emma Watson
        db.allDocs({
                include_docs: true,
                attachments: false,
                startkey: "movie_EmmaWatson_",
                endkey: "movie_EmmaWatson_\uffff"
            },
            testcallback(null, {
                ok: true,
                startid: "movie_EmmaWatson_2005_HarryPotterandtheGobletofFire",
                endid: "movie_EmmaWatson_2007_HarryPotterandtheOrderofthePhoenix"
            }))

        // list all movies with John Candy in 1986 abd 1987
        db.allDocs({
                include_docs: true,
                attachments: false,
                startkey: "movie_JohnCandy_1986",
                endkey: "movie_JohnCandy_1987\uffff"
            },

            testcallback(null, {
                ok: true,
                startid: "movie_JohnCandy_1986_LittleShopofHorrors",
                endid: "movie_JohnCandy_1987_SpaceBalls"
            }))
    }
});
