import { Logger } from 'pino';
import { EmailOptions } from '../config/types';
import { BuildEmailResult } from './types';
export default function buildEmail(emailConfig: EmailOptions | undefined, logger: Logger): BuildEmailResult;
