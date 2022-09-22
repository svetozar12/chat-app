import { BlobServiceClient } from '@azure/storage-blob';
import { dbsConfigEnv } from '../env';

const blobServiceClient = BlobServiceClient.fromConnectionString(dbsConfigEnv.BLOB_CONNECTION_STRING);

const blob_connection = async () => {
  try {
    const containerName = 'images';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();
    console.log(`Create container ${containerName} succesfully`, createContainerResponse);
  } catch (error) {
    console.log(error, 'blob erro');

    return false;
  }
};

export default blob_connection;
