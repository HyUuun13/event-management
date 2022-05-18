/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).json("User not found");

        await sails.helpers.passwords.checkPassword(req.body.password, user.password)
             .tolerate('incorrect', function (error) {
                 req.body.password = false
             });

         if (!req.body.password) return res.status(401).json("Wrong Password");

        // Start a new session for the new login user
        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = user.username;
            req.session.role = user.role;
            req.session.userid = user.id;
            return res.json(user);
        });
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            //return res.json(req.session.id);
            return res.redirect('/');
        });
    },

    populate: async function (req, res) {

        var user = await User.findOne(req.params.id).populate("registeredEvents");

        if (!user) return res.notFound();

        return res.json(user);
        //return res.view('user/populate', { user: user });
    },

    findEvents: async function (req, res) {


        var user = await User.findOne(req.session.userid).populate("registeredEvents");
        var persons = user.registeredEvents;
        if (!persons) return res.notFound();

        return res.view('user/registeredEvents', { persons: persons });
    },

    add: async function (req, res) {

        if (!await User.findOne(req.session.userid)) return res.status(404).json("User not found.");

        var thatPerson = await Person.findOne(req.params.fk).populate("registeredStudents", { id: req.session.userid });
        var thatPerson1 = await Person.findOne(req.params.fk).populate("registeredStudents");
        var thatPerson2 = await Person.findOne(req.params.fk);

        if (!thatPerson) return res.status(404).json("Event not found.");

        // if (thatPerson.registeredStudents.length > 0)
        //     return res.status(409).json("Already added.");   // conflict

        if (thatPerson1.registeredStudents.length >= thatPerson2.quota) return res.status(409).json("Quota full.");

        await User.addToCollection(req.session.userid, "registeredEvents").members(req.params.fk);

        //return res.ok();
        return res.redirect('/');
    },

    remove: async function (req, res) {

        if (!await User.findOne(req.session.userid)) return res.status(404).json("User not found.");

        var thatPerson = await Person.findOne(req.params.fk).populate("registeredStudents", { id: req.session.userid });

        if (!thatPerson) return res.status(404).json("Event not found.");

        if (thatPerson.registeredStudents.length == 0)
            return res.status(409).json("Nothing to delete.");    // conflict

        await User.removeFromCollection(req.session.userid, "registeredEvents").members(req.params.fk);

        return res.redirect('/');
    },

};

