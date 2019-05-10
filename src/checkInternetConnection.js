/* @flow */

import { Platform, NetInfo } from 'react-native';
import checkInternetAccess from './checkInternetAccess';

/**
 * Utility that allows to query for internet connectivity on demand
 * On iOS, the listener is fired immediately after registration
 * On Android, we need to use `isConnected.fetch`, that returns a promise which resolves with a boolean
 * @param timeout
 * @param url
 * @returns {Promise<boolean>}
 */

export default async function checkInternetConnection(
  timeout: number = 3000,
  url: string = 'https://www.google.com/',
  shouldPing: boolean = true,
): Promise<boolean> {
  return NetInfo.isConnected.fetch().then(async (isConnected: boolean) => {
    if (shouldPing) {
      const hasInternetAccess = await checkInternetAccess(timeout, url);
      return hasInternetAccess;
    }
    return isConnected;
  });
}
