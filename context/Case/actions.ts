import { Dispatch } from 'react';
import { get } from 'lodash';
import { gql, useApolloClient } from '@apollo/client';
import { Action } from '@/types/contextReducer';

import { Actions, State, SummaryForm } from './types';
import { Types, actions } from './constants';

import { GET_CASE, GET_CRIMES, CREATE_SUMMARY, UPDATE_SUMMARY, ADD_SUPPORTS, } from './queries/case.graphql';
import { ADD_CASUALTY, DELETE_CASUALTY, GET_CASUALTIES, UPDATE_CASUALTY } from './queries/causalties.graphql';
import { ADD_ARRESTED, UPDATE_ARRESTED, GET_ARRESTED, DELETE_ARRESTED, } from './queries/arrested.graphql'
import { ADD_WITNESS, UPDATE_WITNESS, GET_WITNESS, DELETE_WITNESS, } from './queries/witness.graphql'
import { useLoader } from '../Loader';
import { useAuth } from '../Auth';

export const useActions = (state: State, dispatch: Dispatch<Action<Types>>): Actions => {
  const client = useApolloClient();
  const { auth } = useAuth()
  const { actions: loaderActions } = useLoader()

  const getCase = async (id: string) => {
    try {
      loaderActions.show()
      const res = await client.query({
        query: GET_CASE,
        variables: {
          id,
        },
      });
  
      const itemCase = get(res.data, 'CasesWithFilter.edges[0].node');
  
      if(!itemCase) return Promise.reject(new Error('No se encontró el caso'));
  
      dispatch(actions.setCase(itemCase));
      
      loaderActions.hide()

      return itemCase
    } catch (error) {
      return Promise.reject(error)
    }
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
        firstResponserId: auth.firstResponser_id,
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
        firstResponserId: auth.firstResponser_id,
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
        firstResponserId: auth.firstResponser_id,
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
        firstResponserId: auth.firstResponser_id,
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

  const getCasualties = async () => {
    const res = await client.query({
      query: GET_CASUALTIES,
      variables: {
        id: state.caseId,
      },
    });
    const data = res.data.CasualtiesWithFilter.edges.map(item => {
      return { mongoId: item.node.mongoId, ...item.node.profile };
    });

    dispatch(actions.setCasualties(data));
  };
  const addCasualty = async values => {
    const res = await client.mutate({
      mutation: ADD_CASUALTY,
      variables: {
        ...values,
        caseId: state.caseId,
        firstResponserId: auth.firstResponser_id,
      },
    });

    const { mongoId, profile } = res.data.addCasualty
    const aux = [
      ...state.casualties,
      { mongoId, ...profile }
    ]

    dispatch(actions.setCasualties(aux));
  };
  const editCasualty = async values => {
    const res = await client.mutate({
      mutation: UPDATE_CASUALTY,
      variables: {
        ...values,
        caseId: state.caseId,
        firstResponserId: auth.firstResponser_id,
      },
    });
    const { mongoId, profile } = res.data.updateCasualty;
    const index = state.arrestedsList.findIndex( item => item.mongoId === mongoId);
    const aux = [...state.casualties]
    aux[index] = { mongoId, ...profile }
    
    dispatch(actions.getWitness(aux));
  };
  const deleteCasualty = async mongoId => {
    const res = await client.mutate({ mutation: DELETE_CASUALTY, variables: { mongoId } });

    const index = state.arrestedsList.findIndex(item => item.mongoId === mongoId);
    const aux = [...state.casualties]
    aux.splice(index, 1);

    dispatch(actions.getArrested(aux));
  };

  const getCrimes = async () => {
    const res = await client.query({ query: GET_CRIMES });

    dispatch(actions.setCrimes(res.data.crimes.edges.map(item => item.node)))
  }

  const addSupports = async (supports: string[]) => {
    console.log("🚀 ~ file: actions.ts:192 ~ addSupports ~ supports:", supports)
    if(!state.case) return

    try {
      loaderActions.show()

      const res = await client.mutate({
        mutation: ADD_SUPPORTS,
        variables: {
          id: state.case.mongoId,
          supports
        }
      })

      dispatch(actions.setCase({
        ...state.case,
        support: get(res.data, 'updateCase.support', null)
      }))

      loaderActions.hide()
    } catch (error) {
      console.log("🚀 ~ file: actions.ts:209 ~ addSupports ~ error:", error)
      loaderActions.hide()
    }
  }

  const saveSummary = async (form: SummaryForm) => {
    if(!state.case) return
    
    try {
      loaderActions.show()
      if(state.case.summary){
        const res = await client.mutate({
          mutation: UPDATE_SUMMARY,
          variables: {
            id: state.case.summary.id,
            ...form
          },
        });
  
        dispatch(actions.setCase({ 
          ...state.case,
          summary: {
            id: res.data.updateSummary.mongoId,
            ...form
          }
        }))
      }
      else {
        const res = await client.mutate({
          mutation: CREATE_SUMMARY,
          variables: {
            caseId: state.case.mongoId,
            ...form
          },
        });

        dispatch(actions.setCase({ 
          ...state.case,
          summary: {
            id: res.data.addSummary.mongoId,
            ...form
          }
        }))
      }
      loaderActions.hide()
    } catch (error) {
      loaderActions.hide()
    }
  }

  return {
    getCrimes,
    getCase,
    addWitness,
    getWitness,
    editWitness,
    addArrested,
    editArrested,
    getArrested,
    deleteWitness,
    deleteArrested,
    getCasualties,
    addCasualty,
    editCasualty,
    deleteCasualty,
    saveSummary,
    addSupports
  };
};
