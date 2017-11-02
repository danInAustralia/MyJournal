using Repository;
using ResourceModel;
using ResourceRepository;
using System;
using System.IO;
using System.Net;
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
            MemoryStream stream2 = new MemoryStream();
            stream.CopyTo(stream2);
            MediaTypeHeaderValue _mediaType = MediaTypeHeaderValue.Parse("application/octet-stream");
            if (Request.Headers.Range != null)
            {
                // Return part of the video
                HttpResponseMessage partialResponse = Request.CreateResponse(HttpStatusCode.PartialContent);
                partialResponse.Content = new ByteRangeStreamContent(stream2, Request.Headers.Range, _mediaType);
                return partialResponse;
            }
            //stream.Position = 0;
            //stream2.Position = 0;
            HttpResponseMessage response = new HttpResponseMessage { Content = new StreamContent(stream) };
            //response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpg");
            response.Content.Headers.ContentLength = stream.Length;
            return response;
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
