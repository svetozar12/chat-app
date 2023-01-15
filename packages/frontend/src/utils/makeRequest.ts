import { DocumentNode } from '@apollo/client';
import axios from 'axios';
import { gqlUrl } from 'components/PageLayout/App/App';

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
