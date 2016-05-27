using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using RTS.Data.Models;

namespace RTS.Data.Dao
{
    public class LightDao : AbstractDao<IModel>, IDao<IModel>
    {
        public override IModel Delete(IModel obj)
        {
            SqlParameter param = new SqlParameter("@id", obj.Id);
            param.SqlDbType = SqlDbType.Int;
            _cad.exec("DELETE FROM Light WHERE Light.id = @id", CAD.AsParams(param));
            return obj;
        }

        public override IModel Find(int id)
        {
            SqlParameter param = new SqlParameter("@id", id);
            param.SqlDbType = SqlDbType.Int;
            Dictionary<String, Object> result = _cad.
                exec("SELECT * FROM Light WHERE Light.id = @id", CAD.AsParams(param)).
                FirstOrDefault();
            
            if(result == null){
                throw new Exception(); //TODO return custom Ex
            }

            return Instanciate(result); 
        }

        public override List<IModel> FindAll()
        {
            List <Dictionary <String, Object>> result = _cad.
                exec("SELECT * FROM Light", CAD.AsParams());

            if (result == null)
            {
                return new List<IModel>();
            }

            return Instanciate(result);
        }

        public override IModel Save(IModel obj)
        {
            Light input = (Light)obj;
            if (typeof(Light) != input.GetType())
                throw new Exception(); //replca with custom exception

            SqlParameter param = new SqlParameter("@label", input.Label);
            param.SqlDbType = SqlDbType.VarChar;
            _cad.exec("INSERT INTO Light(label) VALUES(@label)", CAD.AsParams(param));
            //Here
        }

        public IModel Instanciate(Dictionary<string, Object> data)
        {
            Light l = new Light();
            try
            {
                l.Id = Convert.ToInt32(data["id"]);
                l.Label = Convert.ToString(data["label"]);
            }
            catch (FormatException)
            {
                //log me, rethrow with custom ex?
            }
            return l;

        }
    }
}
