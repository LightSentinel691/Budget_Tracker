










// This section will add the div showing user transactions

// Create the main div
const mainDiv = document.createElement("div");
mainDiv.style.border = "2px solid black";
mainDiv.style.padding = "10px";
mainDiv.style.display = "flex";
mainDiv.style.gap = "10px";

// Create and append four inner divs
for (let i = 0; i < 4; i++) {
    const innerDiv = document.createElement("div");
    innerDiv.style.width = "100px";
    innerDiv.style.height = "100px";
    innerDiv.style.backgroundColor = "lightblue";
    innerDiv.style.display = "flex";
    innerDiv.style.justifyContent = "center";
    innerDiv.style.alignItems = "center";
    innerDiv.textContent = `Div ${i + 1}`;
    
    mainDiv.appendChild(innerDiv);
}

// Append the main div to the body
document.body.appendChild(mainDiv);