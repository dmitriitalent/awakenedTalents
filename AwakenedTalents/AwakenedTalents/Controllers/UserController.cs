using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using AwakenedTalents.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.IO;
using Microsoft.AspNetCore.SignalR;

namespace AwakenedTalents.Controllers
{
	public class UserController : Controller
	{
		ATContext db;
		IWebHostEnvironment env;
		public UserController(ATContext _db, IWebHostEnvironment _env)
		{
			db = _db;
			env = _env;
		}

		public string GetUsers()
		{
			IList<User> users = db.Users.Include(user=>user.TeacherProfile).ThenInclude(tp=>tp.Subjects).ToList();
			string usersJson = Newtonsoft.Json.JsonConvert.SerializeObject(
				users, 
				Newtonsoft.Json.Formatting.Indented, 
				new JsonSerializerSettings() { ReferenceLoopHandling = ReferenceLoopHandling.Ignore
			});
			return usersJson;
		}

		public string UpdateUser(User userParam)
		{
			User user = db.Users.Include(u => u.TeacherProfile).FirstOrDefault(u => u.Id == userParam.Id);
			user.TeacherProfile = userParam.TeacherProfile;
			user.FullName = userParam.FullName;
			db.SaveChanges();
			return "OK";
		}

		public string UpdateAvatar(IFormFile file, string UserId )
		{

            if (file == null)
                return "Файл не доставлен";

            string fileName = file.FileName;
            if (db.Users.Where(user => user.ImagePath == file.FileName) != null) /*Add guid if filename is taken*/
            {
                fileName = Guid.NewGuid().ToString() + file.FileName;
            }
            using (FileStream stream = new FileStream(env.WebRootPath + "/assets/" + fileName, FileMode.Create, FileAccess.Write))
            {
                file.CopyTo(stream); /*add image to assets*/
            }
			User user = db.Users.FirstOrDefault(user => user.Id == UserId);

            string oldAvatarName = user.ImagePath;
			if (oldAvatarName != null)
			{
                try
                {
                    System.IO.File.Delete(env.WebRootPath + "/assets/" + oldAvatarName);
                } catch {}
			}
			user.ImagePath = fileName;
			db.SaveChanges();
			

            return "OK";
		}
	}
}
