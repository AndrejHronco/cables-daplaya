const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {

  constructor(storageDir) {
    this.MAIN_CONFIG_NAME = 'daplaya-preferences';
    this.APIKEY_FIELD = 'apiKey';
    this.PATCHID_FIELD = 'patchId';
    this.CURRENTPATCHDIR_FIELD = 'currentPatchDir';
    this.STORAGEDIR_FIELD = 'storageDir';
    this.WINDOW_X_POS_FIELD = 'windowX';
    this.WINDOW_Y_POS_FIELD = 'windowY';
    this.WINDOW_FULLSCREEN = 'windowFullscreen';
    this.WINDOW_HEIGHT = 'windowHeight';
    this.WINDOW_WIDTH = 'windowWidth';

    this.opts = {};
    this.opts.defaults = {};
    this.opts.configName = this.MAIN_CONFIG_NAME;
    this.opts.defaults[this.APIKEY_FIELD] = null;
    this.opts.defaults[this.PATCHID_FIELD] = null;
    this.opts.defaults[this.CURRENTPATCHDIR_FIELD] = null;
    this.opts.defaults[this.STORAGEDIR_FIELD] = storageDir;

    this.opts.defaults[this.WINDOW_X_POS_FIELD] = null;
    this.opts.defaults[this.WINDOW_Y_POS_FIELD] = null;
    this.opts.defaults[this.WINDOW_FULLSCREEN] = false;
    this.opts.defaults[this.WINDOW_HEIGHT] = 768;
    this.opts.defaults[this.WINDOW_WIDTH] = 1366;

    this.data = this.opts.defaults;
    this.refresh();
  }

  refresh() {
    if (this.data && this.data.hasOwnProperty(this.STORAGEDIR_FIELD) && this.data[this.STORAGEDIR_FIELD]) {
      const userDataPath = path.join(this.data[this.STORAGEDIR_FIELD], this.opts.configName + '.json');
      this.data = Store.parseDataFile(userDataPath, this.opts.defaults);
    }
  }

  get(key) {
    this.refresh();
    if (!this.data) {
      return null;
    }
    return this.data[key];
  }

  set(key, val, silent) {
    this.data[key] = val;
    let configFileName = path.join(this.data[this.STORAGEDIR_FIELD], this.opts.configName + '.json');
    if (!silent) {
      fs.writeFileSync(configFileName, JSON.stringify(this.data));
    }
  }

  // convenience methods
  getApiKey() {
    return this.get(this.APIKEY_FIELD);
  }

  setApiKey(value) {
    this.set(this.APIKEY_FIELD, value);
  }

  getCurrentPatchDir() {
    return this.get(this.CURRENTPATCHDIR_FIELD);
  }

  setCurrentPatchDir(value) {
    this.set(this.CURRENTPATCHDIR_FIELD, value);
  }

  getStorageDir() {
    return this.get(this.STORAGEDIR_FIELD);
  }

  setStorageDir(value) {
    this.set(this.STORAGEDIR_FIELD, value, true);
  }

  getPatchId() {
    return this.get(this.PATCHID_FIELD);
  }

  setPatchId(value) {
    this.set(this.PATCHID_FIELD, value);
  }

  getWindowXPos() {
    return this.get(this.WINDOW_X_POS_FIELD);
  }

  setWindowXPos(value) {
    this.set(this.WINDOW_X_POS_FIELD, value);
  }

  getWindowYPos() {
    return this.get(this.WINDOW_Y_POS_FIELD);
  }

  setWindowYPos(value) {
    this.set(this.WINDOW_Y_POS_FIELD, value);
  }

  getFullscreen() {
    return this.get(this.WINDOW_FULLSCREEN);
  }

  setFullscreen(value) {
    this.set(this.WINDOW_FULLSCREEN, value);
  }

  getWindowHeight() {
    return this.get(this.WINDOW_HEIGHT);
  }

  setWindowHeight(value) {
    this.set(this.WINDOW_HEIGHT, value);
  }

  getWindowWidth() {
    return this.get(this.WINDOW_WIDTH);
  }

  setWindowWidth(value) {
    this.set(this.WINDOW_WIDTH, value);
  }

  // helper methods
  static parseDataFile(filePath, defaults) {
    try {
      let jsonContent = fs.readFileSync(filePath);
      return JSON.parse(jsonContent);
    } catch (error) {
      return defaults;
    }
  }
}

// expose the class
module.exports = Store;
