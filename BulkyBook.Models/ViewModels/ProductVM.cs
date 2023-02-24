using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using BulkyBook.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BulkyBook.Models.ViewModels
{
    public class ProductVM
    {
        public Product Product { get; set; }
        public IEnumerable<SelectListItem> CategoryList {get; set;}
        public IEnumerable<SelectListItem> CoverTypeList {get; set;}
    }
}