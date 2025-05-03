namespace Lab.Models
{
    public class Company
    {
        public int Id { get; set; } // Optional primary key for EF Core

        public string Name { get; set; }

        public string Sector { get; set; }

        public string Logo { get; set; } // URL or image path

        public string Headquarter { get; set; }

        public int Founded { get; set; } // Year of founding
    }
}
