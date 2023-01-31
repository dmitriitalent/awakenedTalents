using AwakenedTalents.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AwakenedTalents.Controllers
{
    public class HomeController : Controller
    {
        ATContext db;
        public HomeController(ATContext _db)
        {
            db = _db;
        }

        public string Index()
        {
            return "Ez!";
        }


    }
}