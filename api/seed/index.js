// Function to hash passwords
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import Student from "../modals/student.js";
import students from "./studentseed.js";
import blocks from "./blockseed.js";
import Block from "../modals/block.js";
import Floor from "../modals/floor.js";
import Admin from "../modals/admin.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", ".env") });
const hashPassword = async (rollNumber) => {
    const saltRounds = 10; 
    return await bcrypt.hash(rollNumber, saltRounds);
  };
  const seedAdmin = async () => {
    try {
      await Admin.deleteMany({});
      // for (let student of students) {
      //   student.password = await hashPassword(student.rollNumber); 
      // }
      const admin=new Admin({
        username:"Srini", 
        password:await hashPassword("srini")
      })
      await admin.save()
      console.log("Admin data with hashed passwords seeded successfully");
    } catch (error) {
      console.error("Error seeding student data:", error);
      throw error;
    }
  };
const seedStudents = async () => {
    try {
      await Student.deleteMany({});
      for (let student of students) {
        student.password = await hashPassword(student.rollNumber); 
      }
      await Student.insertMany(students);
      console.log("Student data with hashed passwords seeded successfully");
    } catch (error) {
      console.error("Error seeding student data:", error);
      throw error;
    }
  };
const seedBlocks = async () => {
    try {
      await Block.deleteMany({});
      await Block.insertMany(blocks);
  
      console.log("Block data seeded successfully");
    } catch (error) {
      console.error("Error seeding block data:", error);
      throw error;
    }
  };
const seedFloors = async () => {
    try {
      await Floor.deleteMany({});
      const blocks = await Block.find({});
      for (let block of blocks) {
        for (let i = 1; i <= block.totalFloors; i++) {
          const floor = new Floor({
            blockId: block._id,  
            floorNumber: i,      
            totalRooms: 10,      
            availableRooms: 10   
          });
  
          await floor.save();
        }
      }
  
      console.log("Floor data seeded successfully");
    } catch (error) {
      console.error("Error seeding floor data:", error);
      throw error;
    }
  };

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDb is connected");
    await seedAdmin();
    await seedStudents();
    await seedBlocks();
    await seedFloors();
  } finally {
    await mongoose.disconnect();
  }
};

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exitCode = 1;
});