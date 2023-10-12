import { Dispatch } from 'react';
import { get } from 'lodash';
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
  DELETE_WITNESS,
  DELETE_ARRESTED,
  GET_CASE,
} from './queries.graphql';

const firstResponserId = '651f8e65aa4107d1f4096484';

export const useActions = (state: State, dispatch: Dispatch<Action<Types>>): Actions => {
  const client = useApolloClient();

  const getCase = async (id: string) => {

    const res = await client.query({
      query: GET_CASE,
      variables: {
        id,
      },
    });

    const itemCase = get(res.data, 'CasesWithFilter.edges[0].node');

    if(!itemCase) return Promise.reject(new Error('No se encontró el caso'));

    dispatch(actions.setCase(itemCase));
  }

  const getArrested = async () => {
    const res = await client.query({
      query: GET_ARRESTED,
      variables: {
        id: state.caseId,
      },
    });
    const data = res.data.ArrestedsWithFilter.edges.map(item => {
      return { mongoId: item.node.mongoId, ...item.node.profile };
    });

    dispatch(actions.getArrested(data));
  };
  const getWitness = async () => {
    const res = await client.query({
      query: GET_WITNESS,
      variables: {
        id: state.caseId,
      },
    });
    const data = res.data.WitnessesWithFilter.edges.map(item => {
      return { mongoId: item.node.mongoId, ...item.node.profile };
    });

    dispatch(actions.getWitness(data));
  };

  const addWitness = async values => {
    const res = await client.mutate({
      mutation: ADD_WITNESS,
      variables: {
        ...values,
        caseId: state.caseId,
        firstResponserId,
      },
    });
    const newWitness = {
      ...res.data.addWitness.mongoId,
      ...res.data.addWitness.profile,
    };
    dispatch(actions.getWitness([...state.witnessList, newWitness]));

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
    const { updateWitness } = res.data;
    const position = state.witnessList.findIndex(
      element => element.mongoId === updateWitness.mongoId
    );
    const editWitness = {
      ...updateWitness.mongoId,
      ...updateWitness.profile,
    };
    state.witnessList[position] = editWitness;
    dispatch(actions.getWitness([...state.witnessList]));

    return res;
  };
  const deleteWitness = async mongoId => {
    const res = await client.mutate({ mutation: DELETE_WITNESS, variables: { mongoId } });

    const position = state.witnessList.findIndex(
      element => element.mongoId === res.data.deleteWitness.mongoId
    );
    state.witnessList.splice(position, 1);
    dispatch(actions.getWitness([...state.witnessList]));
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

    const newArrested = {
      mongoId: res.data.addArrested.mongoId,
      ...res.data.addArrested.profile,
    };
    dispatch(actions.getArrested([...state.arrestedsList, newArrested]));
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
    const { updateArrested } = res.data;
    const position = state.arrestedsList.findIndex(
      element => element.mongoId === updateArrested.mongoId
    );
    const editArrested = {
      ...updateArrested.mongoId,
      ...updateArrested.profile,
    };
    state.arrestedsList[position] = editArrested;
    dispatch(actions.getWitness([...state.arrestedsList]));

    return res;
  };

  const deleteArrested = async mongoId => {
    const res = await client.mutate({ mutation: DELETE_ARRESTED, variables: { mongoId } });

    const position = state.arrestedsList.findIndex(
      element => element.mongoId === res.data.deleteArrested.mongoId
    );

    state.arrestedsList.splice(position, 1);
    dispatch(actions.getArrested([...state.arrestedsList]));
  };

  return {
    getCase,
    addWitness,
    getWitness,
    editWitness,
    addArrested,
    editArrested,
    getArrested,
    deleteWitness,
    deleteArrested,
  };
};
