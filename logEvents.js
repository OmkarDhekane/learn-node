// logEvents.js
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

export const logEvents = async (message, logName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  console.log(logItem);

  try {
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    await fsPromises.appendFile(path.join(logsDir, logName), logItem);
  } catch (err) {
    console.error(err);
  }
};
