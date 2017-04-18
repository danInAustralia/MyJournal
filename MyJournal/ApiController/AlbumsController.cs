using System.Collections.Generic;
using System.Linq;
using MyJournal.Factories;
using MyJournal.ViewModels;
using ResourceModel;
using Repository;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web;
using System.IO;
using System;

namespace MyJournal.ApiControllers
{
    public class AlbumsController : System.Web.Http.ApiController
    {
        /// <summary>
        /// returns a JSON representation of the albums returned from repository.
        /// 
        /// URL translates to http://localhost:[port]/api/albums [52885]
        /// </summary>
        /// <returns>JSON of ViewModel of the list of albums retrieved from a repository</returns>
        public AlbumListViewModel GetAllAlbums()
        {
            AlbumListViewModelFactory albumListFactory = new AlbumListViewModelFactory();
            IResourceRepository repository = new Repository.ResourceRepository();
            AlbumListViewModel vm = albumListFactory.GetAlbumListViewModel(repository);

            return vm;
        }

        public async Task<Album> PostAlbum(Album album)
        {
            //add to the database

            IResourceRepository repository = new Repository.ResourceRepository();
            repository.AddAlbum(album);
            return album;
     
        }

        public Album GetAlbum(string id)
        {
            IResourceRepository repository = new Repository.ResourceRepository();

            try
            {
                List<Album> albums = repository.GetAlbums(a => a.Name == id);

                return albums.FirstOrDefault();
            }
            catch
            {
                throw new System.Exception("No such album called "+ id);
            }
        }

        /// <summary>
        /// Uploads a resource and adds it to an album
        /// </summary>
        /// <param name="id"></param>
        [HttpPut]
        public void Upload(string id)
        {
            if (id != null)
            {
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                Repository.ResourceRepository repository = new Repository.ResourceRepository();
                ReferenceRepository refRepository = new ReferenceRepository();
                UserRepository ur = new UserRepository();
                User user = ur.Get("piccoli.dan@gmail.com");
                Album album = repository.GetAlbums(x => x.Name == id).FirstOrDefault();

                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[i];

                    string name = file.FileName;
                    using (Stream fileStream = file.InputStream)
                    {
                        DigitalResource myResource = repository.SaveFile(refRepository, user, fileStream, name);
                        if (myResource != null)
                        {
                            album.AddResource(myResource);
                            repository.SaveAlbum(album);
                        }
                    }
                }
            }
        }



    }
}
