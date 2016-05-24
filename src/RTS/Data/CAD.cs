using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;

namespace RTS.Data
{
    public class CAD
    {
        //Injected.
        public SqlConnection Connection { get; }

        public CAD(string coString)
        {
            Connection = new SqlConnection(coString);
        }

        /// <summary>
        /// Exec a classic proc from the Db.
        /// </summary>
        /// <param name="procName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public List<Dictionary<string, object>> exec(string procName, HashSet<SqlParameter> parameters)
        {
            List<Dictionary<string, object>> ReturnValue = new List<Dictionary<string, object>>();
            SqlDataReader Reader = null;
            try
            {
                Connection.Open();
                SqlCommand command = new SqlCommand(procName, Connection);
                parameters.ToList().ForEach(p => command.Parameters.Add(p));
                Reader = command.ExecuteReader();

                Dictionary<string, object> line;
                while (Reader.Read())
                {
                    line = new Dictionary<string, object>();
                    for (int i = 0; i < Reader.FieldCount; i++)
                    {
                        line.Add(Reader.GetName(i).ToUpper(), Reader.GetValue(i));
                    }
                    ReturnValue.Add(line);
                }
            }
            catch (SqlException ex)
            {
                throw ex; //for dev but handle this with a loggin module later.
            }
            catch(Exception ex)
            {
                throw ex; //Guh? Something else? Manage this as well.
            }
            finally
            {
                if (Reader != null)
                    Reader.Dispose();
                Connection.Close();
            }

            return ReturnValue;
        }

        /// <summary>
        /// Allow you to use a Proc with a T-SQL RETURN statement inside.
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Params"></param>
        /// <returns></returns>
        public object executeReturnProcedure(string Name, List<SqlParameter> Params)
        {
            try
            {
                Connection.Open();

                SqlCommand cmd = new SqlCommand(Name, Connection);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                foreach (SqlParameter param in Params)
                    cmd.Parameters.Add(param);

                SqlParameter ReturnValue = cmd.Parameters.Add("ReturnValue", System.Data.SqlDbType.Variant);
                ReturnValue.Direction = System.Data.ParameterDirection.ReturnValue;

                cmd.ExecuteReader();
                Connection.Close();
                return ReturnValue.Value;
            }
            catch (SqlException ex)
            {
                throw ex; //for dev but handle this with a loggin module later.
            }
            catch (Exception ex)
            {
                throw ex; //Guh? Something else? Manage this as well.
            }
            finally
            {
                Connection.Close();
            }

        }
    }
}
