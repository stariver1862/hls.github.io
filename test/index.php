<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>葫芦丝伴奏</title>
</head>
<style>
body { 
background:#f6f6f6; 
margin:0; 
padding:0; 
color:#333; 
}



#content { 

margin:20px auto;  

background:#fff; 

width:80%; 

padding:0 20px; 

border:1px solid #c0c0c1; 

border-bottom-color:#a8aaac; 

border-top-color:#ccc; 

box-shadow:0 1px 0 #dfe0e1; 

border-radius:3px; 

}



#container { 

width:80%; 

padding:0 5%; 

max-width:500px; 

}



h1, h2 { 

padding:10px 0px; 

border-bottom:0px solid #eee;  

padding-left:0; 

font-weight:300; 

line-height:1.1em; 

} 

p {
    font: 20px/1.5em "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
}


ul { 

list-style-type:none;  

margin:0;  

padding:0;  

position:relative; 

} 

li { 

margin:1.5em 0;  

position:relative; 

}



form { 

width:80%; 

margin: 20px 0; 

} 

input { 

display:block;  

width:100%;  

padding:0.3em 0.1em; 

text-indent:5px; 

border: 1px solid #e1e3e3; 

border-bottom-color:#e5e5e6; 

box-shadow: 0 -1px 0 #a7aaad; 

border-radius:3px; 

font-size:16px; 

font-family:inherit; 

box-sizing: border-box; 

-moz-box-sizing: border-box; 

-webkit-box-sizing: border-box;  

}



button { 

width:80%; 

max-width:300px;  

display:block; 

margin:20px auto; 

border:0px solid #0c6eb3; 

padding:10px; 

color:#fff; 

font-weight:bold; 

border-radius:0px; 

background: gainsboro; /* Old browsers */

}

.round_btn {
  display:block;
  height: 90px;
  width: 90px;
  border-radius: 50%;
  border: 0px solid gainsboro;
}

</style>
<body>
<?php
    echo '<input type="hidden" id="name" value="'.$_GET["name"].'">'; 
    echo '<input type="hidden" id="file" value="'.$_GET["file"].'">'; 
    ?>    
    <h1><div id="content">加载中...</div></h1>
    <script src="main.js" type="module"></script>
</body>
</html>
