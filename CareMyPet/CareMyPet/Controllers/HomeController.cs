using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CareMyPet.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("AllowSpecificOrigin")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        [ActionName("Stores")]
        public List<Store> GetStores()
        {
            Store store = new Store();
            return store.GetStores();
        }

        [HttpGet]
        [ActionName("AddStore")]
        public bool AddNewStores(string storeName, string description, string activityTime, string city, string address, string phone)
        {
            Store store = new Store();
            return store.AddNewStore(storeName, description, activityTime, city, address, phone);
        }

        [HttpGet]
        [ActionName("Adoption")]
        public List<Adoption> GetAdoptions()
        {
            Adoption adoption = new Adoption();
            return adoption.GetAdoptions();
        }

        [HttpGet]
        [ActionName("LastAdoption")]
        public Adoption GetLastAdoption()
        {
            Adoption adoption = new Adoption();
            return adoption.GetLastAdoption();
        }

        [HttpGet]
        [ActionName("VS")]
        public List<VeterinaryServices> GetVS()
        {
            VeterinaryServices vs = new VeterinaryServices();
            return vs.GetVS();
        }

        [HttpGet]
        [ActionName("HomeContents")]
        public List<HomeContent> GetContents()
        {
            HomeContent homeContent = new HomeContent();
            return homeContent.GetContentCards();
        }

        [HttpGet]
        [ActionName("Hostels")]
        public List<Hostel> GetHostels()
        {
            Hostel hostels = new Hostel();
            return hostels.GetHostelsList();
        }

        [HttpGet]
        [ActionName("Login")]
        public string Login(string userName, string password)
        {
            Thread.Sleep(2000);
            Login login = new Login();
            return login.LoginCheck(userName, password);

        }

        [HttpGet]
        [ActionName("LocalStorageLogin")]
        public string LsLogin(string hash)
        {
            Login login = new Login();
            return login.GetUsernameFromHash(hash);
        }

        [HttpGet]
        [ActionName("Register")]
        public bool Register(string firstName, string lastName, string userName, string password)
        {
            Register register = new Register();
            return register.RegisterRequest(firstName, lastName, userName, password);
        }

    }
}