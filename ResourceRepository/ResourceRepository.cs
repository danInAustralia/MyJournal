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
using Repository;
using NHibernate;
using NHibernate.Criterion;
using ResourceRepository;

namespace Repository
{
    public class ResourceRepository : IResourceRepository
    {
        private static readonly string DatabaseID = WebConfigurationManager.AppSettings["database"];
        private static readonly string CollectionID = WebConfigurationManager.AppSettings["collection"];

        public List<Album> GetAlbums(Func<Album, bool> predicate)
        {
            List<Album> list = new List<Album>();

            var sessionFactory = SessionFactoryCreator.CreateSessionFactory();

            using (var session = sessionFactory.OpenSession())
            {
                using (session.BeginTransaction())
                {
                    if (predicate != null)
                    {
                        list = session.CreateCriteria(typeof(Album)).List<Album>().Where(predicate).ToList();
                    }
                    else
                    {
                        list = session.CreateCriteria(typeof(Album)).List<Album>().ToList();
                    }
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

        public void SaveResource(ResourceModel.Resource resource)
        {
            var sessionFactory = SessionFactoryCreator.CreateSessionFactory();

            using (var session = sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    //try
                    {
                        session.SaveOrUpdate(resource);
                        session.Transaction.Commit();
                    }
                }
            }
        }

        public void AddAlbum(Album album)
        {
            SaveAlbum(album);
        }

        public Stream GetResourceStream(string resourceID)
        {
            IAmazonS3 s3Client = new AmazonS3Client();

            using (TransferUtility tr = new TransferUtility(s3Client))
            {
                return tr.OpenStream("piccoli", resourceID);
            }
        }

        //Dont need this. Just need to add the tag to the resource model,
        //then save the resource
        //public int AddTagToResource(string md5, ResourceModel.Tag tag)
        //{
        //    throw new NotImplementedException();
        //}

        public int AddToAlbum(string albumName, ResourceModel.Resource resource)
        {
            int resourcesAdded = 0;
            Album album = GetAlbums(x => x.Name == albumName).FirstOrDefault();

            if(album != null)
            {
                album.AddResource(resource);

                //save the updated album to the database


                resourcesAdded++;
            }
            return resourcesAdded;
        }

        /// <summary>
        /// Saves a NEW resource. Only saves if resource with the MD5Sum has not previously been added.
        /// </summary>
        /// <param name="referenceRepository"></param>
        /// <param name="fileStream"></param>
        /// <param name="originalName"></param>
        /// <returns></returns>
        public ResourceModel.Resource SaveFile(ReferenceRepository referenceRepository,
            ResourceModel.User owner,
            Stream fileStream, 
            String originalName)
        {
            ResourceModel.Resource resource = null;
            ResourceType imageRT = referenceRepository.AllResourceTypes().Where(x => x.Type == "Image").FirstOrDefault();
            ResourceType otherRT = referenceRepository.AllResourceTypes().Where(x => x.Type == "Other").FirstOrDefault();
            //User user = reference

            try
            {

                //calculate md5 of the file to upload
                string md5Sum = String.Empty;
                using (var md5 = MD5.Create())
                {
                    md5Sum = BitConverter.ToString(md5.ComputeHash(fileStream)).Replace("-", "").ToLower();

                    if (!ResourceExists(md5Sum))
                    {
                        //create the resource object
                        resource = new ResourceModel.Resource
                        {
                            Md5 = md5Sum,
                            OriginalFileName = originalName,
                            Owner = owner
                        };

                        if (ReferenceService.IsValidImage(fileStream))
                        {
                            resource.Type = imageRT;
                            //resource.Type = "Image";
                            resource.Date = ReferenceService.GetDateTakenFromImage(fileStream);

                        }
                        else
                        {
                            resource.Type = otherRT;
                            resource.Date = null;
                        }

                        //fileStream.Position = 0;
                        //TransferUtilityUploadRequest tuu = new TransferUtilityUploadRequest
                        //{
                        //    InputStream = fileStream,
                        //    BucketName = "piccoli",
                        //    Key = "belvedere"
                        //};
                        //tr.UploadAsync(tuu);

                        //upload the file
                        IAmazonS3 s3Client = new AmazonS3Client();
                        ListBucketsResponse response = s3Client.ListBuckets();

                        using (TransferUtility tr = new TransferUtility(s3Client))
                        {
                            tr.Upload(fileStream, "piccoli", md5Sum);
                            //update the database
                            SaveResource(resource);
                        }
                    }
                }
            }
            catch (AmazonS3Exception ex)
            {

            }

            return resource;
        }
    }
}
