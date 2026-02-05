const db = require("../../config/database");
const repo = require("./locationRepo");

exports.saveLocation = async (payload) => {
  if (!payload.institution_id)
    throw new Error("institution_id required");

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    //  ADDRESS
    await repo.upsertAddress(client, payload);

    //  REGIONAL SETTINGS
    await repo.upsertRegional(client, payload);

    // WORKING DAYS
    await repo.replaceWorkingDays(
      client,
      payload.institution_id,
      payload.working_days || []
    );

    await client.query("COMMIT");

    return { institution_id: payload.institution_id };

  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};
