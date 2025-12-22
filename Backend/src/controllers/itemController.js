const Item = require("../models/item")

const getItems = async (req, res) => {
    try{
        const items = await Item.find().populate("lastUpdatedBy", "name role");

        res.json(items);

    }catch(err){
        res.status(500).json({
            msg:"server error"
        })
    }
}

// get single item by id
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("lastUpdatedBy", "name role");

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};



// create item
const createItem = async (req, res) => {
    const {name, sku, quantity, price} = req.body;

    if(!name || !sku){
        return res.status(400).json({msg:"enter correct details"})

    }
    try{
        const checkSku = await Item.findOne(sku);
        if(checkSku){
            return res.json({msg: 'duplicate sku error'});

        }

        const newItem = new Item ({
            name,
            sku,
            quantity: quantity || 0, 
            price: price || 0,
            lastUpdatedBy: req.user.userId,
            lastUpdatedAt: new Date()  
        })

        await newItem.save()
        res.status(201).json({
            msg: "Item created successfully",
            newItem
        });

    }catch(err){
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    
    }
}


// update Item
const updateItem = async (req, res) => {
   try{
    const item = await Item.findById(req.params.id);

    if(!item){
        return res.status(404).json({ msg: "Item not found" });

    }

    item.name = req.body.name || item.name;
    item.quantity = req.body.quantity ?? item.quantity;
    item.price = req.body.price ?? item.price;

    item.lastUpdatedBy = req.user.userId;
    item.lastUpdatedAt = new Date();

    await item.save();

     res.json({
            msg: "Item updated successfully",
            item
        });
}catch(err){
   console.error(err);
        res.status(500).json({ msg: "Server error" });
    } 
}

// delete item 
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

        await item.deleteOne();

        res.json({ msg: "Item deleted successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {getItems,getItemById, createItem,
                    updateItem, deleteItem
                };











