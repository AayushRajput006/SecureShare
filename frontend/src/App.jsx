import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, Paper, Stack, Alert, Chip } from '@mui/material';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Placeholder from './pages/Placeholder.jsx';
const links = [['/', 'Home'], ['/dashboard','Dashboard'], ['/upload','Upload'], ['/my-files','My Files'], ['/shared','Shared With Me'], ['/activity','Activity']];
export default function App(){return <><AppBar position="static"><Toolbar><Typography variant="h6" sx={{flexGrow:1}}>SecureShare</Typography><Chip label="Milestone 3 · Scaffold" color="info" variant="outlined" sx={{color:'white'}}/></Toolbar></AppBar><Container maxWidth="lg" sx={{py:4}}><Box sx={{display:'flex',gap:1,flexWrap:'wrap',mb:3}}>{links.map(([url,title])=><Button component={NavLink} key={url} to={url} variant="outlined">{title}</Button>)}</Box><Routes><Route path="/" element={<Home/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/upload" element={<Placeholder title="Upload"/>}/><Route path="/my-files" element={<Placeholder title="My Files"/>}/><Route path="/shared" element={<Placeholder title="Shared With Me"/>}/><Route path="/activity" element={<Placeholder title="Activity"/>}/></Routes><Alert severity="info" sx={{mt:4}}>Scaffold only: wallet login, file encryption, IPFS upload and smart contract integration are not implemented yet.</Alert></Container></>}
