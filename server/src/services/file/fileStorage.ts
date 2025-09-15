import { getConfig } from '../../config';

let FileStorage;

if (getConfig().FILE_STORAGE_PROVIDER === 'gcp') {
  FileStorage = require('./googleCloudFileStorage').default;
}

if (getConfig().FILE_STORAGE_PROVIDER === 'aws') {
  FileStorage = require('./awsFileStorage').default;
}

if (getConfig().FILE_STORAGE_PROVIDER === '162.213.249.168') {
  FileStorage = require('./162.213.249.168FileStorage').default;
}

export default FileStorage;
