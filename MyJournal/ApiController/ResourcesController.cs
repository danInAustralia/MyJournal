using Repository;
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;

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

        public HttpResponseMessage Get(string id)
        {

            Repository.ResourceRepository repository = new Repository.ResourceRepository();
            //string fileName = string.Format("{0}.jpg", id);
            //if (!FileProvider.Exists(fileName))
            //    throw new HttpResponseException(HttpStatusCode.NotFound);

            //FileStream fileStream = FileProvider.Open(fileName);
            Stream stream = repository.GetResourceStream(id);
            HttpResponseMessage response = new HttpResponseMessage { Content = new StreamContent(stream) };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpg");
            response.Content.Headers.ContentLength = stream.Length;
            return response;
        }
    }
}
