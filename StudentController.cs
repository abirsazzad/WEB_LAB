using Microsoft.AspNetCore.Mvc;
using Lab.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Lab.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly StudentDbContext _context;

        public StudentController(StudentDbContext context)
        {
            _context = context;
        }

        // GET: api/Student
        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _context.Students.ToListAsync();
            return Ok(students);
        }

        // POST: api/Student (Signup)
        [HttpPost]
        public async Task<IActionResult> AddStudent([FromBody] Student student)
        {
            if (string.IsNullOrEmpty(student.Email) || string.IsNullOrEmpty(student.Password))
                return BadRequest("Email and Password are required.");

            // Optional: Check if email already exists
            var exists = await _context.Students.AnyAsync(s => s.Email == student.Email);
            if (exists)
                return Conflict("Email already registered.");

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStudents), new { id = student.Id }, student);
        }

        // POST: api/Student/Login (Login)
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] Student loginCredentials)
        {
            if (string.IsNullOrEmpty(loginCredentials.Email) || string.IsNullOrEmpty(loginCredentials.Password))
                return BadRequest("Email and Password are required.");

            // Check if student with the provided email exists
            var student = await _context.Students
                .FirstOrDefaultAsync(s => s.Email == loginCredentials.Email);

            if (student == null)
                return Unauthorized("Email not found.");

            // Verify password (In a real-world app, hash passwords and compare)
            if (student.Password != loginCredentials.Password)
                return Unauthorized("Invalid password.");

            // You can generate a token or return a success message
            // In this case, we'll just return a simple success message for now
            return Ok(new { message = "Login successful!" });
        }
    }
}
