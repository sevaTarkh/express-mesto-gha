const router = require('express').Router();
const {
  getUsersInfo,
  getUserInfoById,
  createUser,
  setUserInfo,
  setUserAvatar,
} = require('../controllers/users');

router.get('/', getUsersInfo);
router.get('/:id', getUserInfoById);
router.post('/', createUser);
router.patch('/me', setUserInfo);
router.patch('/me/avatar', setUserAvatar);

module.exports = router;
