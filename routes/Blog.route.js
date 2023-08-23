const express = require("express");

const { blog } = require("../models");

const blogroute = express.Router();

blogroute.post("/create", async (req, res) => {
  const { title, content, userId } = req.body;

  try {
    const data = await blog.create({ title, content, userId });
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

blogroute.get("/getblogs", async (req, res) => {
  try {
    const data = await blog.findAll();
    res.status(200).json({
      isError: false,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isError: true,
      error,
    });
  }
});

blogroute.get("/getblogs/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const blogs = await blog.findAll({
      where: { userId },
    });

    res.status(200).json({
      isError: false,
      data: blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isError: true,
      error: "Internal server error",
    });
  }
});

blogroute.put("/update/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const { title, content } = req.body;

  try {
    const updatedBlog = await blog.update(
      { title, content },
      { where: { id: blogId } }
    );

    if (updatedBlog[0] === 0) {
      return res.status(404).json({
        isError: true,
        error: "Blog not found",
      });
    }

    res.status(200).json({
      isError: false,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isError: true,
      error: "Internal server error",
    });
  }
});

blogroute.delete("/delete/:blogId", async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const deletedBlogCount = await blog.destroy({
      where: { id: blogId },
    });

    if (deletedBlogCount === 0) {
      return res.status(404).json({
        isError: true,
        error: "Blog not found",
      });
    }

    res.status(200).json({
      isError: false,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isError: true,
      error: "Internal server error",
    });
  }
});

module.exports = {
  blogroute,
};
