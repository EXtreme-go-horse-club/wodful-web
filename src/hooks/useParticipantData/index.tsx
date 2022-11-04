import ParticipantContext, { ParticipantContextData } from '@/contexts/participant';
import { useContext } from 'react';

const useParticipantData = (): ParticipantContextData => {
  const context = useContext<ParticipantContextData>(ParticipantContext);

  return context;
};

export default useParticipantData;
