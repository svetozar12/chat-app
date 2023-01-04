/// <reference types="cypress" />
import axios from "axios";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "../../gql-sdk/generated";
const client = new GraphQLClient("http://127.0.0.1:4003/graphql");

export const sdk = getSdk(client);
