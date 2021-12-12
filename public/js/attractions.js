
// Alchemista javascript Pop up

var AlchemistInfo = document.getElementById("Alchemista-info");

var openBtn = document.getElementById("JS-tab1");

var closeBtn = document.getElementsByClassName("JS-close")[0];

var overlay = document.getElementById("overlay");

openBtn.onclick = function(){
    AlchemistInfo.style.display = "block";
    overlay.style.opacity = 1;
};

closeBtn.onclick = function(){
    AlchemistInfo.style.display = "none";
    overlay.style.opacity = 0;
};


// Bicycle Shop Javascript Pop up

var BicycleInfo = document.getElementById("BicycleShop-info");

var BicycleOpenBtn = document.getElementById("JS-tab2");

var BicycleCloseBtn = document.getElementsByClassName("JS-close2")[0];

var overlay = document.getElementById("overlay");

BicycleOpenBtn.onclick = function(){
    BicycleInfo.style.display = "block";
    overlay.style.opacity = 1;
};

BicycleCloseBtn.onclick = function(){
    BicycleInfo.style.display = "none";
    overlay.style.opacity = 0;
};