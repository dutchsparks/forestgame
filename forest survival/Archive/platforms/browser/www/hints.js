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
    ["hard rock", "bird"], "feather"
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

recipes.forEach(craft => {
     let item = document.createElement("li");
    let text = document.createTextNode(craft[1]);
    item.appendChild(text);
    let not_ordered = document.getElementById("hints_list");
    not_ordered.appendChild(item);
});

  const items = document.querySelectorAll("li");
 items.forEach(item => {
  item.addEventListener( "click", function () {
recipes.forEach( ingredients => {
     if (ingredients.includes(item.innerText)) {
      const solution = document.getElementById("solution");
       solution.style.display = "flex";
        solution.innerText = `To create a ${ingredients[1]} you need to combine 
      ${ingredients[0].length} items. 
        1 of those items is ${ingredients[0][Math.floor(Math.random()*2)]}. `;

           }
})

 } )

 } );
 let explanation = true;
 (function () {
     if (JSON.parse(localStorage.getItem('explanation')) !== null) {
           explanation = JSON.parse(localStorage.getItem('explanation'));
          }

 }) ();

  if (explanation === false) {
      document.getElementById("explanation").style.display = "none";
       document.getElementById("hints").style.display = "inline";
       }

document.getElementById("okay").addEventListener( "click", function () {
     document.getElementById("explanation").style.display = "none";
      document.getElementById("hints").style.display = "inline";
       if (document.getElementById("check").checked) {
            explanation = false;
            localStorage.setItem('explanation', JSON.stringify(explanation));
       }
});