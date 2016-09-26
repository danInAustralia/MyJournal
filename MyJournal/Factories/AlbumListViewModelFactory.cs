using MyJournal.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyJournal.Factories
{
    public class AlbumListViewModelFactory
    {

        public AlbumListViewModel GetAlbumListViewModel()
        {
            AlbumListViewModel vm = new AlbumListViewModel
            {
                Albums = new List<ResourceModel.Album>(),
                NewAlbum = new ResourceModel.Album
                {
                    Name = "New Album",
                    Resources = new List<ResourceModel.Resource>()
                }
            };
            return vm;
        }
    }
}