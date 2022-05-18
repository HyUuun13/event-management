/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  if (await Person.count() > 0) {
    return generateUsers();
  }

  await Person.createEach([
    { event: "KPOP Dance Cover Contest",description:"K-POP Dance Cover Contest",Ldescription:"K-POP Dance Cover Contest. Solo dance and group dance are welcomed.", imageUrl:"https://www.linkpicture.com/q/B75F53B8-673F-4CBE-A345-88804C0B61AE.jpeg", organizer:"Student Union", date:"2021-10-29",stime:"18:00",etime:"20:00",venue:"AAB",quota:"50",highlight:"yes" },
    { event: "Singing contest",description:"2021 Singing contest",Ldescription:"Singing contest. Show your talent!", imageUrl:"https://s3.bmp.ovh/imgs/2021/10/cc070d472f566e0a.jpeg", organizer:"Music Society", date:"2021-11-02",stime:"18:00",etime:"20:00",venue:"DLB",quota:"50",highlight:"yes" },
    { event: "MTR Graduate Development Programme",description:"Recruitment Talk: MTR Graduate Development Programme 2022",Ldescription:"MTR Coporations Limited is now looking for talents to join its Graduate Development Programmes. Final year students are welcome to join a recruitment talk to learn more about the programme details.", imageUrl:"https://s3.bmp.ovh/imgs/2021/10/ad0249d51e574df3.jpeg", organizer:"Registry", date:"2021-10-28",stime:"16:00",etime:"17:20",venue:"OEE",quota:"45",highlight:"" },
    { event: "Meeting with Disney Imagineer",description:"Meeting with Disney Imagineer",Ldescription:"During this interactive seminar, you can meet with Disney Imagineer in person and sneak peak of the creative force behind Disney Parks and Resorts around the world! Also, you can learnt the unique disciplines at Imagineering, and how they approach creative projects by turning fanciful ideas into immersive guest experiences. At the end of the session, the speaker will introduce you the opportunity to learn a once-in-a-lifetime experience at the Walt Disney Imagineering's offices by joining the Disney ImagiNaitons Competition.", imageUrl:"https://s3.bmp.ovh/imgs/2021/10/e5b1ad8ec3557968.jpeg", organizer:"Registry", date:"2021-10-30",stime:"18:00",etime:"19:30",venue:"DLB",quota:"25",highlight:"yes" },
    { event: "Watch Movie",description:"Watch movie",Ldescription:"Watch Black Widow", imageUrl:"https://s3.bmp.ovh/imgs/2021/10/1584950bd9b705ef.jpeg", organizer:"Student Union", date:"2021-11-03",stime:"18:00",etime:"20:20",venue:"WLB",quota:"40",highlight:"yes" }
    // etc.
  ]);

  return generateUsers();

  async function generateUsers() {

    if (await User.count() > 0) {
      return;
    }

    var hashedPassword = await sails.helpers.passwords.hashPassword('123456');
    var hashedPassword1 = await sails.helpers.passwords.hashPassword('0801');
    
    await User.createEach([
      { username: "Admin1", password: hashedPassword, role:"admin" },
      { username: "Admin2", password: hashedPassword, role:"admin" },
      { username: "Irene", password: hashedPassword1, role:"students" },
      { username: "Seulgi", password: hashedPassword1, role:"non-member"  },
      { username: "Wendy", password: hashedPassword1, role:"non-member"  },
      { username: "Joy", password: hashedPassword1, role:"students"  },
      { username: "Yeri", password: hashedPassword1, role:"students" },
      // etc.
    ]);

    const kpop = await Person.findOne({event: "KPOP Dance Cover Contest"});
    const irene = await User.findOne({username: "Irene"});

    await User.addToCollection(irene.id, 'registeredEvents').members(kpop.id);
  }

};
