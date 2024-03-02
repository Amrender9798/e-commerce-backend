import PersonalInfo from "../models/personalInfo.js";

// Import necessary modules


// Controller function to store personal information
export const storePersonalInfo = async (req, res) => {
  try {
    const user = req.userData.userId;
    const {phone, street, city, state, postalCode } = req.body;

    // Create a new instance of the PersonalInfo model
    const personalInfo = new PersonalInfo({
       user, 
      phone,
      street,
      city,
      state,
      postalCode,
    });

    const savedInfo = await personalInfo.save();

    res.status(201).json(savedInfo);
  } catch (error) {
    console.error("Error storing personal information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPersonalInfo = async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.find();

    res.status(200).json(personalInfo);
  } catch (error) {
    console.error("Error retrieving personal information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
