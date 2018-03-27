//The container with items that can be used to craft other items
let inventory = ["tree", "lake", "dry grass", "herbs", "dry leaves", "leaves", "string", "soft rock", "hard rock", "stick", "empty can",
  "safety pin", "battery", "foil", "bird", "rabbit", "worm", "clay", "seeds"
];

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
    ["raw meat", "fire"], "edible meat"
  ],
  [
    ["feather", "stick", "sharp rock"], "arrow"
  ],
  [
    ["sling weapon", "bird"], "feather"
  ],
  [
    ["fire", "dirty water"], "charcoal"
  ],
  [
    ["clay", "fire"], "pottery"
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
    ["feather", "stick"], "arrow shaft"
  ],
  [
    ["arrow shaft", "string", "stick"], "arrow"
  ],
  [
    ["fire", "clean water", "herbs"], "tea"
  ],
  [
    ["deer", "bow", "arrow"], "deer carcass"
  ],
  [
    ["deer carcass", "bone knife"], "blanket"
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
    ["dead rabbit", "sharp rock"], "bone"
  ],
  [
    ["battery", "foil", "tinder"], "flame"
  ],
  [
    ["flame", "logs"], "fire"
  ],
  [
    ["bone", "hard rock"], "bone knife"
  ],
  [
    ["axe", "tree"], "logs"
  ],
  [
    ["fire", "leaves"], "smoke signal"
  ],
  [
    ["charcoal", "cloth"], "disinfected bandage"
  ],
  [
    ["bone knife", "tree"], "bark fiber"
  ],
  [
    ["logs", "string"], "raft"
  ],
  [
    ["fish", "fire", "stick"], "edible fish"
  ],
  [
    ["dry grass", "dry leaves"], "tinder"
  ],
  [
    ["logs", "axe"], "paddle"
  ],
  [
    ["stick", "bone knife", "string"], "pronged spear"
  ],
  [
    ["stick", "cloth"], "knapsack"
  ],
  [
    ["clay", "hard rock", "fire"], "clay oven"
  ],
  [
    ["bark fiber", "stick"], "woven basket"
  ],
  [
    ["seeds", "hard rock"], "flour"
  ],
  [
    ["flour", "clean water"], "dough"
  ],
  [
    ["dough", "clay oven"], "bread"
  ]
];

//Array will be used to put in inventory items
let crafting = [];


(function() {
  if (JSON.parse(localStorage.getItem('inventory')) !== null) {
    inventory = JSON.parse(localStorage.getItem('inventory'));
  }

})();


// add the inventory items to the list
function printItems() {
  inventory.sort();
  document.querySelectorAll("li").forEach(li => {
    li.parentNode.removeChild(li)
  });
  inventory.forEach(product => {

    const item = document.createElement("li");
    const text = document.createTextNode(product);

    item.appendChild(text);

    /*The list items get a data attribute that corresponds to the text of the list item.
      This data attribute will be used to determine which image needs to be shown when the list item is clicked.
       All images have been specifically named to allow for this to work*/
    item.setAttribute("data-imageSource", `${item.innerText}.png`);
    const list = document.getElementById("inventory_list");
    list.appendChild(item);
  })
}
printItems();


// if you click on 1 of the list items:
function inventory_click() {

  const resources = document.querySelectorAll("li");
  for (let i = 0; i < resources.length; i++) {
    resources[i].addEventListener("click", function() {
      if (document.querySelector('div.canvas:empty') === null) { //sub-optimal solution to prevent another list item from being selected when no empty canvas exists
        i = 1000;
      }
      if (!crafting.includes(resources[i].innerText)) {

        document.getElementById("alert").style.visibility = 'hidden';
        //document.getElementById("click_sound").play();
        resources[i].classList.toggle("selected");

        if (resources[i].classList.contains("selected")) {

          crafting.push(resources[i].innerText);
          const icon = new Image();
          icon.src = `../images/${resources[i].getAttribute("data-imageSource")}`; /*the earlier set data attribute is used to determine which image to show*/
          icon.classList.add("icon_image");
          document.querySelector('div.canvas:empty').appendChild(icon);
          console.log("crafting array: ", crafting);
        }

      }
    });
  }
}
inventory_click();


//craft and reset button
document.getElementById("reset").addEventListener("click", resetAll);
document.getElementById("craft").addEventListener("click", craftFunction);

function resetAll() {
  const images = document.querySelectorAll("img");
  images.forEach(image => image.parentNode.removeChild(image));
  crafting = [];
  const listItem = document.querySelectorAll("li.selected");
  listItem.forEach(item => {
    item.classList.toggle("selected");

  })
}


// check if the selected ingredients ( that are currently in the crafting array) are a recipe for a new item
let recipe;

function craftFunction() {
  recipe = recipes.find((recipe) => (
    recipe[0].every(elem => crafting.includes(elem)) &&
    recipe[0].length === crafting.length
  ));
  if (recipe) {
    success();
  } else {
    failure();
  }
}

function success() {
  newItem = recipe[1];
  if (!inventory.includes(recipe[1])) {
    inventory.push(recipe[1]);
    printItems();

  }
  console.log("you made a " + recipe[1]);
  inventory_click();

  const boxImage = document.querySelectorAll("img");
  boxImage.forEach(box => box.parentNode.removeChild(box));

  alert(recipe[1]);
  localStorage.setItem('inventory', JSON.stringify(inventory));

  const listItem = document.querySelectorAll(".selected");
  listItem.forEach(item => {
    item.classList.toggle("selected");
  });
  crafting = [];

}


//The Message You See When a Player Successfully Crafts Something
function alert(craft) {
  document.getElementById("alert").style.visibility = 'visible';
  document.getElementById("alert_message").innerText = `You successfully crafted:\n ${craft}!\n`;
  const icon = new Image();
  icon.src = `../images/${craft}.png`;
  document.getElementById("alert").appendChild(icon);
  icon.style.height = "15%";
  icon.style.width = "15%";
}

function failure() {
  crafting = [];
  const boxImage = document.querySelectorAll(".icon_image");
  boxImage.forEach(box => box.parentNode.removeChild(box));
  document.querySelectorAll("li.selected").forEach(list => {
    list.classList.toggle("selected");
  });
  const icon = new Image();
  icon.src = `../images/cross.png`;
  icon.id = "cross";
  document.getElementById("failure_box").appendChild(icon);
  icon.style.height = "70px";
  icon.style.width = "70px";
}
