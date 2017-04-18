using MyJournal.ViewModels;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyJournal.Factories
{
    public class AlbumListViewModelFactory
    {

        public AlbumListViewModel GetAlbumListViewModel(IResourceRepository repository)
        {
            AlbumListViewModel vm = new AlbumListViewModel
            {
                Albums = repository.GetAlbums(null),
                NewAlbum = new ResourceModel.Album
                {
                    Name = "New Album",
                    Description = "New Album description...",
                    AlbumDate = DateTime.Today,
                    Resources = new List<ResourceModel.DigitalResource>()
                }
            };
            return vm;
        }
    }
}