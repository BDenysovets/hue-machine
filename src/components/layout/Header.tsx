import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  IconButton,
  Stack,
  Divider
} from '@mui/material';
import React, { FC, useState } from 'react';
import { Logo } from '../logo';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"

const menu = {
  '/campaigns': 'Campaigns',
  '/partners': 'Partners',
};

const Header: FC = () => {
  // const { data: session } = useSession()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box component='div' sx={{ flexGrow: 1 }}>
            <Logo />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction='row' divider={<Divider orientation='vertical' flexItem />} spacing={2}>
              {Object.entries(menu).map(([key, value], index) => (
                <Link key={index} href={key}>
                  <Typography variant={'h6'} sx={{ cursor: 'pointer' }} color={'#fff'}>
                    {value}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Box>
          <Box>
            {/*{session?.user && (*/}
            {/*  <Tooltip title='Open settings'>*/}
            {/*    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>*/}
            {/*      <Avatar alt={session.user.name} src={session.user.image} />*/}
            {/*    </IconButton>*/}
            {/*  </Tooltip>*/}
            {/*)}*/}
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Link href={'/profile'}>
                  <Typography textAlign='center'>Profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={() => signOut()}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Header };
