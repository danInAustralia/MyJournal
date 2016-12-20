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

namespace MyJournal.ApiControllers
{
    public class AlbumsController : ApiController
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
            IResourceRepository repository = new ResourceRepository();
            AlbumListViewModel vm = albumListFactory.GetAlbumListViewModel(repository);

            return vm;
        }

        public async Task<Album> PostAlbum(Album album)
        {
            //add to the database

            IResourceRepository repository = new ResourceRepository();
            await repository.AddAlbum(album);
            return album;
     
        }

        public Album GetAlbum(string id)
        {
            IResourceRepository repository = new ResourceRepository();

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

        [HttpPut]
        public void Upload(string id)
        {
            System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            ResourceRepository repository = new ResourceRepository();

            for(int i=0; i< files.Count; i++)
            {
                HttpPostedFile file = files[i];

                string name = file.FileName;
                using (Stream fileStream = file.InputStream)
                {
                    repository.SaveFile(fileStream, name);
                }
            }
        }
    }
}
