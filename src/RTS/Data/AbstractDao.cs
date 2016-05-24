using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RTS.Data
{
    public abstract class AbstractDao<T>
    {
        public abstract T Create(T obj);
        public abstract T Save(T obj);
        public abstract T Delete(T obj);
        public abstract T Find(Object id);
        public abstract List<T> FindAll();
    }
}
