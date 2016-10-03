using MyJournal.Factories;
using MyJournal.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace MyJournal.ApiControllers
{
    public class AlbumsController : ApiController
    {
        public AlbumListViewModel GetAllAlbums()
        {
            AlbumListViewModelFactory albumListFactory = new AlbumListViewModelFactory();
            AlbumListViewModel vm = albumListFactory.GetAlbumListViewModel();

            return vm;
        }
    }
}
