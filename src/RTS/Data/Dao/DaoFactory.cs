using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RTS.Data.Models;

namespace RTS.Data.Dao
{
    public class DaoFactory
    {

        private DaoType _type;
        public enum DaoType{
            Light,
            Room,
            Scenario,
            Users,
            LightConfig
        }

        private static Dictionary<Type, Action> modelCollection;

        public DaoFactory(DaoType type)
        {
            _type = type;
        }

        public IDao<IModel> Instanciate()
        {
            switch (_type)
            {
                case DaoType.Light:
                    return new LightDao();
                default:
                    return null;
            }
        }
        
    }
}
