import * as path from 'path';

import { PackageJson } from '../../definitions';
import { isPackageJson } from '../../guards';
import { fsReadJsonFile } from './fs';

export const ERROR_INVALID_PACKAGE_JSON = 'INVALID_PACKAGE_JSON';

export async function readPackageJsonFile(path: string): Promise<PackageJson> {
  const packageJson = await fsReadJsonFile(path);

  if (!isPackageJson(packageJson)) {
    throw ERROR_INVALID_PACKAGE_JSON;
  }

  return packageJson;
}

/**
 * Get package.json contents for the project package
 */
export async function readProjectPackageJsonFile(appDirectory: string): Promise<PackageJson> {
  const packageJsonPath = path.resolve(appDirectory, 'package.json');
  return await readPackageJsonFile(packageJsonPath);
}

/**
 * Get package.json contents for the ionic-angular package
 */
export async function readIonicAngularPackageJsonFile(): Promise<PackageJson> {
  const appDirectory = '.'; /* TODO: change this */
  const packageJsonPath = path.resolve(appDirectory, 'node_modules', 'ionic-angular', 'package.json');
  return await readPackageJsonFile(packageJsonPath);
}

/**
 * Get package.json contents for the ionic(cli) package
 */
export async function readCliPackageJsonFile() {
  const packageJsonPath = path.resolve(process.env.CLI_BIN_DIR, '..', 'package.json');
  return await readPackageJsonFile(packageJsonPath);
}

/**
 */
export async function readAppScriptsPackageJsonFile(): Promise<PackageJson> {
  const appDirectory = '.'; /* TODO: change this */
  const packageJsonPath = path.resolve(appDirectory, 'node_modules', '@ionic', 'app-scripts', 'package.json');
  return await readPackageJsonFile(packageJsonPath);
}
