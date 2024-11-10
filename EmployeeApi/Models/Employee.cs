// File: Employee.cs
namespace EmployeeApi.Models   // Ensure this matches the namespace you're using
{
    public class Employee
    {
        public string EmployeeId { get; set; }
        public string EmployeeFirstName { get; set; }
        public string EmployeeLastName { get; set; }
        public DateTime? EmployeeDateOfBirth { get; set; }
    }
}
