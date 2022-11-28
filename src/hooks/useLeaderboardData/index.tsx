import LeaderboardContext, { LeaderboardContextData } from '@/contexts/leaderboard';
import { useContext } from 'react';

const useLeaderboardData = (): LeaderboardContextData => {
  const context = useContext<LeaderboardContextData>(LeaderboardContext);

  return context;
};

export default useLeaderboardData;
