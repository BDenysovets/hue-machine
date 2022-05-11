import { Box, Typography } from '@mui/material'
import {FC} from "react"

const Home: FC = () => (
    <Box my={4} justifyContent={'center'} alignContent={'center'}>
        <Typography variant={'h3'} align={'center'}>
            Hi, it's ReadyPlayerMe backoffice admin studio
        </Typography>
    </Box>
)

export { Home as default }
