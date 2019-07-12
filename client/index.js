/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */


// Populate the Results section
function updateResults() {
  fetch('/users')
    .then(response => response.json())
    .then((data) => {
      // Construct inner HTML for Results section
      let resultsHTML = '';
      data.forEach((item) => {
        resultsHTML += `<div id="entry${item.id}">
      <label>${item.name}</label>
      <button class="updateButton" name="update${item.id}">Update</button>
      <button class="deleteButton" name="delete${item.id}">Delete</button>
      </div>
      `;
      });
      // Render inner HTML to the page
      document.getElementById('results').innerHTML = resultsHTML;
      // Add event listeners for each update button
      const updateButtons = document.querySelectorAll('.updateButton');
      addListenersToButtons(updateButtons, 'update');
      // Add event listeners for each delete button
      const deleteButtons = document.querySelectorAll('.deleteButton');
      addListenersToButtons(deleteButtons, 'delete');
    })
    .catch(err => console.error(err));
}

function deleteUserById(id) {
  // Send a delete request to server and then...
  fetch('/users', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    // ...give an alert, and then remove from DOM
    .then(response => response.json())
    .then((data) => {
      alert(`Deleted ${data.rows[0].name}`);
      document.querySelector('#results').removeChild(document.querySelector(`#entry${id}`));
    })
    .catch(err => console.log(err));
}

function updateUserById(id, currentName) {
  // Send prompt to get change name
  const name = prompt('What is the new name?', currentName);
  if (name) {
    fetch('/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name }),
    })
      .then(updateResults)
      .catch(err => console.error(err));
  }
}

function addListenersToButtons(buttons, type) {
  buttons.forEach((button) => {
    button.onclick = (e) => {
      const id = e.target.name.substring(type.length);
      if (type === 'delete') deleteUserById(id);
      else if (type === 'update') {
        // TODO: Make "firstElementChild" less fragile
        const currentName = e.target.parentElement.firstElementChild.innerText;
        updateUserById(id, currentName);
      }
    };
  });
}

// Add listener for Create button
document.getElementById('submitCreate').onclick = () => {
  const name = prompt('Please enter your name', '');
  if (name) {
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
      .then(updateResults)
      .catch(err => console.error(err));
  }
};

// Initial render of the results
updateResults();
