const express = require("express");
const blogControllers = require('../controllers/blogControllers');

const router = express.Router();

// Blog Route
// Get All
router.get('/', blogControllers.blog_index);
// POST BLOG
router.post('/', blogControllers.blog_create_post);
// View Creating a Blog
router.get("/create", blogControllers.blog_create_get);
// Get Single Blog in View
router.get('/:id', blogControllers.blog_details);
// Delete Blog
router.delete('/:id', blogControllers.blog_delete)

module.exports = router;