// src/module/terminology/terminologyService.js
const db = require('../../config/db');
const repo = require('./terminologyRepo');

module.exports = {
  seedTerminology,
  loadTerminology,
};

async function seedTerminology(payload) {
  const { institution_type, language_code, groups } = payload;

  for (const group of groups) {
    const groupRow = await repo.createGroup(db, group);

    const groupId = groupRow?.id || (
      await db.query(
        'SELECT id FROM terminology_group WHERE group_key = $1',
        [group.group_key]
      )
    ).rows[0].id;

    for (const term of group.terms) {
      const termRow = await repo.createTerm(db, {
        group_id: groupId,
        term_key: term.term_key,
        base_label: term.base_label,
      });

      const termId = termRow?.id || (
        await db.query(
          'SELECT id FROM terminology_term WHERE term_key = $1',
          [term.term_key]
        )
      ).rows[0].id;

      await repo.createDefault(db, {
        term_id: termId,
        institution_type,
        language_code,
        label: term.label,
      });
    }
  }
}

async function loadTerminology(institutionType, language) {
  return repo.getTerminology(db, institutionType, language);
}
