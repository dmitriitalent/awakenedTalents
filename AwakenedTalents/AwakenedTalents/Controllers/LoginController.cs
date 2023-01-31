using AwakenedTalents.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using Newtonsoft;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authentication.Cookies;
using System;
using System.Text.Unicode;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using AwakenedTalents.Services;
using Microsoft.EntityFrameworkCore;

namespace AwakenedTalents.Controllers
{
	public class LoginController : Controller
	{
		ATContext db;
		public LoginController(ATContext _db)
		{
			this.db = _db;
		}


		public string Registration(string login, string email, string password)
		{
			if (db.Users.Where(elem => elem.Login==login).ToList().Count == 0)
			{
				User user = new User();
				user.Id = Guid.NewGuid().ToString();
				Console.Write(user.Id);
				user.Login = login;
				user.Email = email;
				user.Password = Crypt.Hash(password);
				user.RegistrationDate = DateTime.Now;
				user.TeacherProfile = new TeacherProfile();
				db.Users.Add(user);
				db.SaveChanges();
				Response.StatusCode = 200;
				return Crypt.Encrypt(user.Id);
			}
			else
			{
				return "Login taken";
			}
		}
		/*
		Логика авторизации:
		При логине на frontend возвращается at (authtoken) - шифрованный id (guid).
		Он сохраняется в frontend-куках. Когда на frontend`е мы хотим получить данные пользователя по токену
		мы рашифровываем at и ищем строку с данными в таблице Users по полю id: "decipher(at, key) == id"
		находим только одну строку и берем эти данные.
		*/
		public string Login(string login, string password)
		{

			if (login == "" || password == "")
			{
				return "Empty login or password fields";
			}
			string hashPasword = Crypt.Hash(password);
			var user = db.Users.FirstOrDefault(elem => elem.Login == login && elem.Password == hashPasword);

			if (user != null)
			{
				string authtoken = Crypt.Encrypt(user.Id);
				Response.StatusCode = 200;
				/*Console.WriteLine(authtoken);*/
				return authtoken;
			}
			else
			{
				return "Wrong login or password";
			}
		}

		public string GetUserData(string authtoken)
		{
			/*Console.WriteLine(authtoken);*/
			if (string.IsNullOrEmpty(authtoken))
			{
				return "authtoken is empty";
			}
			User user = db.Users.Include(user=>user.TeacherProfile).ThenInclude(t => t.Subjects).FirstOrDefault(elem => elem.Id == Crypt.Decrypt(authtoken, Crypt.cryptKey))!;
			/*Console.WriteLine(Crypt.Decrypt(authtoken, Crypt.cryptKey));*/
			if (user != null)
			{
				var json = JsonConvert.SerializeObject(user, 
					Formatting.Indented, 
					new JsonSerializerSettings() { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
				Response.StatusCode = 200;
				return json;
			}
			else
			{
				Response.StatusCode = 200;
				return "Not authenticate";
			}
		}
		
	}
}
