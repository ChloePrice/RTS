using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RTS.Data.Models;

namespace RTS.Data.Dao
{
    public interface IDao<T> where T : IModel
    {
        T Delete(T obj);
        T Save(T obj);
        T Find(int id);
        List<T> FindAll();
        T instanciate(Dictionary<String, Object> data);
    }
}
