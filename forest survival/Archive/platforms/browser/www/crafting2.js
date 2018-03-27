
function adSetter(){
alert(navigator.userAgent);
var admobid = {};
// select the right Ad Id according to platform
if( /(android)/i.test(navigator.userAgent) ) {
    admobid = { // for Android
        banner: 'ca-app-pub-3940256099942544/6300978111',
        interstitial: 'ca-app-pub-6869992474017983/1657046752'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-6869992474017983/4806197152',
        interstitial: 'ca-app-pub-6869992474017983/7563979554'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-6869992474017983/8878394753',
        interstitial: 'ca-app-pub-6869992474017983/1355127956'
    };
}

if(AdMob) AdMob.createBanner( {
    isTesting:true, //Remove this Before publishing your app
    adId:admobid.banner,
    position:AdMob.AD_POSITION.BOTTOM_CENTER,
    autoShow:true} );

}
  function onDeviceReady(){
  alert("device ready");
      adSetter();
  }


window.load=function(){
 document.addEventListener("deviceready", onDeviceReady, false);
};




/*function onDeviceReady() {
    document.removeEventListener('deviceready', onDeviceReady, false);

    // Set AdMobAds options:
    admob.setOptions({
        publisherId:          "ca-app-pub-7636206517959652~9893167436",  // Required
        interstitialAdId:     "ca-app-pub-7636206517959652/2908734913",  // Optional
        tappxIdiOS:           "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
        tappxIdAndroid:       "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
        tappxShare:           0.5                                        // Optional
    });
}

document.addEventListener("deviceready", onDeviceReady, false);

 document.getElementById("test_button").addEventListener( function () {
     admob.requestInterstitialAd({
    autoShowInterstitial: true
});
 });
*/



let inventory = ["tree", "lake", "dry grass", "herbs", "leaves", "bone", "string", "soft rock", "hard rock", "stick", "empty can",
    "safety pin", "battery", "foil", "bird", "rabbit", "worm"];
let crafting = [];


(function () {
     if (JSON.parse(localStorage.getItem('inventory')) !== null) {
          inventory = JSON.parse(localStorage.getItem('inventory'));
          }

 }) ();


// add the inventory items to the unordered list
function printItems() {
    inventory.sort();
  inventory.forEach(product => {
    let item = document.createElement("li");
    let text = document.createTextNode(product);
    item.appendChild(text);
    item.setAttribute("data-imageSource", `${item.innerText}.png`);
    let not_ordered = document.getElementById("inventory_list");
    not_ordered.appendChild(item);
  })
}
printItems();

// if you click on 1 of the list items:
function inventory_click() {
  let resources = document.querySelectorAll("li");
  for (let i = 0; i < resources.length; i++) {
    resources[i].addEventListener("click", function() {
      if (crafting.includes(resources[i].innerText)) {
        console.log("Item already in array");

      } else {
        document.getElementById("alert").style.visibility = 'hidden';
        document.getElementById("click_sound").play();
        resources[i].classList.toggle("selected");
        resources[i].style.color = "blue";
        if (resources[i].classList.contains("selected")) {

          crafting.push(resources[i].innerText);
          let icon = new Image();
          icon.src = `images/${resources[i].getAttribute("data-imageSource")}`;
          icon.classList.add("icon_image");
          icon.style.height = "50%";
          icon.style.width = "50%";
          icon.style.position = "relative";
          icon.style.top = "25%";
          icon.style.display = "block";
          icon.style.margin = "auto";
          document.querySelector('div:empty').appendChild(icon);
          console.log("crafting array: ", crafting);
        }

      }
    });
  }
}
inventory_click();

// Things we can craft
const recipes = [
  [
    ["lake", "empty can"], "dirty water"
  ],
  [
    ["hard rock", "soft rock"], "sharp rock"
  ],
  [
    ["sharp rock", "stick", "string"], "axe"
  ],
  [
    ["dirty water", "fire"], "clean water"
  ],
  [
    ["stick", "string"], "snare"
  ],
    [
       ["stick", "knife"], "unstrung bow"
    ],
     [
        ["unstrung bow", "string"], "bow"
     ],
  [
    [ "raw meat", "fire"], "edible meat"
  ],
  [
    ["feather", "stick", "sharp rock"], "arrow"
  ],
  [
    ["sling weapon", "bird"], "feather"
  ],
   [
       ["sand", "dirty water"], "mud"
   ],
  [
     ["clean water", "empty can"], "water can"
  ],
  [
      ["hard rock", "string"], "sling weapon"
  ],
  [
    ["stick", "string", "safety pin"], "fishing rod"
  ],
  [
    ["fishing rod", "worm", "lake"], "fish"
  ],
  [
    ["feather", "stick", "sharp rock"], "arrow"
  ],
  [
    ["fire", "clean water", "herbs"], "tea"
  ],
  [
    ["deer", "bow", "arrow"], "deer carcass"
  ],
  [
    ["deer carcass", "knife"], "blanket"
  ],
  [
    ["fish", "knife"], "fish bone"
  ],
  [
    ["logs", "leaves"], "shelter"
  ],
  [
    ["stick", "fish", "fire"], "edible fish"
  ],
  [
    ["rabbit", "snare"], "dead rabbit"
  ],
     [
        ["dead rabbit", "knife"], "raw meat"
     ],
    [
         ["battery", "foil", "dry grass"], "flame"
    ],
     [
        ["flame", "logs"], "fire"
     ],
  [
    ["bone", "hard rock"], "knife"
  ],
  [
    ["axe", "tree"], "logs"
  ],
  [
    ["fire", "leaves"], "smoke signal"
  ],
  [
    ["herbs", "cloth"], "disinfected bandage"
  ]
];



// The craftingf
let logged = false;

function craftFunction() {

  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i][0].every(elem => crafting.includes(elem)) &&
      recipes[i][0].length === crafting.length
    )
      {
        logged = true;
      newItem = recipes[i][1];
       if (!inventory.includes(recipes[i][1]) ){
            inventory.push(recipes[i][1]);
           addItemToList();
       }

      crafting = [];
      console.log("you made a " + recipes[i][1]);
      inventory_click();

      let boxImage = document.querySelectorAll("img");
      boxImage.forEach(box => box.parentNode.removeChild(box));
      alert(recipes[i][1]);
       document.getElementById("success").play();
localStorage.setItem('inventory', JSON.stringify(inventory));

      let listItem = document.querySelectorAll(".selected");
      listItem.forEach(item => {
        item.style.color = "white";
        item.classList.remove = "selected";

      })

    }

  }

  if (logged) {
    crafting = [];
    logged = false;
  } else {console.log(crafting);
   console.log( "test");
    failure();
  }

}

function failure() {

    console.log("failure");
    crafting = [];
    let icon = new Image();
    icon.src = `images/cross.png`;
    icon.id = "cross";
    document.getElementById("failure_box").appendChild(icon);
    icon.style.height = "70px";
    icon.style.width = "70px";
    let boxImage = document.querySelectorAll(".icon_image");
    boxImage.forEach(box => box.parentNode.removeChild(box));
    document.querySelectorAll("li").forEach(list => {
      list.style.color = "white";
      list.style.fontSize = "17px";
    })

}

document.getElementById("fresh").addEventListener("click", craftFunction);
document.getElementById("reset").addEventListener("click", resetAll);

function resetAll() {
  let images = document.querySelectorAll("img");
  images.forEach(image => image.parentNode.removeChild(image));
  crafting = [];
  let listItem = document.querySelectorAll("li");
  listItem.forEach(item => {
    item.style.color = "white";

  })
}


function alert(craft) {
  document.getElementById("alert").style.visibility = 'visible';
  document.getElementById("alert_message").innerText = `you successfully crafted: ${craft}!`;

  let icon = new Image();
  icon.src = `images/${craft}.png`;
  document.getElementById("alert").appendChild(icon);
  icon.style.height = "10%";
  icon.style.width = "10%";

}



//Printing the newly crafted item to the list
let newItem = "";

function addItemToList() {
  let item = document.createElement("li");
  let text = document.createTextNode(newItem);
  item.appendChild(text);
  item.setAttribute("data-imageSource", `${item.innerText}.png`);
  let not_ordered = document.getElementById("inventory_list");
  not_ordered.appendChild(item);
}


