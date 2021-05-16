const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: [true, "Please enter your  First Name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  lName: {
    type: String,
    required: [true, "Please enter your Last Name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  country: {
     type: String,
     required: [true, "Please enter your the name of your  Country "],
   },
   state: {
    type: String,
    required: [true, "Please enter your the name of your  State "],
  },
  city: {
    type: String,
    required: [true, "Please enter your the name of your  city "],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Your password must be longer than 6 characters"],
    select: false,
  },
  phoneCode: String,
  phoneNumber: {
    type: String,
    required: [true, "Please enter your number"],
    minLength: [10, "Please enter ten digits"],
    maxLength: [10, "Please enter only ten digits"],
  },
  gender: {
    type: String,
    required: [true, "Please enter your gender"],
  },
  skypeId: {
    type: String,
    required: [true, "Please enter your SkypeId"],
  },
  metropolis: {
    type: String,
    required: [true, "Please enter your Metropolis"],
  },
  briefUser: {
    type:  String,
    required: [true, "Please enter info about you"]
  },
  languagues: [
    {
      type :String,
      required: [true, "Please enter languages u speak"]
    }
  ],
  isAvailable: String,
  companyName: String,
  age: Number,
  role: String,
  experience: String,
  os: String,
  experience: String,
  linkedinProfile: String,
  devices: [
    {
      brand: String,
      model: String,
      os: String,
      ram: String,
      screen: String,
      primaryNetwork: String,
      secondryNetwork: String,
    }
  ],
  browsers: [
    {
      browser: String,
      version: String,
      os: String,
      osVersion: String,
      action: String,
    }
  ],
  domainKnowledge: [
    {
      type: String
    }
  ],
  typeOfTesting: [
    {
      type: String
    }
  ],
  testingTools: [
    {
      type: String
    }
  ],
  applicationsTested: [
    {
      type: String
    }
  ],
  contests: [
    {
      contestTitle: String,
      startDate: String,
      endDate: String
    }
  ],
  builds: [
    {
      build: String,
      project: String,
      cycleType: String,
      buildType: String,
      startDate: String,
      endDate: String,
      status: String
    }
  ],
  ratings: [
    {
      type: Number
    }
  ]

});



// Encrypting password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});



// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};



module.exports = mongoose.model("user", userSchema);