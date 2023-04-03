import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import helmet from 'helmet'
import dataRoutes from './routes/data.js'
import authRoutes from './routes/auth.js'
import favouriteRoutes from './routes/favourite.js'
import filterRoutes from './routes/filter.js'
import path from 'path'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename=fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
console.log(__dirname)

const app = express();
dotenv.config();
// app.set("trust proxy",1)
app.use(express.json())
app.use(cors({
  origin:"https://classified-ryo-aoyama.netlify.app",
  credentials:true,
}))
// app.use(cors());
app.use(helmet({
  crossOriginResourcePolicy: false,  //enable to display images on frontend
}))
app.use(cookieParser())
app.use("/",dataRoutes);
app.use("/auth",authRoutes)
app.use("/filter",filterRoutes)
app.use("/favorite",favouriteRoutes)
// app.use(express.static(path.join(__dirname,'notebook','build')))
app.use(express.static('public'))

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "./notebook", "build", "index.html"));
//   });




app.listen(process.env.PORT || 8800,()=>{
    console.log("server running")
})