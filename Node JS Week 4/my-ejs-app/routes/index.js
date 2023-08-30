
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cache = require('nocache');
let flag = 0;
router.use(cache());
session.LoggedIn = false;
router.get('/', function(req, res) {
  if (session.LoggedIn) {
    res.redirect('/home');
  } else {
    let error = null;
    if (session.loginErr) {
      error = flag === 1 ? 'Incorrect Password' : 'Invalid Email';
      session.loginErr = false;
    }
    res.render('index', { err: error });
  }
});



router.post('/home', function(req, res) {
  values.email = req.body.email;
  values.password = req.body.password;

  session.user = users.find((user) =>{
     if(user.email === values.email){
      flag=1;
      if(user.password === values.password){
        flag=2
        return true
      }else{
        return false
      }
     }else{
      return false
     }
    });

console.log(session.user);
  
if (session.user) {
    session.LoggedIn = true;
    return res.redirect('/home');
  } else {
    session.LoggedIn = false;
    session.loginErr = true;
    return res.redirect('/');
  }
});


router.get('/home', function(req, res) {
  if (session.LoggedIn) {
    const loggedInUser = users.find(user => user.email === values.email);
    if (loggedInUser) {
      return res.render('home', { Username: loggedInUser.Username, products: products });
    } else {
      return res.redirect('/');
    }
  } else {
    return res.redirect('/');
  }
});




router.get('/home/products', (req, res) => {
  if (session.LoggedIn) {
    const loggedInUser = users.find(user => user.email === values.email);
    if (loggedInUser) {
      res.render('products', { Username: loggedInUser.Username, products: products });
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
});


router.get('/logout', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    session.LoggedIn = false;
    values = { email: "", password: "" };
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.redirect('/');
  });
});



const users = [
  {
  email: "vishnu8240.achu@gmail.com",
  password: "vishnu@1210",
  Username: "Vishnu N Raj"
  },
  {
    email: "alannixon2520@gmail.com",
    password: "alan@2520",
    Username: "Alan Nixon"
  }
]

let values = {
  email:"",
  password:""
} 
let products = [
  {
    No:"1",
    Name: "Asus Rog G15",
    Category: "Gaming Laptop",
    Description: "ASUS ROG Strix Scar 15 (2022), 15.6 || (39.62 cm) WQHD 240Hz/3ms, Intel Core i9-12900H 12th Gen, 8GB RTX 3070 Ti, Gaming Laptop (32GB/1TB SSD/Windows 11/Office 2021/Black/2.3 Kg), G533ZWZ-LN136WS",
    Image: "/images/Rogstrix2.jpg",
    Specs:"(39.62 cm) WQHD 240Hz/3ms, Intel Core i9-12900H 12th Gen, 8GB RTX 3070 Ti, Gaming Laptop 32GB/1TB",
    Price: "1,89,990 /-",
    Stock:"100"
  },
  {
    No:"2",
    Name: "Asus Rog G17",
    Category: "Gaming Laptop",
    Description: "ASUS ROG Strix Scar 17 (2023), 15.6 || (39.62 cm) WQHD 240Hz/3ms, Intel Core i9-13900H 13th Gen, 16GB RTX 3070 Ti, Gaming Laptop (32GB/1TB SSD/Windows 11/Office 2021/Black/2.3 Kg), G533ZWZ-LN136WS",
    Image: "/images/Rogstrix.jpg",
    Specs:"(39.62 cm) WQHD 240Hz/3ms, Intel Core i9-13900H 13th Gen, 16GB RTX 3070 Ti, Gaming Laptop 32GB/1TB",
    Price: "2,49,990 /-",
    Stock:"75"
  },
  {
    No:"3",
    Name: "Acer Predator H16",
    Category: "Gaming Laptop",
    Description: "Acer Predator Helios 16 Gaming Laptop ( 43.9cm(16) WQXGA Display, Extreme Performance Intel Core i9 13900HX/32 GB Ram/1 TB SSD/RTX 4080 Graphics/Windows 11 Home) , Abyssal Black, 2.7 KG",
    Image: "/images/Predator.jpg",
    Specs:"43.9cm(16) WQXGA Display,Intel Core i9 13900HX/32 GB Ram/1 TB SSD/RTX 4080 Graphics",
    Price: "2,49,990 /-",
    Stock:"60"
  },
  {
    No:"4",
    Name: "Acer Nitro 5",
    Category: "Gaming Laptop",
    Description: "Acer Nitro 5 Gaming Laptop AMD Ryzen5-6600H- (Windows 11 Home/16 GB/ 1 TB SSD/NVIDIA GeForce RTX 3050 4 GB Graphics/165Hz)| AN515-46 with 39.6 Cm (15.6 Inch) IPS Display",
    Image: "/images/Nitro.jpg",
    Specs:" AMD Ryzen5-6600H ,16 GB/ 1 TB SSD/NVIDIA GeForce RTX 3050 4 GB Graphics/165Hz | 39.6 Cm (15.6 Inch) IPS Display",
    Price: "88,890 /-",
    Stock:"45"
  },
  {
    No:"5",
    Name: "Lenova Legion 5",
    Category: "Gaming Laptop",
    Description:"Lenovo Legion 5 Pro AMD Ryzen 7 5800H40cm 500Nits QHD Gaming Laptop(16GB/1TB SSD/RTX 3060 6GB GDDR6 Graphics/165Hz/Windows 11/Office 2021/RGB Backlit/3mnth Xbox Game Pass/Storm Grey/2.45Kg),82JQ011FIN",
    Image: "/images/Legion.jpg",
    Specs:"AMD Ryzen 7 5800H40cm 500Nits QHD 16GB/1TB SSD/RTX 3060 6GB GDDR6 Graphics/165Hz",
    Price: "1,14,990 /-",
    Stock:"90"
  },
  {
    No:"6",
    Name: "HP Victus",
    Category: "Gaming Laptop",
    Description: "HP Victus [Smart Choice }Gaming Laptop 12th Gen Intel Core i5-12450H 15.6 FHD IPS (Windows 11 Home/16GB RAM/512GB SSD/NVIDIA GeForce RTX 3050 graphics/144Hz/Backlit KB/B&O/Alexa/MSO/Xbox),15-fa0666TX",
    Image: "/images/Victus.jpg",
    Specs:"12th Gen Intel Core i5-12450H 15.6 FHD IPS , 16GB RAM/512GB SSD/NVIDIA GeForce RTX 3050 graphics/144Hz",
    Price: "70,990 /-",
    Stock:"50"
  },
  {
    No:"7",
    Name: "Dell G16-7630",
    Category: "Gaming Laptop",
    Description: "Dell G16-7630 Gaming Laptop, Intel Core i7-13650HX/32GB/1TB SSD/NVIDIA RTX 4060, 8GB GDDR6/16 (40.64Cms) QHD+ 165Hz, 3ms, sRGB-100%/Win 11+MSO'21+McAfee 15 Month/Quantum White/2.87Kgs",
    Image: "/images/Dell.jpg",
    Specs:"Intel Core i7-13650HX/32GB/1TB SSD/NVIDIA RTX 4060, 8GB GDDR6/16 (40.64Cms) QHD+ 165Hz",
    Price: "1,73,990 /-",
    Stock:"70"
  },
  {
    No:"8",
    Name: "Acer Nitro 16",
    Category: "Gaming Laptop",
    Description: "Acer Nitro 16 Gaming Laptop AMD Ryzen™ 7 7840HS Octa Core Processor (8GB/ 512 GB SSD/NVIDIA GeForce RTX 4050 6GB Graphics/Windows 11 Home) AN16-41 with 40.64 cm (16) IPS Display",
    Image: "/images/Nitro16.jpg",
    Specs:"AMD Ryzen™ 7 7840HS Octa Core Processor (8GB/ 512 GB SSD/NVIDIA GeForce RTX 4050 6GB Graphics, 40.64 cm (16) Display",
    Price: "1,14,990 /-",
    Stock:"10"
  }
];
 

module.exports = router;
