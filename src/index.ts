import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { router } from './router'

dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/patient", router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});