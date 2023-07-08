import { CommitTransaction } from '../../database/types';


export const commitTransaction: CommitTransaction = async function commitTransaction() {
  if (!this.connection.get('replicaSet')) {
    return;
  }
  if (!this.session?.inTransaction()) {
    this.payload.logger.warn('commitTransaction called when no transaction exists');
    return;
  }
  await this.session.commitTransaction();
  this.session = await this.session.endSession();
};
