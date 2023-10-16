import Blog from "../Models/Blog.js";
import blog from "../Models/Blog.js";


export const getAllBlogs = async(req, res, next) => {
    let blogs;
    try {
        blogs = await blog.find();
    } catch (error) {
        return console.log(error);
    }
    if(!blogs){
        return res.status(404).json({mesbsage: "no blog found!"})
    }
    return res.status(200).json({blogs});
};

export const addBlog = async(req,  res, next) =>{
    const { title, description, image, user } = req.body;
    const blog = new Blog ({
        title,
        description,
        image,
        user,
    });
    try {
        await blog.save();
    } catch (error) { 
        return console.log(error);
    }
    return res.status(200).json({blog})
};

export const updateBlog = async(req, res, next) =>{
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        const blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        }); 
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(500).json({message:"unable to update the blog"});
    }
    return res.status(200).json({blog});
};


export const deleteBlog = async(req, res, next) => {
     const blogId = req.params.id;

        try{
           const deleted = await Blog.findByIdAndRemove(blogId);
        }
        catch(error){
            return console.log(error);
        }
        if(!blogId){
            return res.status(400).json({messsage:"cannot find blog ...."})
        }

        return res.status(200).json({message:"succesfully deleted"});
};