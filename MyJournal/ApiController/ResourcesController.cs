using Amazon.S3;
using Amazon.S3.Model;
using Repository;
using ResourceModel;
using ResourceRepository;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MyJournal.ApiController
{
    public class ResourcesController : System.Web.Http.ApiController
    {
        /// <summary>
        /// Uploads a resource and adds it to an album
        /// </summary>
        /// <param name="resourceID">the md5 of the requested resource.</param>
        //public string GetResource(string id)
        //{
        //    Repository.ResourceRepository repository = new Repository.ResourceRepository();
        //    ReferenceRepository refRepository = new ReferenceRepository();
        //    byte[] bytes = null;

        //    using (Stream stream = repository.GetResourceStream(id))
        //    {
        //        using (var memoryStream = new MemoryStream())
        //        {
        //            stream.CopyTo(memoryStream);
        //            bytes = memoryStream.ToArray();
        //        }
        //    }
        //    string base64String = Convert.ToBase64String(bytes);
        //    return base64String;
        //}

        public async Task<HttpResponseMessage> Get(string id)
        {

            Repository.ResourceRepository repository = new Repository.ResourceRepository();
            DigitalResource resource = repository.Get(id);
            //await stream.CopyToAsync(stream2,);
            // Create a client
            AmazonS3Client client = new AmazonS3Client();

            GetObjectRequest request = null;
            if (Request.Headers.Range != null)
            {

                if (Request.Headers.Range.Ranges.First().To == null)
                {
                    // Create a GetObject request
                    request = new GetObjectRequest
                    {
                        BucketName = "piccoli",
                        Key = id
                    };
                }
                else
                {
                    request = new GetObjectRequest
                    {
                        BucketName = "piccoli",
                        Key = id,
                        ByteRange = new ByteRange((long)Request.Headers.Range.Ranges.First().From,
                            Request.Headers.Range.Ranges.First().To == null ? 0 : (long)Request.Headers.Range.Ranges.First().To)
                    };
                }
            }
            else
            {
                request = new GetObjectRequest
                {
                    BucketName = "piccoli",
                    Key = id
                };
            }
                    // Issue request and remember to dispose of the response
                    //using 
            GetObjectResponse response = client.GetObject(request);
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new StreamContent(response.ResponseStream);
            result.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/octet-stream");
            return result;

        }

        private static MediaTypeHeaderValue GetMediaType(DigitalResource resource)
        {
            String ext = String.Empty;
            if (resource.OriginalFileName.Contains("."))
            {
                ext = resource.OriginalFileName.Substring(resource.OriginalFileName.IndexOf(".") + 1);
            }
            if (String.IsNullOrEmpty(ext))
            {
                ext = "application/octet-stream";
            }
            string mimeType = MimeTypeHelper.GetMimeType(ext);
            MediaTypeHeaderValue _mediaType = MediaTypeHeaderValue.Parse(mimeType);
            return _mediaType;
        }

        /// <summary>
        /// Uploads a resource 
        /// </summary>
        [HttpPut]
        public IHttpActionResult Upload()
        {
            //throw new Exception("forced error");
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            DigitalResource myResource = null;
            //DigitalResource resource = null;
            //if (albumID != null)
            {
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                Repository.ResourceRepository repository = new Repository.ResourceRepository();
                ReferenceRepository refRepository = new ReferenceRepository();
                UserRepository ur = new UserRepository();
                User user = ur.Get("piccoli.dan@gmail.com");
                //Album album = repository.GetAlbums(x => x.Name == albumID).FirstOrDefault();

                //for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[0];

                    string name = file.FileName;
                    using (Stream fileStream = file.InputStream)
                    {
                        myResource = repository.SaveOrGet(refRepository, user, fileStream, name);
                    }
                }
            }

            return Ok(myResource);
        }

        public bool DoesMd5Exist(string md5)
        {
            return true;
        }

        public void AddTag(string resourceID, string tag)
        {
            Repository.ResourceRepository repository = new Repository.ResourceRepository();
            TagRepository tagRepository = new TagRepository();

            DigitalResource resource = repository.Get(resourceID);
            ResourceModel.Tag tagToAdd = tagRepository.GetOrAdd(tag);

            resource.AddTag(tagToAdd);
        }
    }
}
