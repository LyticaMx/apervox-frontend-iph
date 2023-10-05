import { Dispatch } from 'react';
import { useApolloClient } from '@apollo/client';
import { Action } from '@/types/contextReducer';

import { Actions, State } from './types';
import { Types, actions } from './constants';
import { ADD_ARRESTED, UPDATE_ARRESTED } from './queries.graphql';

export const useActions = (state: State, dispatch: Dispatch<Action<Types>>): Actions => {
  const client = useApolloClient();

  const addWitness = async (page?: number): Promise<void> => {
    // const res = await client.query({query: GET_CHARACTERS, variables: {
    //   page: page ?? state.pagination.page
    // }})
    // const { results, info } = res.data.characters
    // dispatch(actions.setData(results))
    // dispatch(actions.setPagination({
    //   count: info.count,
    //   pages: info.pages,
    //   page: page ?? state.pagination.page
    // }))
  };

  const editWitness = async (id: number): Promise<void> => {
    // const res = await client.query({query: GET_CHARACTER, variables: {
    //   id
    // }})
    // dispatch(actions.setCharacter(res.data.character))
  };

  const addArrested = async values => {
    const res = await client.mutate({
      mutation: ADD_ARRESTED,
      variables: {
        ...values,
        caseId: '651db9096d97107a897a11a2',
        firstResponserId: '651db8ba6d97107a897a11a0',
      },
    });

    return res;
  };
  const editArrested = async values => {
    const res = await client.mutate({
      mutation: UPDATE_ARRESTED,
      variables: {
        ...values,
        caseId: '651db9096d97107a897a11a2',
        firstResponserId: '651db8ba6d97107a897a11a0',
      },
    });

    return res;
  };

  return {
    addWitness,
    editWitness,
    addArrested,
    editArrested,
  };
};
