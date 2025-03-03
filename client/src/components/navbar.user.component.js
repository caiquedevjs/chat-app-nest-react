import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import useGetUser from '../hooks/useGetUser.hook.js';

const pagesWithIcons = [
  { name: 'Loja', icon: <img src="2913097_amethyst_crystal shard_fantasy_gem_magic_icon.svg" alt="Loja" style={{ width: '40px', height: '40px' }} /> },
  { name: 'Inventario', icon: <img src="2913117_bag_coin_game_gold_item bag_icon.svg" alt="Inventário" style={{ width: '40px', height: '40px' }} /> },
  { name: 'Quests', icon: <img src="2913095_adventure_adventure map_fantasy_map_quest_icon.svg" alt="Quests" style={{ width: '40px', height: '40px' }} /> },
  { name: 'Habilidades', icon: <img src="2913104_book_fantasy_magic_rpg_spell_icon.svg" alt="Habilidades" style={{ width: '40px', height: '40px' }} /> },
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBarUser = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { loading, getUserId, userData } = useGetUser();
  const [image, setImage] = useState('');
  const navigate = useNavigate();
 


  useEffect(()=>{
    const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token de autenticação não encontrado');
                return;
            }
    
            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub; // 💡 ID do usuário no token
                if (userId) {
                    getUserId(userId);
                }
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
            }
    
  },[getUserId]);

   useEffect(() => {
          if (userData) {
             setImage(userData.profileImage || 'default-avatar.png');
          }
      }, [userData]);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigateToProfile = () => {
    navigate('/user');  
    handleCloseUserMenu();  
  };

  return (
    <div className="nav-bar-conteiner">
      <AppBar position="static" sx={{ backgroundColor: '#937460' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pagesWithIcons.map(({ name, icon }) => (
                  <MenuItem key={name} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{icon}{name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display:{ xs:'none', md:'flex'} }}>
              {pagesWithIcons.map(({ name, icon }) => (
                <Button
                  key={name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my :2,
                    color:'white',
                    display:'flex',
                    alignItems:'center',
                    gap:'5px',
                    position:'relative',
                    '&::after': {
                      content:"''",
                      position:'absolute',
                      left:'15%',
                      bottom:'0%',
                      width:'80%',
                      height:'3px',
                      backgroundColor:'#fff',
                      transform:'scaleX(0)',
                      transition:'transform .3s ease-in-out',
                      transformOrigin:'left',
                    },
                    '&:hover::after': {
                      transform:'scaleX(1)',
                    }
                  }}
                >
                  {icon}{name}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow :0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p :0 }}>
                  <Avatar alt="Remy Sharp" src={image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt :5 }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical:'top',
                  horizontal:'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical:'top',
                  horizontal:'right',
                 }}
                 open={Boolean(anchorElUser)}
                 onClose={handleCloseUserMenu}
               >
                 {settings.map((setting) => (
                   <MenuItem
                     key={setting}
                     onClick={setting ==='Account'? handleNavigateToProfile : handleCloseUserMenu}
                   >
                     <Typography sx={{ textAlign :'center' }}>{setting}</Typography>
                   </MenuItem>
                 ))}
               </Menu>
             </Box>
           </Toolbar>
         </Container>
       </AppBar>
     </div>
   );
};

export default NavBarUser;
