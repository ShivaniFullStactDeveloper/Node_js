// const tosRepo = require("./tosRepo");

// exports.createTos = async (data) => {
//   // basic validation (assignment level)
//   if (!data.name || !data.version || !data.expiry_date) {
//     throw new Error("Required fields missing");
//   }

//   if (new Date(data.expiry_date) <= new Date()) {
//     throw new Error("Expiry date must be in future");
//   }

//   return await tosRepo.createTos(data);
// };
