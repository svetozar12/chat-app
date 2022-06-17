import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { constants } from "../constants";

const blobServiceClient = BlobServiceClient.fromConnectionString(constants.BLOB_URL);

const blob_connection = async () => {
  try {
    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();
    console.log(`Create container ${containerName} succesfully`, createContainerResponse);
  } catch (error) {
    console.log(error);

    return false;
  }
};

export default blob_connection;
