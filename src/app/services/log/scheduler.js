import cron from 'node-cron';
import { deleteLogs } from './functions';

cron.schedule('0 0 1 */6 *', () => {
    deleteLogs();
  });

  