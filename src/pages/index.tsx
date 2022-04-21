import { Box } from '@mui/material'
import { MainLayout } from '../components/layout/mainLayout'
import {FC} from "react"

const Home: FC = () => (
  <MainLayout>
    <Box my={4}>
      Home
    </Box>
  </MainLayout>
)

export { Home as default }
