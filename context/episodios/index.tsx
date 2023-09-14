/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode, createContext, useContext } from 'react';
import { GET_EPISODE, GET_EPISODES} from './queries.graphql';
import { useLazyQuery } from '@apollo/client';

interface Props {
    children: ReactNode
}

interface ContextType {
  data: any[]
  pagination: any
  episode: Record<string, any> | undefined
  actions: any
}
const EpisodesContext = createContext<ContextType>({data: [], pagination: null, episode: {}, actions: {}});

export const EpisodesProvider = (props: Props) => {
  const [getData, responseData] = useLazyQuery(GET_EPISODES);
  const [getEpisode, responseEpisode] = useLazyQuery(GET_EPISODE)
  
  const state = {
    data: responseData?.data?.episodes?.results ?? [],
    pagination: responseData.data?.episdoes?.info ?? null,
    episode: responseEpisode?.data?.episode
  }

  const actions = {
    getData,
    findEpisode: (id: number) => {
      getEpisode({variables: {id}})
    }
  }

  return (
    <EpisodesContext.Provider value={{ ...state, actions }}>{props.children}</EpisodesContext.Provider>
  );
};

export const useEpisodes = () => useContext(EpisodesContext)
export const EpisodesConsumer = EpisodesContext.Consumer;
export default EpisodesContext;