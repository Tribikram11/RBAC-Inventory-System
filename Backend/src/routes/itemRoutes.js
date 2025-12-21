const express = require('express');
const router = express.Router();

const {getItems, createItem, updateItem, deleteItem} = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


router.get('/',authMiddleware,getItems)

router.post('/',authMiddleware,roleMiddleware(['admin']),createItem)

router.put('/:id', authMiddleware, roleMiddleware(['admin','manager']), updateItem);

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteItem);



module.exports = router;