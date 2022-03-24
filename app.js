const bodyParser=require("body-parser");
const request=require("request");
const express=require("express");
const app=express();
const https=require("https");

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));
app.listen(process.env.PORT||3000,function(){
  console.log("server running on port 3000");
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");

});


app.post("/",function(req,res){
let firstName=req.body.fName;
let lastName=req.body.lName;
let email=req.body.email;
let data={
  members:[{
    email_address: email,
    status:"subscribed",
    merge_fields:{
      FNAME: firstName,
      LNAME: lastName
    }
  }]
};
const jsonData=JSON.stringify(data);
const url="https://us14.api.mailchimp.com/3.0/lists/0c3fc46ab2"

const options={
  method:"POST",
  auth:"Ciaraerica23:bdea5e4f29364bd9ef7c30fbd04137be-us14"
}
const request=https.request(url,options,function(response){

  if (response.statusCode===200){

      res.sendFile(__dirname+"/success.html");
  }else{
      res.sendFile(__dirname+"/failure.html");
}
response.on("data",function(data){
  console.log(JSON.parse(data));


}
);
});
request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
