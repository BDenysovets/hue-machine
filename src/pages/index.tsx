import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import {Layout} from "../components/layout";

const Home: FC = () => (
  <Layout>
    <Box my={4} justifyContent={'center'} alignContent={'center'}>
      <Typography variant={'h3'} align={'center'}>
        Hi, it's ReadyPlayerMe backoffice admin studio
      </Typography>
    </Box>
  </Layout>
);

export { Home as default };
