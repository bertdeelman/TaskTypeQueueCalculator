function calculate() {
    const totalBins = parseFloat(document.getElementById('totalBins').value) || 0;
    const binsLevel = parseFloat(document.getElementById('binsLevel').value) || 1; // Avoid division by zero
    const percentage = parseFloat(document.getElementById('percentage').value) || 0;

    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';

    // Validation
    if (totalBins <= 0 || binsLevel <= 0 || percentage <= 0 || percentage > 100) {
        errorMessage.textContent = 'Please enter valid values for Total Bins, Bins Level, and Percentage (1-100).';
        return;
    }

    // Total Top Cells and Bins Preparations
    const totalTopCells = Math.round(totalBins / binsLevel);
    const binsPreparations = Math.round(totalTopCells * (percentage / 100));

    document.getElementById('topCells').value = totalTopCells;
    document.getElementById('binsPreparations').value = binsPreparations;

    updateTaskTypeCalculations(binsPreparations);
}

function updateTaskTypeCalculations(binsPreparations) {
    const rows = document.querySelectorAll('#taskTableBody tr');

    let totalBinsPreparations = 0;
    let totalTaskGroups = 0;
    let totalMaxTaskGroup = 0;

    rows.forEach(row => {
        const distribution = parseFloat(row.querySelector('.distribution').value) || 0;
        const avgTasks = parseFloat(row.querySelector('.avgTasks').value) || 1; // Avoid division by zero
        const frequency = parseFloat(row.querySelector('.frequency').value) / 100 || 0; // Convert percentage to decimal

        if (distribution <= 0 || avgTasks <= 0 || frequency < 0) {
            row.style.backgroundColor = "#ffcccc"; // Highlight the row if values are incorrect
        } else {
            row.style.backgroundColor = ""; // Reset background color
        }

        const binsAvailable = Math.round(binsPreparations * (distribution / 100));
        const taskGroups = Math.round(binsAvailable / avgTasks);
        const maxTaskGroup = Math.round((taskGroups * frequency) + taskGroups);

        row.querySelector('.binsPreparations').value = binsAvailable;
        row.querySelector('.taskGroups').value = taskGroups;
        row.querySelector('.maxTaskGroup').value = maxTaskGroup;

        totalBinsPreparations += binsAvailable;
        totalTaskGroups += taskGroups;
        totalMaxTaskGroup += maxTaskGroup;
    });

    document.getElementById('totalBinsPreparations').textContent = totalBinsPreparations.toLocaleString();
    document.getElementById('totalTaskGroups').textContent = totalTaskGroups.toLocaleString();
    document.getElementById('totalMaxTaskGroup').textContent = totalMaxTaskGroup.toLocaleString();
}

function addTaskType() {
    const tableBody = document.getElementById('taskTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Task Type"></td>
        <td><input type="number" class="distribution" placeholder="0" onchange="calculate()"></td>
        <td><input type="number" class="avgTasks" placeholder="Avg Tasks" onchange="calculate()"></td>
        <td><input type="number" class="frequency" placeholder="Frequency (%)" onchange="calculate()"></td>
        <td><input type="number" class="binsPreparations" readonly></td>
        <td><input type="number" class="taskGroups" readonly></td>
        <td><input type="number" class="maxTaskGroup" readonly></td>
        <td><button type="button" onclick="removeTaskType(this)">Remove</button></td>
    `;
    tableBody.appendChild(row);
}

function removeTaskType(button) {
    button.parentElement.parentElement.remove();
    calculate();
}
