const express = require("express");

const { comments } = require("../models");

const commentroute = express.Router();

commentroute.post("/addcoment", async (req, res) => {
  const { text, blogId, userId } = req.body;

  try {
    const data = await comments.create({ text, blogId, userId });
    return res.status(201).json({
        isError: false,
        data,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      isError: true,
      error,
    });
  }
});




commentroute.get('/getcomment/:blogId', async (req, res) => {
    const blogId = req.params.blogId;
  
    try {
   
      const data = await comments.findAll({
        where: {blogId }, 
      });
  
      res.status(200).json({
        isError: false,
        data: data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        isError: true,
        error: 'Internal server error',
      });
    }
  });
module.exports = {
    commentroute,
};
