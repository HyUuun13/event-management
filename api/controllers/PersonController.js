/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - create
    create: async function (req, res) {

        if (req.method == "GET") return res.view('person/create');

        var person = await Person.create(req.body).fetch();
        var thatEvent = await Person.findOne(person.id).populate("registeredStudents", { id: req.session.userid });

        //return res.status(201).json({ id: person.id });
        return res.view('person/read', { person: person, event: thatEvent });

    },

    // action - jsjson function
    json: async function (req, res) {

        var everyones = await Person.find();

        return res.json(everyones);
    },

    // action - list admin
    admin: async function (req, res) {

        var everyones = await Person.find();

        return res.view('person/admin', { persons: everyones });
    },

    // action - read event detail
    read: async function (req, res) {

        var thatPerson = await Person.findOne(req.params.id);

        if (!thatPerson) return res.notFound();

        var thatEvent = await Person.findOne(req.params.id).populate("registeredStudents", { id: req.session.userid });

        return res.view('person/read', { person: thatPerson, event: thatEvent });
    },

    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {

            var thatPerson = await Person.findOne(req.params.id);

            if (!thatPerson) return res.notFound();

            return res.view('person/update', { person: thatPerson });

        } else {

            var updatedPerson = await Person.updateOne(req.params.id).set(req.body);
            var thatEvent = await Person.findOne(req.params.id).populate("registeredStudents", { id: req.session.userid });

            if (!updatedPerson) return res.notFound();

            //return res.ok("Record updated");
            return res.view('person/read', { person: updatedPerson, event: thatEvent });
        }
    },

    //action - delete 
    delete: async function (req, res) {

        var deletedPerson = await Person.destroyOne(req.params.id);
        var everyones = await Person.find();

        if (!deletedPerson) return res.notFound();

        //return res.ok("Event deleted.");

        return res.view('person/admin', { persons: everyones });
    },

    //action - homepage
    home: async function (req, res) {

        var thosePersons = await Person.find({
            limit: 4,
            sort: 'createdAt DESC',
            where: { highlight: "yes" }
        });

        return res.view('person/home', { persons: thosePersons });
    },

    //action - paginate
    //  paginate: async function (req, res) {

    //     var perPage = Math.max(req.query.perPage, 2) || 2;

    //     var somePersons = await Person.find({
    //         limit: perPage,
    //         skip: perPage * (Math.max(req.query.current - 1, 0) || 0)
    //     });

    //     var count = await Person.count();

    //     return res.view('person/search', { persons: somePersons, total: count });
    // },

    // search function
    search: async function (req, res) {
        // if (req.method == "GET") {
        // var whereClause = {};
        // if (req.query.event) whereClause.event = { contains: req.query.event };
        // if (req.query.organizer) whereClause.organizer = req.query.organizer;
        // if(req.query.sdate && req.query.edate) {
        //     whereClause.date = {'<=': req.query.edate, '>=': req.query.sdate}; 
        // } else if(req.query.sdate) {
        //     whereClause.date = {'>=': req.query.sdate, '<=':"9999-99-99"};
        // } else if(req.query.edate) {
        //     whereClause.date = {'<=': req.query.edate, '>=':"0000-00-00"};
        // }
        // if (req.query.venue) whereClause.venue = req.query.venue;
        // var thosePersons = await Person.find({
        //     where: whereClause,
        //     sort: 'event'
        // });

        // var Event = "";
        // var Organizer = "";
        // var eDate = "";
        // var sDate = "";
        // var Venue = "";

        // if (req.query.event) var Event = req.query.event;
        // if (req.query.organizer) var Organizer = req.query.organizer;
        // if (req.query.edate) var eDate = req.query.edate;
        // if (req.query.sdate) var sDate = req.query.sdate;
        // if (req.query.venue) var Venue = req.query.venue;

        // var count = thosePersons.length;
        // var url = "/person/search?event=" + Event + "&organizer=" + Organizer + "&sdate=" + sDate + "&edate=" + eDate + "&venue=" + Venue + "&perPage=";
//page

        if (req.wantsJSON) {

                var whereClause = {};
                if (req.query.event) whereClause.event = { contains: req.query.event };
                if (req.query.organizer) whereClause.organizer = req.query.organizer;
                if (req.query.sdate && req.query.edate) {
                    whereClause.date = { '<=': req.query.edate, '>=': req.query.sdate };
                } else if (req.query.sdate) {
                    whereClause.date = { '>=': req.query.sdate, '<=': "9999-99-99" };
                } else if (req.query.edate) {
                    whereClause.date = { '<=': req.query.edate, '>=': "0000-00-00" };
                }
                if (req.query.venue) whereClause.venue = req.query.venue;
                var thosePersons = await Person.find({
                    where: whereClause,
                    sort: 'event'
                });

                var Event = "";
                var Organizer = "";
                var eDate = "";
                var sDate = "";
                var Venue = "";

                if (req.query.event) var Event = req.query.event;
                if (req.query.organizer) var Organizer = req.query.organizer;
                if (req.query.edate) var eDate = req.query.edate;
                if (req.query.sdate) var sDate = req.query.sdate;
                if (req.query.venue) var Venue = req.query.venue;

                var count = thosePersons.length;
                var url = "/person/search?event=" + Event + "&organizer=" + Organizer + "&sdate=" + sDate + "&edate=" + eDate + "&venue=" + Venue + "&perPage=";

                var perPage = Math.max(req.query.perPage, 2) || 2;

                var somePersons = await Person.find({
                    where: whereClause,
                    limit: perPage,
                    skip: perPage * (Math.max(req.query.current - 1, 0) || 0)
                });
                //console.log(somePersons);

                return res.json(somePersons);

            } else {

                var count = await Person.count();

                return res.view('person/search', { total: count});
            }

            // return res.view('person/search', { persons: somePersons, total: count, url: url});
        
    },

    populate: async function (req, res) {

        var person = await Person.findOne(req.params.id).populate("registeredStudents");

        if (!person) return res.notFound();

        return res.json(person);
        //return res.view('person/registeredStudents', { persons: person });
    },

    findStudents: async function (req, res) {

        var person = await Person.findOne(req.params.id).populate("registeredStudents");
        var students = person.registeredStudents;
        //var user = await Person.findOne(req.params.id, 'registeredStudents').members;
        if (!person) return res.notFound();

        return res.view('person/registeredStudents', { person: person, users: students });
    }


};

