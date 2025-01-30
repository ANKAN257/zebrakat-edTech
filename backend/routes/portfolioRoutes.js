const router=require('express').Router()

const {authenticateToken}=require('../Profile_data/JWT_function');
const isAdminEmail=require('../Profile_data/isAdminEmail');
const checkAdminMiddleWare=require('../Profile_data/checkAdminMiddleWare');


const {IntroHome,About,Projects,MySkills,MyExperiences,MyHeaders,MyDsaProblems,MyBlogDatas} = require("../models/portfolioModel");
const User=require('../models/userModel');

//get all portfolio data
router.get("/data", async (req, res) => {
    try {
      // Fetch data from all collections
      const introhomes = await IntroHome.find().catch((err) => {
        throw new Error("Error fetching IntroHome: " + err.message);
      });
  
      const abouts = await About.find().catch((err) => {
        throw new Error("Error fetching About: " + err.message);
      });
  
      const projects = await Projects.find().catch((err) => {
        throw new Error("Error fetching Projects: " + err.message);
      });
  
      const myskills = await MySkills.find().catch((err) => {
        throw new Error("Error fetching MySkills: " + err.message);
      });
  
      const myexperiences = await MyExperiences.find().catch((err) => {
        throw new Error("Error fetching MyExperiences: " + err.message);
      });
  
      const myheaders = await MyHeaders.find().catch((err) => {
        throw new Error("Error fetching MyHeaders: " + err.message);
      });
  
      const mydsaproblems = await MyDsaProblems.find().catch((err) => {
        throw new Error("Error fetching MyDsaProblems: " + err.message);
      });
  
      const myblogdatas = await MyBlogDatas.find().catch((err) => {
        throw new Error("Error fetching MyblogDatas: " + err.message);
      });
  
      res.status(200).json({
        introhomes,
        abouts,
        projects,
        myskills,
        myexperiences,
        myheaders,
        mydsaproblems,
        myblogdatas,
      });
    } catch (error) {
      console.error("Server Error:", error.message, error.stack);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });




router.get("/userdata",authenticateToken, async (req, res) => {
    try {
      // Extract the email from the authenticated user in the token
      const userEmail = req.user.email;
      console.log("Authenticated user email: ", userEmail);
  
      // Fetch the user document from the database
      const user = await User.findOne({ email: userEmail });
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Respond with the user data
      res.status(200).json({
        success: true,
        data: {
        
          email: user.email,
          username: user.username,
          role:user.role
      
        },
      });
  
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});

  
  


router.put("/update-intro", authenticateToken, checkAdminMiddleWare, async (req, res) => {
  try {
    console.log("req.body::: ", req.body);

    const { welcomeText, firstName, lastName, description } = req.body;
    console.log("first Name:", firstName);

    // Validate all fields
    if (!welcomeText || !firstName || !lastName || !description) {
      return res.status(400).send({ message: "All fields are required." });
    }

    // Count the number of documents in the IntroHome collection
    const introCount = await IntroHome.countDocuments();
    console.log("introCount:", introCount);

    if (introCount <=1)  {
      
       console.log("firstName kaha hai :",firstName);
       
      const introDocument = await IntroHome.findOne({firstName:firstName}); // Replace with actual ID
      console.log("introDocument : ",introDocument);
      

      if (!introDocument) {
        return res.status(404).send({ message: "Intro document not found." });
      }

      // Update the document if found
      introDocument.welcomeText = welcomeText;
      introDocument.firstName = firstName;
      introDocument.lastName = lastName;
      introDocument.description = description;

      await introDocument.save();

      res.status(200).send({
        data: introDocument,
        success: true,
        message: "Intro document updated successfully",
        introCount,  // Send the count of documents
      });
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});





//About  routes
router.post("/add-about", authenticateToken, checkAdminMiddleWare, async (req, res) => {
  try {
    console.log(req.body);

    let { aboutImageUrl, aboutTitle, aboutDescription, aboutTodo, aboutListTodos } = req.body;

    if (!aboutImageUrl || !aboutTitle || !aboutDescription || !aboutTodo || !aboutListTodos) {
      return res.status(400).send({
        success: false,
        message: "All fields are required."
      });
    }

    const existingData = await About.findOne({ aboutTitle });
    console.log("existingData: ", existingData);
    if (existingData) {
      return res.status(400).json({ error: "About Data already exists." });
    }

    const newAboutList = new About({
      aboutImageUrl,
      aboutTitle,
      aboutDescription,
      aboutTodo,
      aboutListTodos
    });

    console.log("newAboutList:::", newAboutList);
    await newAboutList.validate();

    await newAboutList.save();

    res.status(200).send({
      success: true,
      message: "About data added successfully",
      newAboutList
    });

  } catch (error) {
    console.error('Error creating About card:', error);

    res.status(400).send({ 
      success: false, 
      message: error.message || "An unexpected error occurred while creating the About card." 
    });
  }
});


router.put("/update-about", authenticateToken, checkAdminMiddleWare, async (req, res) => {
  try {
      const { _id, aboutImageUrl, aboutTitle, aboutDescription, aboutTodo, aboutListTodos } = req.body;

      // Ensure that all necessary fields are provided
      if (!aboutImageUrl || !aboutTitle || !aboutDescription || !aboutTodo || !aboutListTodos || !_id) {
          return res.status(400).send({
              success: false,
              message: "All fields are required."
          });
      }

      const userEmail = req.user.email;
      const user = await User.findOne({ email: userEmail });
      if (!user) {
          return res.status(404).send({ message: "User not found." });
      }

      const userIdFromUserCollection = user._id;

      // Find and update the About document by _id and userId
      const updatedAboutDocument = await About.findOneAndUpdate(
          { _id },  // Search by _id and user ID
          { 
              $set: { aboutImageUrl, aboutTitle, aboutDescription, aboutTodo, aboutListTodos }
          },
          { new: true } // Return the updated document
      );

      console.log('updatedAboutDocument::',updatedAboutDocument);
      

      // If no document is found, send an error response
      if (!updatedAboutDocument) {
          return res.status(404).send({ message: "About document not found." });
      }

      // Send the updated document in the response
      res.status(200).send({
          success: true,
          message: "About updated successfully",
          data: updatedAboutDocument
      });

  } catch (error) {
      console.error("Error: ", error.message); // Log the error for debugging
      res.status(400).send({
          success: false,
          message: error.message || "Error updating About document"
      });
  }
});


router.delete("/delete-about",authenticateToken,checkAdminMiddleWare,async(req,res) => {
    try {
        console.log("Request body:", req.body); // Log request body

         const {aboutId}=req.body
         if (!aboutId) {
          return res.status(400).send({
            success: false,
            message: "About ID is required.",
          });
        }
         // Find and delete the document by ID
    const aboutData = await About.findByIdAndDelete(aboutId);
    console.log("aboutData:",aboutData);
    
    if (!aboutData) {
      return res.status(404).send({
        success: false,
        message: "About Data not found.",
      });
    }

           res.status(200).send({
            data: aboutData,
            success:true,
            message:'About Data Deleted successfully'
           })

    } catch (error) {
        res.status(400).send({ success: false, message: error.message || "Error deleting About data." });       
    }
})





//project routes
router.post("/add-project",authenticateToken,checkAdminMiddleWare ,async(req,res) => {
    

    try {
      console.log(req.body);
      
        
      const {projectTitle,projectLink,projectImageOne,projectImageSecond,projectDescription,projectDetailsList,projectTechUsedImage}=req.body
     

      let newProjectList =await Projects.findOne({ projectTitle });

      console.log("newProjectList:::",newProjectList);
      
        if(!newProjectList){
            newProjectList=new Projects({projectTitle,projectLink,projectImageOne,projectImageSecond,projectDescription,projectDetailsList,projectTechUsedImage})
        } else{
            return res.status(201).send({
                success:true,
                message:'About Card Already Created !',
                newProjectList,

            })
        }     
        
        await newProjectList.save()
            return res.status(200).send({
                success:true,
                message:'project Details Created !',
                // newProjectList,

            })

    } catch (error) {
         res.status(400).send(error+"hi error ")        
    }
})


router.put("/update-project",authenticateToken,checkAdminMiddleWare,async(req,res) => {
    try {
        // console.log("Request body:", req.body);
           const projectData=await Projects.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            {new :true}
           );
        //    console.log("Update data:", projectData); 
           res.status(200).send({
            data:projectData,
            success:true,
            message:'project Data Updated successfully'
           })

    } catch (error) {
         res.status(400).send(error+"hi error ")        
    }
})

router.delete("/delete-project",authenticateToken,checkAdminMiddleWare,async(req,res) => {
    try {
        console.log("Request body:", req.body); // Log request body
        const {projectId}=req.body

        if (!projectId) {
          return res.status(400).send({
            success: false,
            message: "Project ID is required.",
          });
        }


        const projectData = await Projects.findOneAndDelete({ _id: projectId });
        console.log("projectData:",projectData);
        

        if (!projectData) {
          return res.status(404).send({
            success: false,
            message: "Project data not found.",
          });
        }


        res.status(200).send({
          data: projectData,
          success: true,
          message: "Project data deleted successfully.",
        });

    } catch (error) {
      console.error("Error:", error); // Log the error for debugging
      res.status(500).send({
        success: false,
        message: `Server error: ${error.message}`,
      });
       
    }
})




//skills routes
router.post("/add-skill",authenticateToken,checkAdminMiddleWare,async(req,res) => {
    
    try {
        console.log("req.body",req.body);
        
      const {mySkillImage,mySkilltitle}=req.body
     
         // Check if skill already exists
      let newSkillData =await MySkills.findOne({ mySkilltitle });
       console.log("newSkillData",newSkillData);
      
       if (newSkillData) {
        // If skill exists, send a response indicating it's already created
        return res.status(201).send({
          success: true,
          message: 'Skill card already created!',
          newSkillData,
        });
      }else {
        // If skill doesn't exist, create and save the new skill
        newSkillData = new MySkills({
          mySkillImage,
          mySkilltitle,
        });

      
           await newSkillData.save();
           return res.status(200).send({
            success: true,
            message: 'Skill added!',
            newSkillData,
          });
        }


    } catch (error) {
         res.status(400).send(error+"hi error ")        
    }
})

router.put("/update-skill", authenticateToken, checkAdminMiddleWare,async(req,res) => {
    try {
        // console.log("Request body:", req.body);
           const skillsData=await MySkills.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            {new :true}
           );
        //    console.log("Update data:", projectData); 
           res.status(200).send({
            data:skillsData,
            success:true,
            message:'skills Data Updated successfully'
           })

    } catch (error) {
         res.status(400).send(error+"hi error ")        
    }
})

router.delete("/delete-skill",authenticateToken,checkAdminMiddleWare,async(req,res) => {
    try {
        console.log("Request body:", req.body); // Log request body
        const {skillId}=req.body
           const skillsData=await MySkills.findOneAndDelete({_id: skillId });
           console.log("Deleted skillsData data:", skillsData); // Log deleted data
           
           
           
           res.status(200).send({
            data:skillsData,
            success:true,
            message:'skills Data Deleted successfully'
           })

    } catch (error) {
         res.status(400).send(error+"hi error ")        
    }
})




//experience routes 
router.post("/add-experience",authenticateToken,checkAdminMiddleWare,async(req,res) => {
    try {
      console.log(req.body);
      const {   myExperienceTitle,myExperiencePeriod,myExperienceCompany,myExperienceDescription}=req.body
     
        let newExperienceData=await MyExperiences.findOne({ myExperiencePeriod });
           console.log("newExperienceData::",newExperienceData);
           
        if(!newExperienceData){
            newExperienceData=new MyExperiences({myExperienceTitle,myExperiencePeriod,myExperienceCompany,myExperienceDescription})
        }else{
            return res.status(201).send({
                success:true,
                message:'ExperienceData Card Already Created !',
                newExperienceData,

            })
        }

            await newExperienceData.save()
            return res.status(200).send({
                success:true,
                message:'Experience added !',
                newExperienceData,

            })

    } catch (error) {
         res.status(400).send(error+"hi error ")        
    }
})

router.put("/update-experience",authenticateToken,checkAdminMiddleWare,async(req,res) => {
    try {
        console.log("Request body:", req.body);

           const newExperienceData=await MyExperiences.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            {new :true}
           );
           console.log("Update data:", newExperienceData); 
           res.status(200).send({
            data:newExperienceData,
            success:true,
            message:'Experience Data Updated successfully'
           })

    } catch (error) {
         res.status(400).send(error+"hi error ")        
    }
})

router.delete("/delete-experience",authenticateToken,checkAdminMiddleWare,async(req,res) => {
    try {
        console.log("Request body:", req.body); // Log request body
           const newExperienceData=await MyExperiences.findOneAndDelete({ _id: req.body.expId });
        //    console.log("Deleted data:", MyExperiences); // Log deleted data
           res.status(200).send({
            data:newExperienceData,
            success:true,
            message:'skills Data Deleted successfully'
           })

    } catch (error) {
         res.status(400).send(error+"hi error ")        
    }
})



//dsa routes
router.post("/add-dsaproblem", authenticateToken,checkAdminMiddleWare  ,async (req, res) => {
    try {
        const { topicTitle, problemName, questionLinkFirst, articleLink, youtubeLink, questionLinkSecond } = req.body;
        console.log(req.body);

        let dsaProblem = await MyDsaProblems.findOne({ problemName, topicTitle });


        if (!dsaProblem) {
            // If the DSA problem doesn't exist, create a new one
            dsaProblem = new MyDsaProblems({ topicTitle, problemName, questionLinkFirst, articleLink, youtubeLink, questionLinkSecond });
        } else {
            // If the DSA problem already exists, send a success response with the existing data
            return res.status(201).send({
                success: false,
                message: 'DSA Problem Already Created!',
                dsaProblem,
            });
        }

        await dsaProblem.save();

        return res.status(200).send({
            success: true,
            message: 'DSA coding Problem successfully created!',
            dsaProblem,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send("Error: " + error);
    }
});

router.put("/update-dsaproblem", authenticateToken,checkAdminMiddleWare  ,async (req, res) => {
    try {
       
          console.log("Request body:", req.body);
          const dsaProblem=await MyDsaProblems.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            {new :true}
           );
           console.log("Update data:", dsaProblem); 
     
        // Document updated successfully
        res.status(200).send({
            success: true,
            message: 'DSA problem updated successfully',
            dsaProblem
        });
    } catch (error) {
        // Handle any errors that occur during the update operation
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


router.delete("/delete-dsaproblem",authenticateToken ,checkAdminMiddleWare ,async(req,res) => {
    try {
        console.log("Request body:", req.body); // Log request body
           const dsaProblem=await MyDsaProblems.findOneAndDelete(
            { _id: req.body.problemId }
           );
           console.log("Deleted data:", dsaProblem); // Log deleted data
           res.status(200).send({
            data:dsaProblem,
            success:true,
            message:'dsaProblem  Deleted successfully'
           })

    } catch (error) {
         res.status(400).send(error+"hi error ")        
    }
})








router.post("/add-blog",authenticateToken,checkAdminMiddleWare  ,async(req,res) => {
    

    try {
        
      const {blogCategory,blogImageUrl,blogTitleName,blogDescription,read_more_route,Contributer_Name,posted_Date,blogContent}=req.body
        console.log("request body: ",req.body);

        let myblogdatas =await MyBlogDatas.findOne({ blogTitleName });
         console.log("myblogdatas",myblogdatas);
         
      if(!myblogdatas){
        myblogdatas=new MyBlogDatas( {blogCategory,blogImageUrl,blogTitleName,blogDescription,read_more_route,Contributer_Name,posted_Date,blogContent})
      } else{
          return res.status(201).send({
              success:true,
              message:'blogData Already Created !',
              myblogdatas,

          })
      }     
     console.log("myblogdatas : ",myblogdatas);
           
           await myblogdatas.save();

            return res.status(200).send({
                success:true,
                message:'blogData has been  created succesfully !',
                myblogdatas,
            })

    } catch (error) {
      console.error(error);
      res.status(400).send("Error: " + error);     
    }
})


router.put("/update-blog", authenticateToken ,checkAdminMiddleWare ,async (req, res) => {
    try {
       
          console.log("Request body:", req.body);
          const blogData=await MyBlogDatas.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            {new :true}
           );
           console.log("Update data:", blogData); 
     
        // Document updated successfully
        res.status(200).send({
            success: true,
            message: 'DSA problem updated successfully',
            blogData
        });
    } catch (error) {
        // Handle any errors that occur during the update operation
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/delete-blog",authenticateToken,checkAdminMiddleWare  ,async(req,res) => {
    try {
        console.log("Request body:", req.body); // Log request body
           const blogData=await MyBlogDatas.findOneAndDelete(
            { _id: req.body.blogId }
           );
           console.log("Deleted data:", blogData); // Log deleted data
           res.status(200).send({
            data:blogData,
            success:true,
            message:'blogData  Deleted successfully'
           })

    } catch (error) {
         res.status(400).send(error+"hi error ")        
    }
})



module.exports = router





