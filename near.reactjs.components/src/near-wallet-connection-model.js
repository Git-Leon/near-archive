import { connect, Contract, keyStores, WalletConnection, Account } from 'near-api-js';

export function initConnection(config) {
    return connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, config))
}
/**
 * Class used to couple a `Near` object and `WalletConnection`
 */
export class NearWalletConnection {
  constructor(nearConfig) {
    this.account = null;
    this.contract = null;
    this.nearConnection = null;
    this.walletConnection = null;
    this.nearConfig = nearConfig;
  }

  async getAccountState() {
    const walletConnection = await this.getWalletConnection();
    const account = await this.getAccount();
    const state = await account.state();
    return state;
  }

  async getAccountId() {
    const walletConnection = await this.getWalletConnection();
    const accountId = walletConnection.getAccountId();
    return accountId;
  }
  
  async getNearConnection() {
      if(this.nearConnection === null) {
          this.nearConnection = await initConnection(this.nearConfig);
      }
      return this.nearConnection;
  }
  

  async getWalletConnection() {
    if(this.walletConnection === null) {
        this.walletConnection = new WalletConnection(await this.getNearConnection());
    }
    return this.walletConnection;
  }

  async getContract() {
    if(this.contract === null) {
      const walletConnection = await this.getWalletConnection();
      const account = walletConnection.account();
      this.contract = await new Contract(account, this.nearConfig.contractName, {
          viewMethods: [],
          changeMethods: [],
      });
    }
    return this.contract;
  }

  async getAccount() {
    if(this.account === null) {
      const accountId = await this.getAccountId();
      const nearConnection = await this.getNearConnection();
      this.account = new Account(nearConnection.connection, accountId);
    }
    return this.account;
  }
}

export default function getNearWalletConnection(nearConfig) {
    return new NearWalletConnection(nearConfig);
}
