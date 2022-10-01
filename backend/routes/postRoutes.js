const express = require('express');
const { getPosts, getPost, writePosts, updatePosts, deletePosts } = require('../controllers/postController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

/**router.get('/', getPosts);
/router.post('/', writePosts); these two can be combined into one line
for code readability as below**/
router.route('/').get(protect, getPosts).post(protect, writePosts);

/** router.put('/:id', updatePosts);
router.delete('/:id', deletePosts); same story, clean code **/
router.route('/:id').put(protect, updatePosts).get(getPost).delete(protect, deletePosts);
module.exports = router;