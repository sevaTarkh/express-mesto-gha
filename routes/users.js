const router = require('express').Router();
const {
  getUsersInfo,
  getUserInfoById,
  createUser,
  setUserInfo,
  setUserAvatar,
  loginUser,
  getCurrentUserInfo,
} = require('../controllers/users');

router.get('/', getUsersInfo);
router.get('/:id', getUserInfoById);
router.get('/me', getCurrentUserInfo);
router.patch('/me', setUserInfo);
router.patch('/me/avatar', setUserAvatar);
router.post('/signin', loginUser);
router.post('/signup', createUser);

module.exports = router;
