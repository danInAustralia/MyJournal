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
            //string fileName = string.Format("{0}.jpg", id);
            //if (!FileProvider.Exists(fileName))
            //    throw new HttpResponseException(HttpStatusCode.NotFound);

            //iif the local cache file exists, open it.

            string targetFolder = HttpContext.Current.Server.MapPath("~/cache/");
            FileStream cacheFile = null;
            if(File.Exists(targetFolder+id))
            {
                cacheFile = File.OpenRead(targetFolder+id);
            }
            else//otherwise get it from S3
            {
                repository.ReadRemoteResourceToLocalFile(id, targetFolder);
                cacheFile = File.OpenRead(targetFolder+id);
            }

            //await stream.CopyToAsync(stream2,);

            if (Request.Headers.Range != null)
            {
                try
                {
                    //if the file has not, download it locally.
                    string ext = String.Empty;
                    //if (resource.OriginalFileName.Contains("."))
                    //{
                    //    ext = resource.OriginalFileName.Substring(resource.OriginalFileName.IndexOf(".") + 1);
                    //}
                    if(String.IsNullOrEmpty(ext))
                    {
                        ext = "application/octet-stream";
                    }
                    string mimeType = MimeTypeHelper.GetMimeType(ext);
                    MediaTypeHeaderValue _mediaType = MediaTypeHeaderValue.Parse(mimeType);
                    RangeHeaderValue ranges = Request.Headers.Range;
                    RangeItemHeaderValue relevantRange = ranges.Ranges.First();
                    long? start = relevantRange.From;
                    long? end = relevantRange.To;
                    //stream.Position = 0;
                    // Return part of the video
                    HttpResponseMessage partialResponse = Request.CreateResponse(HttpStatusCode.PartialContent);
                    partialResponse.Headers.AcceptRanges.Add("bytes");
                    partialResponse.Content = new ByteRangeStreamContent(cacheFile, Request.Headers.Range, _mediaType);

                    //partialResponse.Content.Headers.ContentLength = end - start + 1;
                    //partialResponse.Content.Headers.ContentRange = contentRange;
                    return partialResponse;
                }
                catch (InvalidByteRangeException invalidByteRangeException)
                {
                    return Request.CreateErrorResponse(invalidByteRangeException);
                }
            }
            else
            {
                //stream.Position = 0;
                //stream2.Position = 0;
                HttpResponseMessage response = new HttpResponseMessage { Content = new StreamContent(cacheFile) };
                //response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpg");
                response.Content.Headers.ContentLength = cacheFile.Length;
                return response;
            }
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
            Tag tagToAdd = tagRepository.GetOrAdd(tag);

            resource.AddTag(tagToAdd);
        }
    }
}
