const db = require("../../config/database");
const repo = require("./moduleRepo");

/* ======================
   CREATE MODULE (ADMIN)
====================== */
exports.createModule = async (payload) => {
  if (!payload.module?.module_code)
    throw new Error("module_code required");

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const module = await repo.insertModule(
      client,
      payload.module
    );

    for (const cfg of payload.institute_config || []) {
      await repo.insertInstituteConfig(
        client,
        module.id,
        cfg
      );
    }

    await client.query("COMMIT");
    return module;

  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

/* ======================
   GET MODULES (STEP-4)
====================== */
exports.getModulesForInstitution = async (
  institutionId,
  instituteType
) => {
  if (!institutionId)
    throw new Error("institutionId required");

  if (!instituteType)
    throw new Error("instituteType required");

  return repo.getModulesForInstitution(
    institutionId,
    instituteType
  );
};

/* ======================
   ASSIGN MODULES (STEP-4 SAVE)
====================== */
// exports.assignModules = async (payload) => {
//   if (!payload.institution_id)
//     throw new Error("institution_id required");

//   const client = await db.connect();

//   try {
//     await client.query("BEGIN");

//     await repo.clearOptionalModules(
//       client,
//       payload.institution_id
//     );

//     for (const m of payload.modules || []) {
//       await repo.upsertInstitutionModule(
//         client,
//         payload.institution_id,
//         m
//       );
//     }

//     await client.query("COMMIT");
//     return { institution_id: payload.institution_id };

//   } catch (e) {
//     await client.query("ROLLBACK");
//     throw e;
//   } finally {
//     client.release();
//   }
// };
