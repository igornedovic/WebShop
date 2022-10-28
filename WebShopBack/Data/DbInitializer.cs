using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Data.Models;

namespace Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            if (!context.Users.Any())
            {
                using var hmac = new HMACSHA512();

                var admin = new User
                {
                    Username = "admin",
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("admin")),
                    PasswordSalt = hmac.Key,
                    IsAdmin = true,
                    Role = "Admin"
                };

                context.Users.Add(admin);
                context.SaveChanges();
            }

            if (context.Manufacturers.Any()) return;

            var manufacturers = new List<Manufacturer>
            {
                new Manufacturer
                {
                    Name = "Proizvodjac 1",
                    Phone = "011/56-235-95",
                    Email = "proizvodjac1@gmail.com",
                    Address = "Lomina 16"
                },
                new Manufacturer
                {
                    Name = "Proizvodjac 2",
                    Phone = "011/34-123-33",
                    Email = "proizvodjac2@gmail.com",
                    Address = "Ljermontova 13a"
                },
                new Manufacturer
                {
                    Name = "Proizvodjac 3",
                    Phone = "011/78-852-44",
                    Email = "proizvodjac3@gmail.com",
                    Address = "Ljubinke Bobic 15"
                },
                new Manufacturer
                {
                    Name = "Proizvodjac 4",
                    Phone = "011/23-554-22",
                    Email = "proizvodjac4@gmail.com",
                    Address = "Nehruova 77"
                },
                new Manufacturer
                {
                    Name = "Proizvodjac 5",
                    Phone = "011/45-568-78",
                    Email = "proizvodjac5@gmail.com",
                    Address = "Vojislava Ilica 14"
                },
            };

            foreach (var manufacturer in manufacturers)
            {
                context.Manufacturers.Add(manufacturer);
            }

            context.SaveChanges();

            if (context.ProductTypes.Any()) return;

            var productTypes = new List<ProductType>
            {
                new ProductType
                {
                    Name = "Majice"
                },
                new ProductType
                {
                    Name = "Patike"
                },
                new ProductType
                {
                    Name = "Sorcevi"
                },
                new ProductType
                {
                    Name = "Kompleti"
                },
                new ProductType
                {
                    Name = "Duksevi"
                },
            };

            foreach (var productType in productTypes)
            {
                context.ProductTypes.Add(productType);
            }

            context.SaveChanges();
        }
    }
}