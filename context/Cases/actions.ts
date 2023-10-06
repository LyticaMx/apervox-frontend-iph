import { Dispatch } from 'react';
import { useApolloClient } from '@apollo/client';
import { Action } from '@/types/contextReducer';

import { Actions, State } from './types';
import { Types, actions } from './constants';
import {
  ADD_ARRESTED,
  GET_WITNESS,
  UPDATE_ARRESTED,
  ADD_WITNESS,
  GET_ARRESTED,
  UPDATE_WITNESS,
} from './queries.graphql';

const firstResponserId = '651f8e65aa4107d1f4096484';

export const useActions = (state: State, dispatch: Dispatch<Action<Types>>): Actions => {
  const client = useApolloClient();

  const addWitness = async values => {
    const res = await client.mutate({
      mutation: ADD_WITNESS,
      variables: {
        ...values,
        caseId: state.caseId,
        firstResponserId,
      },
    });
    getWitness();

    return res;
  };

  const editWitness = async values => {
    const res = await client.mutate({
      mutation: UPDATE_WITNESS,
      variables: {
        ...values,
        caseId: state.caseId,
        firstResponserId,
      },
    });

    getWitness();
    return res;
  };
  const getWitness = async () => {
    const res = await client.query({
      query: GET_WITNESS,
    });
    const data = res.data.witnesses.edges.map(item => {
      return { mongoId: item.node.mongoId, ...item.node.profile };
    });

    dispatch(actions.getWitness(data));
  };
  const getArrested = async () => {
    const res = await client.query({
      query: GET_ARRESTED,
    });
    const data = res.data.arresteds.edges.map(item => {
      return { mongoId: item.node.mongoId, ...item.node.profile };
    });

    dispatch(actions.getArrested(data));
  };

  const addArrested = async values => {
    const res = await client.mutate({
      mutation: ADD_ARRESTED,
      variables: {
        ...values,
        caseId: state.caseId,
        firstResponserId,
      },
    });
    getArrested();
    return res;
  };
  const editArrested = async values => {
    const res = await client.mutate({
      mutation: UPDATE_ARRESTED,
      variables: {
        ...values,
        caseId: state.caseId,
        firstResponserId,
      },
    });
    getArrested();
    return res;
  };

  return {
    addWitness,
    getWitness,
    editWitness,
    addArrested,
    editArrested,
    getArrested,
  };
};
