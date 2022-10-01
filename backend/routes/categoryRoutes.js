const express = require('express');
const { postCategory, getCategory } = require('../controllers/categoryController');
const router = express.Router();

/**router.get('/', getPosts);
/router.post('/', writePosts); these two can be combined into one line
for code readability as below**/
router.route('/').post(postCategory);
router.route('/').get(getCategory);
module.exports = router;