import execa from 'execa';
import { resolve } from 'path';
import { Adapter as CrontabAdapter, RegisterTaskOptions } from '../components/cron/adapter';

export function createUnixCrontabAdapter(): CrontabAdapter {
  async function registerTask(options: RegisterTaskOptions): Promise<void> {
    const { id, schedule, url } = options;

    try {
      const [nodePath, existing] = await Promise.all([
        getNodePath(),
        getExistingCrontab(),
      ]);

      const scriptPath = getScriptPath();

      const crontabEntry = getCrontabEntry(schedule, {
        execPath: nodePath,
        scriptPath,
        scriptArguments: [id, url],
      });

      await setCrontab(existing + '\n' + crontabEntry + '\n');
    } catch (e) {
      // @TODO handle error
      console.log('E');
      console.log(e);
    }
  }

  return {
    registerTask,
  };
}

async function setCrontab(content: string) {
  await execa('crontab', ['-'], {
    input: content,
  });
}

async function getExistingCrontab(): Promise<string> {
  try {
    const { stdout } = await execa('crontab', ['-l']);

    return stdout;
  } catch (e) {
    return '';
  }
}

async function getNodePath() {
  const { stdout: nodePath } = await execa('which', ['node']);

  return nodePath;
}

function getScriptPath() {
  return resolve(__dirname, '../', 'crontest.js');
}

interface GetCrontabEntryOptions {
  execPath: string;
  scriptPath: string;
  scriptArguments?: string[];
}

function getCrontabEntry(schedule: string, options: GetCrontabEntryOptions): string {
  const { execPath, scriptPath, scriptArguments = [] } = options;
  const base = `${schedule} ${execPath} ${scriptPath}`;

  if (!scriptArguments.length) return base;

  return [base, ...scriptArguments].join(' ');
}
