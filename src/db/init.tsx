// db/init.ts
import { createUsersTable } from './users';
import { createResultsTable } from './results';

let initialized = false;

export async function initDatabase() {
  if (initialized) return;
  await createUsersTable();
  await createResultsTable();
  initialized = true;
}
