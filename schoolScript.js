// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    resetModalFields();
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Reset modal input fields
function resetModalFields() {
    document.getElementById('modalTitle').textContent = 'Add New Student';
    document.getElementById('productId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('guardian-name').value = '';
    document.getElementById('cell-number').value = '';
    document.getElementById('address').value = '';
    document.getElementById('className').value = '';
    document.getElementById('image').value = '';
  }

// submit info student
  document.getElementById('btn-submit').addEventListener('click', function() {
    var id = document.getElementById('productId').value;
    var name = document.getElementById('name').value;
    var dob = document.getElementById('date').value;
    var guardianName = document.getElementById('guardian-name').value;
    var cellNumber = document.getElementById('cell-number').value;
    var address = document.getElementById('address').value;
    var className = document.getElementById('className').value;
    var image = document.getElementById('image').files[0];
  
    if (id) {
      editProduct(id, name, dob, guardianName, cellNumber, address, className, image);
    } else {
      addProduct(name, dob, guardianName, cellNumber, address, className, image);
    }
  
    modal.style.display = "none";
  });


function addProduct(name, dob, guardianName, cellNumber, address, className, image){
    var table = document.getElementById('infoStudent');
    var newRow = table.insertRow(-1);
    newRow.id = 'row-' + (table.rows.length - 1);
    var cellId = newRow.insertCell(0);
    var cellImage = newRow.insertCell(1);
    var cellStudent = newRow.insertCell(2);
    var cellDob = newRow.insertCell(3);
    var cellGuardianName = newRow.insertCell(4);
    var cellCellNumber = newRow.insertCell(5);
    var cellAddress = newRow.insertCell(6);
    var cellClassName= newRow.insertCell(7);
    var cellAction= newRow.insertCell(8);

    cellId.innerHTML = table.rows.length - 1;
    if (image) {
        var imgElement = document.createElement('img');
        imgElement.src = URL.createObjectURL(image);
        imgElement.className = 'student-image';
        cellImage.appendChild(imgElement);
    } else {
        cellImage.textContent = 'No Image';
    }

    cellStudent.innerHTML = name;
    cellDob.innerHTML = dob;
    cellGuardianName.innerHTML = guardianName;
    cellCellNumber.innerHTML = cellNumber;
    cellAddress.innerHTML = address;
    cellClassName.innerHTML = className;
    cellAction.innerHTML = `<button class="edit-btn" onclick="showEditModal(${table.rows.length - 1})">✎</button>
                            <button class="delete-btn" onclick="deleteProduct(${table.rows.length - 1})">🗑</button>`;


                            saveTableData();
}

function editProduct(id, name, dob, guardianName, cellNumber, address, className, image) {
    var table = document.getElementById('infoStudent');
    var row = table.rows.namedItem('row-' + id);
    row.cells[2].textContent = name;
    row.cells[3].textContent = dob;
    row.cells[4].textContent = guardianName;
    row.cells[5].textContent = cellNumber;
    row.cells[6].textContent = address;
    row.cells[7].textContent = className;
    
    // Update image if provided
    if (image) {
      var imgElement = row.cells[1].getElementsByTagName('img')[0];
      imgElement.src = URL.createObjectURL(image);
    }
  
    saveTableData();
  }

function deleteProduct(id){
    var table = document.getElementById('infoStudent');
    var row = table.rows.namedItem('row-' + id);
    table.deleteRow(row.rowIndex);
    saveTableData();
}

function showEditModal(id) {
    var table = document.getElementById('infoStudent');
    var row = table.rows.namedItem('row-' + id);
    document.getElementById('modalTitle').textContent = 'Edit Student Information';
    document.getElementById('productId').value = id;
    document.getElementById('name').value = row.cells[2].textContent;
    document.getElementById('date').value = row.cells[3].textContent;
    document.getElementById('guardian-name').value = row.cells[4].textContent;
    document.getElementById('cell-number').value = row.cells[5].textContent;
    document.getElementById('address').value = row.cells[6].textContent;
    document.getElementById('className').value = row.cells[7].textContent;
    
    // Reset the file input for image
    document.getElementById('image').value = '';
    
    modal.style.display = "block";
  }

  //searchbar function
document.getElementById('searchInput').addEventListener('keyup', function() {
    var searchValue = this.value.toLowerCase();
    var table = document.getElementById('infoStudent');
    var rows = table.getElementsByTagName('tr');
  
    for (var i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
      var studentName = rows[i].cells[2].textContent.toLowerCase(); // Assuming product name is in the 3rd column
      if (studentName.includes(searchValue)) {
        rows[i].style.display = ""; // Show row
      } else {
        rows[i].style.display = "none"; // Hide row
      }
    }
  });


  //export button

document.getElementById('exportButton').addEventListener('click', function () {
    var table = document.getElementById('infoStudent');
    var rows = table.getElementsByTagName('tr');
    var csv = [];
  
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
  
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
  
        csv.push(row.join(',')); 
    }
  
    downloadCSV(csv.join('\n'), 'product_data.csv');
  });
  
  function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
  
    csvFile = new Blob([csv], {type: "text/csv"});
  
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
  
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  
  //import button
  document.getElementById('importButton').addEventListener('click', function () {
    document.getElementById('importInput').click();
  });
  
  document.getElementById('importInput').addEventListener('change', function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
  
    reader.onload = function (e) {
        var rows = e.target.result.split('\n');
        rows.forEach(function (row, index) {
            if (index === 0) return; // Skip header row
            var columns = row.split(',');
            // Assuming columns are in the correct order and format
            addProduct(columns[2], columns[3], columns[4], columns[5], columns[6], columns[7], null); // null for image as it can't be imported via CSV

        });
    };
  
    reader.readAsText(file);
  });


  //save local data to storage
function saveTableData() {
  var table = document.getElementById('infoStudent');
  var rows = table.getElementsByTagName('tr');
  var tableData = [];

  for (var i = 1; i < rows.length; i++) { // Skip header row
      var cells = rows[i].getElementsByTagName('td');
      var rowData = {
          id: cells[0].textContent,
          name: cells[2].textContent,
          dob: cells[3].textContent,
          guardianName: cells[4].textContent,
          cellNumber: cells[5].textContent,
          address: cells[6].textContent,
          className: cells[7].textContent,
          // Note: Images are not saved as part of this example
      };
      tableData.push(rowData);
  }

  localStorage.setItem('studentTableData', JSON.stringify(tableData));
}

//load data
function loadTableData() {
  var savedData = localStorage.getItem('studentTableData');
  if (savedData) {
      var tableData = JSON.parse(savedData);
      tableData.forEach(function (rowData) {
          addProduct(rowData.name, rowData.dob, rowData.guardianName, rowData.cellNumber, rowData.address, rowData.className, null); // null for the image
      });
  }
}

// Call this function when the page loads
loadTableData();