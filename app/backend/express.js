import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import pubRoutes from "./routes/tbookpub.route.js";
import memberRoutes from "./routes/tsalonuser.route.js";
import draftRoutes from "./routes/tbookdraft.route.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use("/", pubRoutes);
app.use("/", memberRoutes);
app.use("/", draftRoutes);

export default app;
