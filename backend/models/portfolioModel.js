const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// IntroHome Schema
const introHomeSchema = new Schema(
  {
    welcomeText: {
      type: String,
      required: [true, "Welcome text is required."]
    },
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,unique: true,
      maxlength: [50, "First name must be less than 50 characters."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      maxlength: [50, "Last name must be less than 50 characters."],
    },
    description: {
      type: String,
      required: [true, "Description is required."]
    }
    // profilePicture: {
      // data: Buffer,
      // contentType: String,
    // },
  },
  { timestamps: true }
);

// About Schema
const aboutSchema = new Schema({
  
  aboutImageUrl: {
    type: String,
    required: true,
    unique: true, // Makes aboutTitle unique
  },
  aboutTitle: {
    type: String,
    required: true,
  },
  aboutDescription: {
    type: String,
    required: true,
  },
  aboutTodo: {
    type: String,
    required: true,
  },
  aboutListTodos: [{
    todo: {
      type: String,
      required: true,
    }
  }]
}, { timestamps: true });
// aboutSchema.index({ user: 1 }); // This allows multiple about cards per user.



// Project Schema
const projectSchema = new Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  projectLink: {
    type: String,
    required: true,
  },
  projectImageOne: {
    type: String,
    required: true,
  },
  projectImageSecond: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectDetailsList: [{
    projectDList: {
      type: String,
      required: true,
    }
  }],
  projectTechUsedImage: [{
    techImageUsed: {
      type: String,
      required: true,
    }
  }]
});

// MySkills Schema
const mySkillSchema = new Schema({
  mySkilltitle: {
    type: String,
    required: true,
  },
  mySkillImage: {
    type: String,
    required: true,
  }
});

// MyExperience Schema
const myExperienceSchema = new Schema({

  myExperienceTitle: {
    type: String,
    required: true,
  },
  myExperiencePeriod: {
    type: String,
    required: true,
  },
  myExperienceCompany: {
    type: String,
    required: true,
  },
  myExperienceDescription: {
    type: String,
    required: true,
  },
});

// MyHeader Schema
const myHeaderSchema = new Schema({
 
  myHeaderTitle: {
    type: String,
    required: true,
  },
  myHeaderLink: {
    type: String,
    required: true,
  }
});

// DSA Problems Schema
const dsaProblemSchema = new Schema({

  topicTitle: {
    type: String,
    required: true,
  },
  problemName: {
    type: String,
    required: true,
  },
  questionLinkFirst: {
    type: String,
    required: true,
  },
  articleLink: {
    type: String,
    required: true,
  },
  youtubeLink: {
    type: String,
    required: true,
  },
  questionLinkSecond: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Blog Data Schema
const blogDataSchema = new Schema({

  blogCategory: {
    type: String,
    required: true,
  },
  blogImageUrl: {
    type: String,
    required: true,
  },
  blogTitleName: {
    type: String,
    required: true,
  },
  blogDescription: {
    type: String,
    required: true,
  },
  read_more_route: {
    type: String,
    required: true,
  },
  Contributer_Name: {
    type: String,
    required: true,
  },
  posted_Date: {
    type: String,
    required: true,
  },
  blogContent: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = {
  IntroHome: mongoose.model("IntroHome", introHomeSchema),
  About: mongoose.model("About", aboutSchema),
  Projects: mongoose.model("Projects", projectSchema),
  MySkills: mongoose.model("MySkills", mySkillSchema),
  MyExperiences: mongoose.model("MyExperiences", myExperienceSchema),
  MyHeaders: mongoose.model("MyHeaders", myHeaderSchema),
  MyDsaProblems: mongoose.model("MyDsaProblems", dsaProblemSchema),
  MyBlogDatas: mongoose.model("MyBlogDatas", blogDataSchema),
};