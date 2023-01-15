import { DocumentNode } from '@apollo/client';
import axios from 'axios';

const gqlUrl = `${process.env.NEXT_PUBLIC_GQL_PROTOCOL}://${process.env.NEXT_PUBLIC_GQL_HOST}:${process.env.NEXT_PUBLIC_GQL_PORT}/graphql`;

export const gqlMakeRequest = async <TResult, TArgs>(document: DocumentNode, variables: TArgs): Promise<TResult> => {
  try {
    const { data } = await axios.post<TResult>(gqlUrl, {
      query: document,
      variables,
    });
    return data;
  } catch (error) {
    return error;
  }
};
