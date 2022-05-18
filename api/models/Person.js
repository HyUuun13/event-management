/**
 * Person.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    event: {
      type: "string"
    },

    name: {
      type: "string"
    },

    organizer: {
      type: "string"
    },

    venue: {
      type: "string"
    },

    sdate: {
      type: "string",
      
    },

    edate: {
      type: "string",
      
    },

    description: {
      type: "string",
      
    },

    imageUrl: {
      type: "string",
      
    },

    date: {
      type: "string",
      
    },

    stime: {
      type: "string",
      
    },

    etime: {
      type: "string",
      
    },

    quota: {
      type: "number",
      
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    registeredStudents: {
      collection: 'User',
      via: 'registeredEvents'
    }
  },

};

