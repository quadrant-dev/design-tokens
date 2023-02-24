// Card Function

async function getFile(file,section) {
  
      let x = await fetch(file);
      let y = await x.json();
     
    for(let block in section.content){
      let parent = document.getElementById("tokenCards");
      let div = document.createElement("div")
      let title = document.createElement("h3")
      title.innerHTML = block;
      div.classList.add("table-info")    
      div.setAttribute("id",`card-${block.toLowerCase()}`);
      div.appendChild(title)
      parent.appendChild(div)                       
      switch (block) {
        
        case "global": 
        
        for( let item in y.global ){
          let groupEl = document.createElement("div")
          groupEl.classList.add("items-group")
          groupEl.innerHTML = `<h4>${item}</h4>`
          div.appendChild(groupEl)
          for(let el in y.global[`${item}`]){
          let itemEl = document.createElement("div")
          itemEl.classList.add("item-content")
          itemEl.innerHTML = `<div class="item-header"><h5>${el}</h5><span class="copy-main"><i class="fa-solid fa-copy"></i></span></div>`          
          groupEl.appendChild(itemEl)
          let nestedEl = true
          let itemContent = y.global[`${item}`][`${el}`]
          let globalVal = "";
          let globalType = "";
          let globalDescription = "";
          let valueEl = document.createElement("div")
          for(let [itemKey, itemValue] of Object.entries(y.global[`${item}`])){
            if(itemKey == "value" || itemKey == "type" || itemKey == "description"){
              nestedEl = false
              switch (itemKey) {
                case "value":
                  globalVal = itemValue
                  break;
              
                  case "type":
                    globalType = itemValue
                    break;
                    case "description":
                    globalDescription = itemValue
                    break;
                default:
                  break;
              }
            }
          }          
          if(nestedEl){         
          for(let [key,value] of Object.entries(itemContent)){
            
            if(key == "type" || key == "value" || key == "description"){
              
            switch (key) {
              case "value":
                if(value.includes("{") || value.includes("}")){    
                  value = value.replace("{","").replace("}","")    
                  let valueArray = value.split(".")    
                  let valueGroup = valueArray[0]
                  let valueItem = valueArray[1]                                                  
                  if(valueItem.includes("*")){
                    let valueItemArray = valueItem.split("*");
                    
                    valueItem = valueItemArray[0]
                  }else{
                  }
                  globalVal = y.global[`${valueGroup}`][`${valueItem}`].value
              
                }else{
                  
                  globalVal = value
                }
                
                break;
                case "type":

                  globalType = value
                  
                  break;
                  case "description":
                    
                    globalDescription = value
       
                    break;
                    
                    default:
                break;
            }
            if(!globalDescription){
              valueEl.innerHTML = `<div class="value-info"><h4>value: <span class="value-main">${globalVal}</span></h4><div><p>Type: ${globalType}</p></div></div>`            
            }else{
              valueEl.innerHTML = `<div class="value-info value-extra"><h4>value: <span class="value-main">${globalVal}</span></h4><div class="value-inner"><p>${globalDescription}</p><p>Type: ${globalType}</p></div></div>`            
            }
            itemEl.appendChild(valueEl)          
          }
        }
      }else{      
        valueEl.innerHTML = `<div class="value-info"><h4>value: <span class="value-main">${globalVal}</span></h4><div class="value-inner"><p>${globalDescription}</p><p>Type: ${globalType}</p></div></div>`
        itemEl.appendChild(valueEl)
      }
      
        }
        
       }

    
    break;
    
    
    case "light-mode":
    
// Nested Props Function

function nestedProps(obj){
if(obj.includes("{") || obj.includes("}")){
  obj = obj.replace("{","").replace("}","")  
  if(obj.includes("rgba")){
    obj = obj.replace("rgba","").replace("(","").replace(")","").replace("{","").replace("}","")  
  }
}
    objArray = obj.split(".")
    
    return objArray    

}

// Light Mode Main Iteration

    for( let item in y.light_mode ){
      let groupEl = document.createElement("div")
      groupEl.classList.add("items-group")
      groupEl.innerHTML = `<h4>${item}</h4>`
      div.appendChild(groupEl)
      for(let el in y.light_mode[`${item}`]){
        let subGroupEl = document.createElement("div")
        subGroupEl.classList.add("group-content") 
        subGroupEl.innerHTML = `<div class="group-header"><h2>${el}</h2></div>` 
      groupEl.appendChild(subGroupEl)
      let nestedEl = true
      let itemContent = y.light_mode[`${item}`][`${el}`]
      let lightVal = "";
      let lightType = "";
      let lightDescription = "";    
     
      for(let [itemKey, itemValue] of Object.entries(y.light_mode[`${item}`])){
        if(itemKey == "value" || itemKey == "type" || itemKey == "description"){
          nestedEl = false
          switch (itemKey) {
            case "value":
              lightVal = itemValue
              break;
          
              case "type":
                lightType = itemValue
                break;
                case "description":
                lightDescription = itemValue
                break;
            default:
              break;
          }
        }
      }  

      // Iterating Groups and Values
      for(let nestedVal in itemContent){
        let itemEl = document.createElement("div")
        itemEl.classList.add("item-content") 
        itemEl.innerHTML = `<div class="item-header"><h5>${nestedVal}</h5><span class="copy-main"><i class="fa-solid fa-copy"></i></span></div>` 
        let valueEl = document.createElement("div")
        subGroupEl.appendChild(itemEl)

        if(nestedEl){         
          for(let [key,value] of Object.entries(itemContent[nestedVal])){            
            
            if(key == "type" || key == "value" || key == "description"){
              
            switch (key) {
              case "value":
                // Main Conditional for Nested References
                
              if(typeof value == "string"){
 
              if(value.includes("{") || value.includes("}")){
                if(value.includes("rgba")){                                   //  Rgba Condition                  
                  let rgbaGroup = nestedProps(value)[0]
                  let rgbaItem = nestedProps(value)[1]
                  let rgbaStyle = nestedProps(value)[2]
                  let rgbaOpacity = nestedProps(value)[3]

                  rgbaStyle = rgbaStyle.split(",");
                  rgbaStyle[1] = rgbaStyle[1].replace(" ","")

                  let rgbVal = ""            
                  
                  let opacityVal = y.core[`${rgbaStyle[1]}`][`${rgbaOpacity}`].value   
                  
                  
                  if(rgbaItem == "primary"){
                    rgbVal = y.light_mode[`${rgbaGroup}`][`${rgbaItem}`][`${rgbaStyle[0]}`].value ;                                                                            
                    
                    newRgbGroup = nestedProps(rgbVal)[0]
                    newRgbItem = nestedProps(rgbVal)[1]
                    newRgbStyle = nestedProps(rgbVal)[2]

                     newRgbVal = y.core[`${newRgbGroup}`][`${newRgbItem}`][`${newRgbStyle}`].value
                    
                    lightVal = opacityFunc(y,"light_mode",opacityVal,newRgbVal,nestedProps)                                          
                      
                    
                  }else{         
                    rgbVal = y.core[`${rgbaGroup}`][`${rgbaItem}`][`${rgbaStyle[0]}`].value ;                                                                            
                                
                   lightVal = opacityFunc(y,"core",opacityVal,rgbVal,nestedProps)
                    
                  }

                }else if(value.includes("*")){                                            //  Multiplier Condition
                  value = value.replace("{","").replace("}","")

                  let multiGroup = nestedProps(value)[0]
                  let multiItem = nestedProps(value)[1]
                  let multiStyle = nestedProps(value)[2]
                  let multiOpacity = nestedProps(value)[3]

                  multiStyle = multiStyle.split("*")

                  let opacityVal = y.core[`${multiStyle[1]}`][`${multiOpacity}`].value

                  let rgbVal = y.core[`${multiGroup}`][`${multiItem}`][`${multiStyle[0]}`].value ;  

                  opacityFunc(y,"core",opacityVal,rgbVal,nestedProps)                                   

                }else{                                                                 //  Base Condition
                  value = value.replace("{","").replace("}","")
                    if(value.includes("border-width")){
                      let borderWidthGroup = nestedProps(value)[0]
                        let borderWidthItem = nestedProps(value)[1]

                      lightVal = y.global[`${borderWidthGroup}`][`${borderWidthItem}`].value

                    }else{
                      if(value.includes("primary")){
                        
                        let primaryGroup = nestedProps(value)[0]
                        let primaryItem = nestedProps(value)[1]
                        let primaryStyle = nestedProps(value)[2]
                        
                        let primaryVal = y.light_mode[`${primaryGroup}`][`${primaryItem}`][`${primaryStyle}`].value
                        
                        let primaryNestedGroup = nestedProps(primaryVal)[0]
                        let primaryNestedItem = nestedProps(primaryVal)[1]
                        let primaryNestedStyle = nestedProps(primaryVal)[2]
                        
                        lightVal = y.core[`${primaryNestedGroup}`][`${primaryNestedItem}`][`${primaryNestedStyle}`].value
                        
                      }else if(value.includes("border")){
                        
                        let borderGroup = nestedProps(value)[0]
                        let borderItem = nestedProps(value)[1]
                        let borderStyle = nestedProps(value)[2]
                        
                        let borderVal = y.light_mode[`${borderGroup}`][`${borderItem}`][`${borderStyle}`].value
                        
                        
                        let borderNestedGroup = nestedProps(borderVal)[0]
                        let borderNestedItem = nestedProps(borderVal)[1]
                        let borderNestedStyle = nestedProps(borderVal)[2]
                        
                        if(borderNestedItem == "primary"){
                          
                          let primaryBorderGroup = nestedProps(borderVal)[0]
                          let primaryBorderItem = nestedProps(borderVal)[1]
                          let primaryBorderStyle = nestedProps(borderVal)[2]
                          
                          primaryBorderVal = y.light_mode[`${primaryBorderGroup}`][`${primaryBorderItem}`][`${primaryBorderStyle}`].value                       

                          let primaryBorderNestedGroup = nestedProps(primaryBorderVal)[0]
                          let primaryBorderNestedItem = nestedProps(primaryBorderVal)[1]
                          let primaryBorderNestedStyle = nestedProps(primaryBorderVal)[2]
                          
                          lightVal = y.core[`${primaryBorderNestedGroup}`][`${primaryBorderNestedItem}`][`${primaryBorderNestedStyle}`].value

                        }else{
                          
                          lightVal = y.core[`${borderNestedGroup}`][`${borderNestedItem}`][`${borderNestedStyle}`].value
                          
                        }

                      }else{
                        let basicGroup = nestedProps(value)[0]
                        let basicItem = nestedProps(value)[1]
                        let basicStyle = nestedProps(value)[2]

                        if(basicItem == "neutral"){
                          neutralVal = y.light_mode[`${basicGroup}`][`${basicItem}`][`${basicStyle}`].value

                          let neutralGroup = nestedProps(neutralVal)[0]
                          let neutralItem = nestedProps(neutralVal)[1]
                          let neutralStyle = nestedProps(neutralVal)[2]
                          
                          lightVal = y.core[`${neutralGroup}`][`${neutralItem}`][`${neutralStyle}`].value
                         
                        }else{
                          lightVal = y.core[`${basicGroup}`][`${basicItem}`][`${basicStyle}`].value

                        }
                      }
                    }
                }
              }else{
                lightVal = value
              }

              }else{
                lightVal = value
              }
                
                break;
                case "type":

                  lightType = value
                  
                  break;
                  case "description":
                    
                    lightDescription = value
       
                    break;
                    
                    default:
                break;
            }
               if(typeof lightVal == "string" && lightVal.includes("#")){
                 if(!lightDescription){
                   valueEl.innerHTML = `<div class="value-info"><div class="color-block"><span class="color-inner" style="background-color:${lightVal}"></span></div><div class="value-outer"><h4>value: <span class="value-main">${lightVal}</span></h4><div><p>Type: ${lightType}</p></div></div></div>`            
                 }else{
                   valueEl.innerHTML = `<div class="value-info"><div class="color-block"><span class="color-inner" style="background-color:${lightVal}"></span></div><div class="value-outer value-extra"><h4>value: <span class="value-main">${lightVal}</span></h4><div class="value-inner"><p>${lightDescription}</p><p>Type: ${lightType}</p></div></div></div>`             
                 }

              }else{
                
                if(!lightDescription){
                  valueEl.innerHTML = `<div class="value-info"><h4>value: <span class="value-main">${lightVal}</span></h4><div><p>Type: ${lightType}</p></div></div>`            
                }else{
                  valueEl.innerHTML = `<div class="value-info value-extra"><h4>value: <span class="value-main">${lightVal}</span></h4><div class="value-inner"><p>${lightDescription}</p><p>Type: ${lightType}</p></div></div>`            
                }
               }
                        
            itemEl.appendChild(valueEl)          
          }
        }
      }else{      
        valueEl.innerHTML = `<div class="value-info"><h4>value: <span class="value-main">${lightVal}</span></h4><div class="value-inner"><p>${lightDescription}</p><p>Type: ${lightType}</p></div></div>`
        itemEl.appendChild(valueEl)
      }
       
        
}  
  
    }
    
   }
  
    
    break;
    
      default:
        break;
    }
  }

  copyMain();

  }


function opacityFunc(obj,src,opacityBase,rgbToHex,nestedFunc){
  if(opacityBase.includes("opacity-base") && opacityBase.includes("*")){
    let opacityGroup = nestedFunc(opacityBase)[0]
    let opacityItem = nestedFunc(opacityBase)[1]
    let opacityStyle = nestedFunc(opacityBase)[2]
    
    opacityItem = opacityItem.split("*")
    
    let newStyle = `${opacityItem[1]}.${opacityStyle}`
                                              
    let opacityMain = "";

    if(opacityStyle){
      opacityMain = obj[`core`][`${opacityGroup}`][`${opacityItem[0]}`].value
      opacityMain = Number(opacityMain.replace("%","")) * Number(newStyle)
                              
      if(opacityMain.toString().length < 2){
        
        lightVal = `${rgbToHex}0${opacityMain}`                      
      }else{
        
        lightVal = `${rgbToHex}${opacityMain}`                      
      }                    
    }else{
      opacityMain = obj[`core`][`${opacityGroup}`][`${opacityItem[0]}`].value
      opacityMain = Number(opacityMain.replace("%","")) * Number(opacityItem[1])
      
      if(opacityMain.toString().length < 2){
        
        lightVal = `${rgbToHex}0${opacityMain}`                      
      }else{
        
        lightVal = `${rgbToHex}${opacityMain}`                      
      }
    }


  }else{

    rgbToHex = obj[`${src}`][`${rgbaGroup}`][`${rgbaItem}`][`${rgbaStyle[0]}`].value 
    opacityBase = opacityBase.replace("%","")
    lightVal = `${rgbToHex}${opacityBase}`
   
  }    

  return lightVal
}

function copyMain(){

  let el = document.querySelectorAll(".item-content")

  // let alertDiv = document.createElement("div")
  // alertDiv.classList.add("alert-main")
  // document.body.insertBefore(alertDiv,document.body.firstChild);

// function alertBox(){


for(let j = 0; j < el.length; j++){
      let copyEl = el[j].querySelector(".copy-main")
      let valueMain = el[j].querySelector(".value-main")
      let headerEl = el[j].querySelector(".item-header")
    copyEl.addEventListener("click",(e)=>{
      navigator.clipboard.writeText(valueMain.innerHTML);
      let copySuccess = document.createElement("h5")
      copySuccess.classList.add("copy-success")
      copySuccess.innerHTML = "copied"
      headerEl.appendChild(copySuccess)   
      setTimeout(()=>{
        copySuccess.style.display = "none"
      },4000)    
    })
    }
}




// Output Cards

  async function outputCards(){
    let jsonData = {
      "tokens":{
        name:"tokens-updated",
        path:"./assets/json/tokens-updated.json",
        content: {         
          "global":{
          name: "global",
        },
        "light-mode":{
          name: "mode-variables",
        }       
      }
      }
    }
    let nav = document.getElementById("tokenNav");
    let navContent = "";
   
    for(let section in jsonData){
    
      getFile(jsonData[section].path,jsonData[section]);      

   for(let link in jsonData[section].content ){
    navContent += `<a href="#card-${link}">${jsonData[section].content[link].name}</a>`    
  }
   
    }
    
    nav.innerHTML = navContent
    
  }

  outputCards();
  

function searchMain(){

let globalGroup = document.querySelectorAll("#card-global .items-group")
let searchMain = document.querySelector("#search")

searchMain.addEventListener("keyup",(e)=>{
  globalGroup.forEach(group=>{
    let groupTitle = group.querySelector("h4").innerHTML
    
       console.log(groupTitle)

  })
})
}

searchMain()

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