using System.Security.Claims;
using BulkyBook.DataAccess.Repository.IRepository;
using BulkyBook.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BulkyBookWeb.Areas.Customer.Controllers
{
    [Area("Customer")]
    [Authorize]
    public class CartController : Controller
    {   
        // [AllowAnonymous]
        private readonly IUnitOfWork _unitOfWork;
        public ShoppingCartVM ShoppingCartVM {get; set;}
        public double OrderTotal{get;set;}
        
        public CartController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IActionResult Index()
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);

            ShoppingCartVM = new ShoppingCartVM()
            {
                ListCart = _unitOfWork.ShoppingCart.GetAll(u => u.ApplicationUserId == claim.Value, 
                    includeProperties: "Product")
            };
            foreach(var cart in ShoppingCartVM.ListCart)
            {
                cart.Price = GetPriceBaseOnQuantity(cart.Count, cart.Product.Price, 
                            cart.Product.Price50, cart.Product.Price100);
            }

            return View(ShoppingCartVM);
        }
        private double GetPriceBaseOnQuantity(double quantity, double price, double price50, double price100 )
        {
            if(quantity <= 50)
            {
                return price;
            }
            else 
            {
                if (quantity > 50 && quantity < 100)
                    {
                    return  price50;
                    }
                return price100;
            }
        }
    }
}
