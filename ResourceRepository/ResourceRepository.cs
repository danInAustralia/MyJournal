using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ResourceModel;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using System.Linq.Expressions;
using System.Configuration;
using System.Web.Configuration;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using System.Security.Cryptography;
using System.IO;

namespace ResourceRepository
{
    public class ResourceRepository : IResourceRepository
    {
        private static readonly string DatabaseID = WebConfigurationManager.AppSettings["database"];
        private static readonly string CollectionID = WebConfigurationManager.AppSettings["collection"];
        private static DocumentClient client;

        public ResourceRepository()
        {
            client = new DocumentClient(new Uri(WebConfigurationManager.AppSettings["endpoint"]), WebConfigurationManager.AppSettings["authKey"]);
        }

        public List<Album> GetAlbums(Expression<Func<Album, bool>> predicate)
        {
            List<Album> list = new List<Album>();

            if (predicate != null)
            {
                list = client.CreateDocumentQuery<Album>(
                        UriFactory.CreateDocumentCollectionUri(DatabaseID, CollectionID))
                    .Where(predicate)
                    .AsEnumerable().ToList();
            }
            else
            {
                list = client.CreateDocumentQuery<Album>(
                        UriFactory.CreateDocumentCollectionUri(DatabaseID, CollectionID))
                    .AsEnumerable().ToList();
            }
            return list;
        }

        public async Task<Document> AddAlbum(Album album)
        {
            return await client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(DatabaseID, CollectionID), album);
        }

        public int AddTagToFile(string md5, ResourceModel.Tag tag)
        {
            throw new NotImplementedException();
        }

        public int AddToAlbum(string albumName, ResourceModel.Resource resource)
        {
            throw new NotImplementedException();
        }

        public void SaveFile(Stream fileStream)
        {
            IAmazonS3 s3Client = new AmazonS3Client();


            try
            {
                ListBucketsResponse response = s3Client.ListBuckets();

                using (TransferUtility tr = new TransferUtility(s3Client))
                {
                    //calculate md5 of the file to upload
                    string md5Sum = String.Empty;
                    using (var md5 = MD5.Create())
                    {
                        {
                            md5Sum = BitConverter.ToString(md5.ComputeHash(fileStream)).Replace("-", "").ToLower();
                            //fileStream.Position = 0;
                            //TransferUtilityUploadRequest tuu = new TransferUtilityUploadRequest
                            //{
                            //    InputStream = fileStream,
                            //    BucketName = "piccoli",
                            //    Key = "belvedere"
                            //};
                            //tr.UploadAsync(tuu);
                            tr.Upload(fileStream, "piccoli", md5Sum);
                        }
                    }
                }
            }
            catch (AmazonS3Exception ex)
            {

            }
        }
    }
}
