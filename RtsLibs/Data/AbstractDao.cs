using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace RtsLibs.Data
{
    public abstract class AbstractDao<T> where T: Models.IModel
    {
        private CAD cad;

        public AbstractDao()
        {
            cad = new CAD("Data Source=.\\SQLEXPRESS;Initial Catalog=RtsDb;Integrated Security=True;");
        }

        public abstract T Create(T obj);
        public abstract T Save(T obj);
        public virtual T Delete(T obj, string tableName)
        {
            cad.exec(@"Delete FROM " + tableName + "AS t WHERE t.id = @id", CAD.AsParams(new SqlParameter("@id", System.Data.SqlDbType.Int, obj.Id)));
            return obj;
        }
        public virtual T Find(Object id, string tableName)
        {
            List<Dictionary<String, object>> result = cad.exec(@"SELECT * FROM " + tableName + "AS t WHERE t.id = @id", CAD.AsParams(new SqlParameter("@id", System.Data.SqlDbType.Int, obj.Id)));
            return result.Select(r => this.instanciate(r)).FirstOrDefault();
        }
        public virtual List<T> FindAll(string tableName)
        {
            List<Dictionary<String, object>> result = cad.exec(@"SELECT * FROM " + tableName, CAD.AsParams(new SqlParameter("@id", System.Data.SqlDbType.Int, obj.Id)));
            return result.Select(r => this.instanciate(r)).ToList();
        }

        public abstract T instanciate(Dictionary<String, object> data);
    }
}
