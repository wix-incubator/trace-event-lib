import { mkdirp, writeFile } from 'fs-extra';
import path from 'path';

export class SnapshotExtractor {
  public static async save(events: unknown[]): Promise<string> {
    const jsonName = __testname.replace(/ /g, '_');
    const jsonSnapshotPath = path.join(__dirname, `../__jsons__/${jsonName}.json`);
    await mkdirp(path.dirname(jsonSnapshotPath));
    await writeFile(jsonSnapshotPath, JSON.stringify(events, undefined, 2) + '\n');
    return jsonSnapshotPath;
  }
}
