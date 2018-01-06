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
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;

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
        /// 
        [Authorize]
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

        [Authorize]
        public Album GetAlbum(string id)
        {
            IResourceRepository repository = new Repository.ResourceRepository();

            try
            {
                Album album = repository.GetAlbum(id);

                return album;
            }
            catch
            {
                throw new System.Exception("No such album called "+ id);
            }
        }

        [Authorize]
        [HttpGet]
        public ResourceListViewModel AlbumResources(string AlbumID, int PageNumber)
        {
            IResourceRepository repository = new Repository.ResourceRepository();
            try
            {
                AlbumID = AlbumID.Replace("%27", "'");
                Album album = repository.GetAlbum(AlbumID);

                ResourceListViewModel resourceVM = new ResourceListViewModel
                {
                    Resources = album.Resources.Skip((PageNumber - 1) * 20).Take(20).ToList(),
                    Total = album.Resources.Count
                };

                return resourceVM;
            }
            catch
            {
                throw new System.Exception("No such album called " + AlbumID);
            }
        }

        public bool GetDoesMd5Exist(string md5)
        {
            return true;
        }

        /// <summary>
        /// Adds a resource to an album.
        /// assertion that the resourceID and albumID exist
        /// </summary>
        /// <param name="albumID"></param>
        [HttpPost]
        public bool AddResource(string albumID, string resourceID)
        {
            bool success = false;
            //throw new Exception("forced error");
            Repository.ResourceRepository rr = new Repository.ResourceRepository();
            DigitalResource myResource = rr.Get(resourceID);
            //DigitalResource resource = null;
            if (myResource != null)
            {
                if (albumID != null)
                {
                    System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                    Repository.ResourceRepository repository = new Repository.ResourceRepository();
                    ReferenceRepository refRepository = new ReferenceRepository();
                    UserRepository ur = new UserRepository();
                    User user = ur.Get("piccoli.dan@gmail.com");
                    Album album = repository.GetAlbum(albumID);
                    album.AddResource(myResource);
                    repository.SaveAlbum(album);

                }
            }
            else
            {
                success = false;
                throw new System.Exception("No album specified");
            }

            return true;
        }

        /// <summary>
        /// Uploads a resource and adds it to an album
        /// (to be deprecated because it does two things)
        /// </summary>
        /// <param name="albumID"></param>
        [Authorize]
        [HttpPut]
        public IHttpActionResult Upload(string albumID)
        {
            //throw new Exception("forced error");
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            DigitalResource myResource = null;
            //DigitalResource resource = null;
            if (albumID != null)
            {
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                Repository.ResourceRepository repository = new Repository.ResourceRepository();
                ReferenceRepository refRepository = new ReferenceRepository();
                UserRepository ur = new UserRepository();
                User user = ur.Get("piccoli.dan@gmail.com");
                Album album = repository.GetAlbums(x => x.Name == albumID).FirstOrDefault();

                //for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[0];

                    string name = file.FileName;
                    using (Stream fileStream = file.InputStream)
                    {
                        myResource = repository.SaveOrGet(refRepository, user, fileStream, name);
                        if (myResource != null)
                        {
                            album.AddResource(myResource);
                            repository.SaveAlbum(album);
                        }
                        //resource = myResource;
                        //response.Content = new StringContent("{\"Md5\": \""+ "12345" + "\"");
                        //response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    }
                }
            }

            return Ok(myResource);
        }



    }
}
