const express=require("express")
const path=require('path')
const session=require("express-session")
const cookieParser = require("cookie-parser")
const app=express()


app.set(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 6000000 },
    resave: false 
}));

app.use((req, res, next) => {
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
let sessions;
let useremail="ajmal@gmail.com"
let password="ajmal@123"

let bikes=[
    {
    name:'duke',
    price:160000,
    Image:"https://media.zigcdn.com/media/model/2020/Mar/ktm-200-duke-bs6-right-side-view_360x240.jpg"
    },
    {
      name:'v3',
      price:140000,
      Image:"https://images.carandbike.com/bike-images/large/yamaha/r15-v30/yamaha-r15-v30.jpg?v=26"
      },
      {
        name:'honda',
        price:180000,
        Image:"https://www.drivespark.com/bikes-photos/models/450x350/herohfdeluxe_1666960090.jpg/3/x.pagespeed.ic.GypuEJSV5G.jpg"
        },
        {
          name:'hero splender',
          price:50000,
          Image:"https://5.imimg.com/data5/SELLER/Default/2022/5/GA/LU/PZ/152379188/hero-splendor-plus-bike-500x500.png"
        },
        {
          name:'ktm',
          price:190000,
          Image:"https://imgd.aeplcdn.com/1280x720/n/cw/ec/102893/rc-125-2021-right-side-view-2.jpeg?isig=0"
        },
        {
          name:'rx100',
          price:120000,
          Image:"https://bd.gaadicdn.com/processedimages/yamaha/yamaha-rx-100/640X309/v_rx-100-std1561366088.jpg"
        },
        {
          name:'pulser',
          price:120000,
          Image:"https://www.hindinews11.com/wp-content/uploads/2022/11/bajaj-pulser.jpg"
        },
        {
          name:'revolte',
          price:175000,
          Image:"https://www.jagranimages.com/images/newimg/12072021/12_07_2021-revolte_400_21824641.jpg"
        }

  ]

app.get("/",(req,res)=>{ 
    sessions=req.session;
    
    if(sessions.username){
        res.render("home",{bikes})  
    }else{
        res.render("login")
    }
})

app.post("/login",(req,res)=>{
    if(req.body.email===useremail && req.body.password===password){
        sessions=req.session
        sessions.username=req.body.email
        res.render("home",{bikes})
    }else{
        res.render("login",{error:"invalid username or password"})
    }   
})

app.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect("/")
})

app.listen(3000,()=>{
    console.log("server started to listning");
})
