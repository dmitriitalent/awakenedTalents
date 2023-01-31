using AwakenedTalents.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Query;
using System.Reflection.Metadata.Ecma335;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AwakenedTalents.Controllers
{
	public class FilesController : Controller
	{
		
		IWebHostEnvironment env;
		ATContext db;
		public FilesController(IWebHostEnvironment _env, ATContext _db) {
			env = _env;
			db = _db;
		}
        public string AddImage(int ImageId, IFormFile file)
		{
			if (file == null) 
				return "Файл не доставлен";
					
			
			string fileName = file.FileName; 
			if (db.Images.Where(img => img.Name == file.FileName) != null) /*Add guid if filename is taken*/
			{
				fileName = Guid.NewGuid().ToString() + file.FileName;
            }
			using (FileStream stream = new FileStream(env.WebRootPath+"/assets/"+fileName, FileMode.Create, FileAccess.Write))
			{
				file.CopyTo(stream); /*add image to assets*/
			}
        
            /*add image to database*/
            Image img = new Image();
			img.Id = ImageId;
			img.Name = fileName;
			db.Images.Add(img);
			db.SaveChanges();

			Response.StatusCode= 200;
			return "OK";
		}
	}
}
