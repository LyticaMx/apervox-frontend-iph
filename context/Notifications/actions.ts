import { Dispatch } from 'react';
import { useApolloClient } from '@apollo/client';
import { Action } from '@/types/contextReducer';

import { Actions, GetDataPayload, State } from './types';
import { Types, actions } from './constants';
import { CREATE_NOTIFICATION_RESPONSE, GET_NOTIFICATION, GET_NOTIFICATIONS, UPDATE_NOTIFICATION_RESPONSE } from './queries.graphql';
import { get } from 'lodash';
import { useAuth } from '../Auth';

export const useActions = (state: State, dispatch: Dispatch<Action<Types>>): Actions => {
  const client = useApolloClient();
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
      variables: {
        id,
      },
    });

    const notification = get(res.data, 'NotificationssWithFilter.edges[0].node');


    dispatch(actions.setNotification(notification));
  };
  const changeStatus = async (status?: any) => {
    const { notificationResponse } = state
    
    if( notificationResponse ){
      const res = await client.query({
        query: UPDATE_NOTIFICATION_RESPONSE,
        variables: {
          id: notificationResponse.mongoId,
          status
        },
      });

      console.log('UPDATE', res)
    }
    else {
      const res = await client.query({
        query: CREATE_NOTIFICATION_RESPONSE,
        variables: {
          notificationId: state.notification.mongoId,
          firstresponserId: auth.firstResponser_id,
          status
        },
      });

      console.log('CREATE', res)
    }
  };

  return {
    getData,
    getNotification,
    changeStatus
  };
};
