 //code for long click
 let pressTimer;
 let selectedNode = null;

 function startTimer(node) {
   pressTimer = setTimeout(() => {
     renameNode(node);
   }, 800);
 }

 function endTimer() {
   clearTimeout(pressTimer);
 }

 function toggleNode(node) {
   node.classList.toggle('open');
 }
 
 
 //function type prompt (parent or child)
 function promptNodeType(button) {
   selectedNode = button.parentElement;

   let nodeType = prompt("Enter 'parent' or 'child' node:");

   if (nodeType) {
     if (nodeType.toLowerCase() === 'child') {
       addChildNode(selectedNode);
     } else if (nodeType.toLowerCase() === 'parent') {
       addParentNode(selectedNode);
     } else {
       alert("Invalid node type! Enter 'parent' or 'child'.");
     }
   }
 }

 function addParentNode(node) {
 let nodeName = prompt("Enter the name for the new parent node:");
 if (nodeName && nodeName.trim() !== '') {
   let newNode = document.createElement('div');
   newNode.className = 'node';
   newNode.innerHTML = `
     <div class="node" onclick="toggleNode(this)">
       <div class="node-text" onmousedown="startTimer(this)" onmouseup="endTimer()">${nodeName}</div>
       <div class="add-button" onclick="promptNodeType(this)">+</div>
       <div class="subnodes"></div>
     </div>
   `;
   node.parentElement.appendChild(newNode);

   const allNodes = document.querySelectorAll('.node-text');
   allNodes.forEach(n => {
     n.onmousedown = () => startTimer(n);
     n.onmouseup = () => endTimer();
   });
 }
}

function addChildNode(subnodes) {
 let nodeName = prompt("Enter the name for the new child node:");
 if (nodeName && nodeName.trim() !== '') {
   let newNode = document.createElement('div');
   newNode.className = 'node';
   newNode.innerHTML = `
     <div class="node" onclick="toggleNode(this)">
       <div class="node-text" onmousedown="startTimer(this)" onmouseup="endTimer()">${nodeName}</div>
       <div class="add-button" onclick="promptNodeType(this)">+</div>
       <div class="subnodes"></div>
     </div>
   `;

   if (subnodes) {
     subnodes.appendChild(newNode);
   }

   const allNodes = document.querySelectorAll('.node-text');
   allNodes.forEach(n => {
     n.onmousedown = () => startTimer(n);
     n.onmouseup = () => endTimer();
   });
 }
}

//Rename Function 
 function renameNode(node) {
let newName = prompt("Enter new node name:");
if (newName && newName.trim() !== '') {
 node.textContent = newName;
 const allNodes = document.querySelectorAll('.node-text');

 allNodes.forEach(n => {
   n.onmousedown = () => startTimer(n);
   n.onmouseup = () => endTimer();
 });
}
}

//<div class="node-text" onmousedown="startTimer(this)" onmouseup="endTimer()"><li><a href="#" onclick="openPage('New Main Node')">New Child Node</a></li></div>
//<li><a href="#" onclick="openPage('New Main Node')">New Child Node</a></li>
//#############################################################################################################
//movable text box 
function addElement() {
   isAddingElement = true;
 }
 function navigateToPage(nodeName) {
   window.location.href = `/${nodeName.toLowerCase().replace(' ', '-')}.html`;
 }

 document.addEventListener('mousemove', function (e) {
   if (isAddingElement) {
     let element = document.createElement('div');
     element.className = 'draggable';
     element.style.left = e.pageX + 'px';
     element.style.top = e.pageY + 'px';

     let textarea = document.createElement('textarea');
     textarea.value = 'Editable Text';
     element.appendChild(textarea);

     document.body.appendChild(element);
     isAddingElement = false;

     textarea.addEventListener('mousedown', function (e) {
       e.stopPropagation();
     });

     element.addEventListener('mousedown', function (e) {
       let offsetX = e.clientX - element.getBoundingClientRect().left;
       let offsetY = e.clientY - element.getBoundingClientRect().top;

       document.addEventListener('mousemove', dragElement);
       document.addEventListener('mouseup', function () {
         document.removeEventListener('mousemove', dragElement);
       });

       function dragElement(e) {
         element.style.left = e.pageX - offsetX + 'px';
         element.style.top = e.pageY - offsetY + 'px';
       }
     });
   }
 });



 //***************************************************************************************
