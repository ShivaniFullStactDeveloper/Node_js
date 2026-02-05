const db = require("../../config/database");
const repo = require("./tosRepo");

exports.createTos = async (payload) => {
    // Validation
  if (!payload.tenant_id) throw new Error("tenant_id required");
  if (!payload.name) throw new Error("ToS name required");
  if (!payload.content) throw new Error("content required");

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const tos = await repo.insertTos(client, payload);

    for (const type of payload.institute_types) {
      await repo.insertInstituteType(client, tos.id, type);
    }

    await client.query("COMMIT");
    return tos;

  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

exports.getActiveTos = async ({ institutionId }) => {
  if (!institutionId) throw new Error("institutionId required");

  return repo.fetchActiveTos(institutionId);
};

exports.acceptTos = async (payload) => {
  if (!payload.tos_id || !payload.institution_id)
    throw new Error("tos_id & institution_id required");

  await repo.insertAcceptance(payload);
};
