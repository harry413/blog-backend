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
        return res.status(404).json({mesbsage: "No blog found!"})
    }
    return res.status(200).json({blogs});
};

export const addBlog = async(req,  res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error)
    }
    if(!existingUser){
        return res.status(400).json({message: "unable to find by user id"})
    }
    const blog = new Blog ({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (error) { 
        return console.log(error);
        return res.status(500).json({message: error});
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
             await Blog.findByIdAndRemove(blogId).populate('user');
             await blog.user.blogs.pull(blog);
             await blog.user.save();
        }
        catch(error){
            return console.log(error);
        }
        if(!blogId){
            return res.status(500).json({messsage:"cannot find blog ...."})
        }

        return res.status(200).json({message:"succesfully deleted"});
};