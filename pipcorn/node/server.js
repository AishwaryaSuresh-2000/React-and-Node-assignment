
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import multer from "multer";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
const { sign, verify } = jwt;

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());


main();

async function main() {

  await mongoose.connect("mongodb+srv://Aishwarya:ljdk3kXlpStDK5FO@cluster0.escgz1o.mongodb.net/?retryWrites=true&w=majority")


  const createTokens = (user) => {
    const accessToken = sign({ email: user.email }, "jwtsecretplschange");

    return accessToken;
  };

  const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken)
      return res.status(400).json({ error: "User not Authenticated!" });

    try {
      const validToken = verify(accessToken, "jwtsecretplschange");
      if (validToken) {
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  };


  const ProductSchema = new mongoose.Schema({
    pid: Number,
    name: String,
    price: Number,
    image: String,
    description: String,
  });

  const User = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate(value) { },
    },
    password: {
      type: String,
      required: true,
    },
  });

  const Product = mongoose.model("Product", ProductSchema);
  const persons = await Product.find()

    .then(console.log("hellooooo"))
    .catch((error) => console.log(error));

  app.get("/api/products", (req, res) => {

    console.log(persons);
    const changed = persons;

    console.log(typeof changed);
    res.send(persons);
  });

  app.get("/api/products/:_id", async (req, res) => {
    try {
      const productId = req.params._id;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  const imageSchema = new mongoose.Schema({
    imageUrl: {
      type: String,
      required: true,
    },
  });
  
  const Image = mongoose.model('Image', imageSchema);
  
 
  app.get("/", cors(), (req, res) => { });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage });
  
  app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
  
  
    res.json({ message: 'Image uploaded successfully' });
  });
  const newSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  const collection = mongoose.model("collection", newSchema);

  app.post("/login", async (req, res) => {
    
    const { email, password } = req.body;

    try {
      const user = await collection.findOne({ email: email });
      const isMatch = await bcrypt.compare(password, user.password);
      if (user.email === email && isMatch) {
        console.log("sucess");
        const accessToken = createTokens(user);
        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: false,
        });

        res.json("exist");
      }
      else {
        res.json("notexist")
      }
    } catch (e) {
      res.json("fail");
    }
  });

  app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const data = {
      name: name,
      email: email,

      password: await bcrypt.hash(password, 8),
    };

    try {
      const check = await collection.findOne({ email: email });

      if (check) {
        res.json("exist");
      } else {
        res.json("notexist");
        await collection.create([data]);
      }
    } catch (e) {
      res.json("fail");
    }
  });
  
}

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

