const express = require('express');
const { 
  saveUser, 
  getUsers, 
  updateUser,
  deleteUser,  
  getUserByEmail 
} = require('../Controller/UserController');

const router = express.Router();

// Define routes
router.post('/saveUser', saveUser);
router.get('/getUsers', getUsers); 
router.put('/updateUser/:email', updateUser);
router.delete('/deleteUser/:email', deleteUser);
router.get('/getUser/:email', getUserByEmail); // 

module.exports = router;
