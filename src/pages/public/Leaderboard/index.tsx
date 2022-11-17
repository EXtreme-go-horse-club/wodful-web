import { Box, Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ValidateAccess } from './helper/ValidateAccess';

const PublicLeaderboard = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    ValidateAccess.verify(code, navigate);
  }, [code, navigate]);
  return (
    <Box>
      <Center px={5} h='90vh'>
        Public Leaderboard
      </Center>
    </Box>
  );
};

export default PublicLeaderboard;
