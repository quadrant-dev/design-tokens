// Card Function

async function getFile(file,section) {
  
      let x = await fetch(file);
      let y = await x.json();

      let output = ""
      let parent = document.getElementById("tokenCards");
    let div = document.createElement("div")
    let title = document.createElement("h3")
    title.innerHTML = section;
    div.classList.add("table-info")
    div.setAttribute("id",`card-${section.toLowerCase()}`);
    div.appendChild(title)
    parent.appendChild(div) 
    let index = 0
    switch (section) {
      case "border":
        
        for(let item in y){
          output += `
          <div class="card card-content" id=${item}>
          <h5>${item}</h5>
          <div class="card-info">
          <p>${y[item].description}</p>
        <span>${y[item].value}</span>
        </div>
        </div>
        `
        if(div != null){
          div.innerHTML += output;
        }
        
    } 
        break;
        
        case "color": 
        
        for (const [item, value] of Object.entries(y)) {
          index++;
          let colorParent = document.createElement("div")
          let colorTitle = document.createElement("h3")
          colorTitle.innerHTML = item;
          colorParent.classList.add("parent-section")
          colorParent.setAttribute("id",`color-${item}`);
          let colorItem = "";    
          let colorMode = "light";      
          let swatch = ""

          for(let color in value){
            let colorValue = ""  
            let colorDescription = ""  
            let colorValueItem = value[color].value;
            let colorDescriptionItem = value[color].description;                    

            if(colorValueItem.includes("{") || colorValueItem.includes("}") ){
              var colorSub = colorValueItem.substring(
                colorValueItem.indexOf("{") + 1, 
                colorValueItem.lastIndexOf(".")
                );
                colorValue = value[color].value.replace("{","").replace("}","").replace(".","").replace(colorSub,"");
              }else{
                colorValue = value[color].value
              }


              if(colorDescriptionItem != null){
                 colorDescription = value[color].description
              }else{
                colorDescription = value[color].type
              }
              
               if(colorDescription.includes("#")){
                 colorMode = lightOrDark(colorDescription)
                 swatch = colorDescription;
                 
                }else if(colorValue.includes("#")){
                  colorMode = lightOrDark(colorValue)
                  swatch = colorValue;
               }                         

              colorItem += `
              <div class="card color-card" id=${color} data-mode="${colorMode}">
              <div class="card-inner">
              <span class="color-swatch"><span class="swatch-box swatch-${colorValue.toLowerCase()}" style="background-color:${swatch}"></span></span>
              <div class="card-content">
              <span class="card-head"><h5>${color}</h5><i onClick="copyCode('${swatch}')" title="Copy Code" class="fa-regular fa-copy copy-${colorValue.toLowerCase()}"></i></span>
              <div class="card-info">
              <p>${colorDescription}</p>
              <span class="${colorValue.toLowerCase()}">${colorValue.toLowerCase()}</span>
              </div>
              </div>
              </div>
              </div>
              `                                                                

              if(colorParent != null){
                colorParent.innerHTML = colorItem
              }
             
            }                 
            // colorParent.insertBefore(colorTitle,colorParent.firstChild())        
            colorParent.insertBefore(colorTitle,colorParent.firstChild)
        if(div != null){
          div.innerHTML += colorParent.outerHTML;
        }    
        

        for(let hex in value){

          let copyBtn = document.querySelector(`.copy-${hex.toLowerCase()}`)
          let colorHex = document.querySelector(`.${hex.toLowerCase()}`)
          let hexSwatch = document.querySelector(`.swatch-${hex.toLowerCase()}`)
          if(colorHex){
            let colorClass = colorHex.getAttribute("class")
          if(!colorClass.includes("#")){
            colorHex.innerHTML = value[colorClass].description;
             hexSwatch.style.backgroundColor = value[colorClass].description;  
             swatch = value[colorClass].description;              
              copyBtn.setAttribute("onClick",`copyCode('${swatch}')`)
          }
          
        }          
        }

        }

        colorModeFilter();       

    
    break;
      default:
        break;
    }

  }


// Output Cards

  async function outputCards(){
    let content = {
      "border":{
      name: "Border",
      path: "./assets/json/border.json"
    },
    "color":{
      name: "Color",
      path: "./assets/json/color.json"
    },
    "typography":{
      name:"Typography",
      path: "./assets/json/typography.json"
    }
  };
    let nav = document.getElementById("tokenNav");
    let navContent = "";
    for(let link in content ){
      navContent += `<a href="#card-${link}">${content[link].name}</a>`
    }
    
    nav.innerHTML = navContent
    
    for(let section in content){
    
   getFile(content[section].path,section);
   
    }
  }

  outputCards();
  




  // Light or Dark Function & Filter

  function lightOrDark(color) {

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
  
      // If HEX --> store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
  
      r = color[1];
      g = color[2];
      b = color[3];
    } 
    else {
  
      // If RGB --> Convert it to HEX: http://gist.github.com/983661
      color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'
      )
               );
  
      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    }
  
    // HSP equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );
  
    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {
  
      return 'light';
    } 
    else {
  
      return 'dark';
    }
  }

 function colorModeFilter(){
 let sections = document.querySelectorAll(".parent-section")
  let lightCards = document.querySelectorAll(".color-card[data-mode='light']");
  let darkCards = document.querySelectorAll(".color-card[data-mode='dark']");
  let filter = document.querySelector("#filter_mode")
  
  filter.addEventListener("change",(e)=>{
    
 if(e.target.value == "light"){

  lightCards.forEach(card => {
    card.style.display = "block";
  });
  darkCards.forEach(card=>{
    card.style.display = "none";
    card.classList.add("hidden")
  })
  

 }else if(e.target.value == "dark"){
  
  lightCards.forEach(card => {
    card.style.display = "none";
    card.classList.add("hidden")
  });
  darkCards.forEach(card=>{
    card.style.display = "block";
  })
 }else if(e.target.value == "all"){
  
  lightCards.forEach(card => {
    card.style.display = "block";
  });
  darkCards.forEach(card=>{
    card.style.display = "block";
  })
 }

  })

  sections.forEach(section=>{
    let children = section.children

    for(let child of children){
      console.log(child)
    }
  })

  }


  // Copy Code

  function copyCode(swatch){
    navigator.clipboard.writeText(swatch)
  }
