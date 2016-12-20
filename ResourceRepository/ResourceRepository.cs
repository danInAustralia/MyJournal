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
using ResourceRepository;
using NHibernate;
using NHibernate.Criterion;

namespace Repository
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

            var sessionFactory = SessionFactoryCreator.CreateSessionFactory();

            using (var session = sessionFactory.OpenSession())
            {
                using (session.BeginTransaction())
                {
                    list = session.CreateCriteria(typeof(Album)).List<Album>().ToList();
                }
            }

            return list;
        }

        public bool ResourceExists(String hashID)
        {
            bool docExists = false;
            var sessionFactory = SessionFactoryCreator.CreateSessionFactory();

            using (var session = sessionFactory.OpenSession())
            {
                using (session.BeginTransaction())
                {
                    ResourceModel.Resource r = session.CreateCriteria(typeof(ResourceModel.Resource)).Add(Restrictions.Eq("Md5", hashID)).UniqueResult<ResourceModel.Resource>();
                    if(r != null)
                    {
                        docExists = true;
                    }
                }
            }

            return docExists;
        }

        public void SaveAlbum(Album album)
        {
            var sessionFactory = SessionFactoryCreator.CreateSessionFactory();

            using (var session = sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    //try
                    {
                        session.SaveOrUpdate(album);
                        session.Transaction.Commit();
                    }
                }
            }
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

        public void SaveFile(Stream fileStream, String originalName)
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

                            //create the resource object
                            ResourceModel.Resource resource = new ResourceModel.Resource
                            {
                                Md5 = md5Sum,
                                OriginalFileName = originalName
                            };

                            if(ReferenceService.IsValidImage(fileStream))
                            {
                                resource.Type = "Image";
                                resource.Date = ReferenceService.GetDateTakenFromImage(fileStream);
                            }

                            //fileStream.Position = 0;
                            //TransferUtilityUploadRequest tuu = new TransferUtilityUploadRequest
                            //{
                            //    InputStream = fileStream,
                            //    BucketName = "piccoli",
                            //    Key = "belvedere"
                            //};
                            //tr.UploadAsync(tuu);

                            if (!ResourceExists(resource))
                            {
                                //upload the file
                                tr.Upload(fileStream, "piccoli", md5Sum);
                                //update the database

                            }
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
