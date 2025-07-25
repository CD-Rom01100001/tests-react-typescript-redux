import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

// const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI)
  .then(() => {
    // app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    console.log(`Успешное подключение к MongoDB`)
  })
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err));

  export default app;