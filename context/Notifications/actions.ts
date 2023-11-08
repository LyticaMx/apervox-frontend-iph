import { Dispatch } from 'react';
import { useApolloClient } from '@apollo/client';
import { Action } from '@/types/contextReducer';

import { Actions, GetDataPayload, State } from './types';
import { Types, actions } from './constants';
import { CREATE_NOTIFICATION_RESPONSE, GET_NOTIFICATION, GET_NOTIFICATIONS, UPDATE_NOTIFICATION_RESPONSE } from './queries.graphql';
import { get } from 'lodash';
import { useAuth } from '../Auth';
import { useLoader } from '../Loader';
import { useCase } from '../Case';
import { useHistory } from 'react-router';

export const useActions = (state: State, dispatch: Dispatch<Action<Types>>): Actions => {
  const client = useApolloClient();
  const history = useHistory()
  const {actions: loaderActions } = useLoader()
  const { actions: caseActions } = useCase()

  const { auth } = useAuth()

  const getData = async (params: GetDataPayload): Promise<void> => {
    const first = get(params, 'first', state.pagination.first);
    const cursor = get(params, 'cursor', state.pagination.endCursor);

    const res = await client.query({ query: GET_NOTIFICATIONS, variables: { first, cursor } });
    const { edges, pageInfo } = res.data.notifications;

    dispatch(actions.setData([...state.data, ...edges.map(item => item.node)]));
    dispatch(
      actions.setPagination({
        first,
        ...pageInfo,
      })
    );
  };

  const getNotification = async (id: string): Promise<void> => {
      const res = await client.query({
        query: GET_NOTIFICATION,
        fetchPolicy: "no-cache",
        variables: {
          id,
        },
      });
  
      const notification = get(res.data, 'NotificationssWithFilter.edges[0].node');
  
      if(!notification) return Promise.reject(new Error('No se encontró la notificación'));
  
      // TODO : HACER FILTRO POR FIRSTRESPONSER
      dispatch(actions.setResponse(get(notification, 'responses[0]', undefined)))
      
      dispatch(actions.setNotification(notification));
  };
  
  const changeStatus = async (status?: any) => { 
    
    try {
      loaderActions.show()
      const { notificationResponse } = state
      
      if( notificationResponse ){
        const res = await client.mutate({
          mutation: UPDATE_NOTIFICATION_RESPONSE,
          variables: {
            id: notificationResponse.id,
            status
          },
        });
  
        const { notification } = res.data.updateNotificationResponse;
        dispatch(actions.setResponse({ 
          ...notificationResponse,
          status
        }))
  
        if(status === 'RESOLVED' && notification.case){
          await caseActions.getCase(notification.case.id)
        }
      }
      else {
        const res = await client.mutate({
          mutation: CREATE_NOTIFICATION_RESPONSE,
          variables: {
            notificationId: state.notification.mongoId,
            firstresponserId: auth.firstResponser_id,
            status
          },
        });
  
        dispatch(actions.setResponse({
          ...res.data.addNotificationResponse,
          id: res.data.addNotificationResponse.mongoId
        }))
      }
  
      loaderActions.hide() 
    } catch (error) {
      console.log("🚀 ~ file: actions.ts:103 ~ changeStatus ~ error:", error)
      loaderActions.hide()
    }
  };

  return {
    getData,
    getNotification,
    changeStatus
  };
};
