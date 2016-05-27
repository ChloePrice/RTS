using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RTS.Data.Models;

namespace RTS.Data.Dao
{
    public abstract class AbstractDao<T> where T : IModel
    {
        protected CAD _cad;

        public AbstractDao()
        {
            _cad = new CAD();
        }

        public virtual T Save(T obj)
        {
            IDao<IModel> dao = new DaoFactory(DaoFactory.DaoType.Light).Instanciate();
            return (T)dao.Save(obj);
        }
        public virtual T Delete(T obj)
        {
            IDao<IModel> dao = new DaoFactory(DaoFactory.DaoType.Light).Instanciate();
            return (T)dao.Delete(obj);
        }
        public virtual T Find(int id)
        {
            IDao<IModel> dao = new DaoFactory(DaoFactory.DaoType.Light).Instanciate();
            return (T)dao.Find(id);
        }
        public virtual List<T> FindAll()
        {
            IDao<IModel> dao = new DaoFactory(DaoFactory.DaoType.Light).Instanciate();
            List<T> result = new List<T>();
            dao.FindAll().ForEach(x => result.Add((T)x));
            return result;
        }
        public List<IModel> Instanciate(List<Dictionary<string, Object>> data)
        {
            List<IModel> result = new List<IModel>();
            data.ForEach(d => result.Add(Instanciate(d)));
            return result;
        }
    }
}
