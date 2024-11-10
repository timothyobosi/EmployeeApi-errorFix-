$(document).ready(function () {
    // Fetch employees and populate the table
    function loadEmployees() {
        $.get("http://localhost:5048/api/employees", function (data) {
            $('#employeeTableBody').empty(); // Clear existing table rows
            data.forEach(function (employee) {
                var row = `<tr>
                            <td>${employee.employeeId}</td>
                            <td>${employee.employeeFirstName}</td>
                            <td>${employee.employeeLastName}</td>
                            <td>${employee.employeeDateOfBirth}</td>
                            <td>
                                <button class="btn btn-warning btn-sm" onclick="editEmployee('${employee.employeeId}')">Update</button>
                                <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${employee.employeeId}')">Delete</button>
                            </td>
                        </tr>`;
                $('#employeeTableBody').append(row);
            });
        });
    }

    // Add new employee
    $('#employeeForm').on('submit', function (e) {
        e.preventDefault(); // Prevent form submission
        var newEmployee = {
            employeeFirstName: $('#firstName').val(),
            employeeLastName: $('#lastName').val(),
            employeeDateOfBirth: $('#dob').val()
        };

        $.ajax({
            url: "http://localhost:5048/api/employees",
            type: "POST",
            data: JSON.stringify(newEmployee),
            contentType: "application/json",
            success: function (response) {
                loadEmployees(); // Reload employee list after successful addition
                $('#employeeForm')[0].reset(); // Reset form
            },
            error: function () {
                alert("Failed to add employee.");
            }
        });
    });

    // Edit employee (for now, it will just log the employee ID)
    window.editEmployee = function (employeeId) {
        alert("Edit employee with ID: " + employeeId);
        // You can implement your edit form here to allow modification of the employee details.
    };

    // Delete employee
    window.deleteEmployee = function (employeeId) {
        $.ajax({
            url: `http://localhost:5048/api/employees/${employeeId}`,
            type: "DELETE",
            success: function () {
                loadEmployees(); // Reload employee list after deletion
            },
            error: function () {
                alert("Failed to delete employee.");
            }
        });
    };

    // Initially load employees
    loadEmployees();
});
