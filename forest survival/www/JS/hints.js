let inventory = ["tree", "lake", "dry grass", "herbs", "leaves", "bone", "string", "soft rock", "hard rock", "stick", "empty can",
  "safety pin", "battery", "foil", "bird", "rabbit", "worm"
];

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
if (JSON.parse(localStorage.getItem('inventory')) !== null) {
  inventory = JSON.parse(localStorage.getItem('inventory'));
}


let all = [];

recipes.forEach(product => {
  all.push(product[1]);
});
let remaining = all.filter(argument => {

  return !inventory.includes(argument)
});
remaining = remaining.sort();
remaining.forEach(craft => {
  const item = document.createElement("li");
  const text = document.createTextNode(craft);
  item.appendChild(text);
  const not_ordered = document.getElementById("hints_list");
  not_ordered.appendChild(item);
});

const items = document.querySelectorAll("li");
items.forEach(item => {
  item.addEventListener("click", function() {
    recipes.forEach(ingredients => {
      if (ingredients.includes(item.innerText)) {
        const solution = document.getElementById("solution");
        solution.style.display = "flex";
        solution.innerText = `To create a ${ingredients[1]} you need to combine 
      ${ingredients[0].length} items. 
        1 of those items is ${ingredients[0][Math.floor(Math.random()*2)]}. `;

      }
    })

  })

});
let explanation = true;
(function() {
  if (JSON.parse(localStorage.getItem('explanation')) !== null) {
    explanation = JSON.parse(localStorage.getItem('explanation'));
  }

})();

if (explanation === false) {
  document.getElementById("explanation").style.display = "none";
  document.getElementById("hints").style.display = "flex";
}

document.getElementById("okay").addEventListener("click", function() {
  document.getElementById("explanation").style.display = "none";
  document.getElementById("hints").style.display = "flex";
  if (document.getElementById("check").checked) {
    explanation = false;
    localStorage.setItem('explanation', JSON.stringify(explanation));
  }
});

if (remaining.length === 0) {
  document.getElementById("score").innerText =
    "Congratulations you have crafted all the items. A 2nd version of this game in a new environment is currently being developed. If you would like a heads up when the game launches you can leave your email address in the contact section."
} else {
  document.getElementById("score").innerText = `${remaining.length}/${recipes.length} left`;
}
