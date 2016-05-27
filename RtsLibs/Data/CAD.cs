using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Data;

namespace RtsLibs.Data
{
    public class CAD
    {
        //Injected.
        public SqlConnection Connection { get; }

        public CAD(string coString)
        {
            Connection = new SqlConnection(coString);
        }


        public List<Dictionary<string, object>> exec(string query, HashSet<SqlParameter> parameters, bool returnValue = true)
        {
            List<Dictionary<string, object>> res = new List<Dictionary<string, object>>();
            SqlCommand command = new SqlCommand(query, Connection);
            foreach (SqlParameter p in parameters)
            {
                command.Parameters.Add(p);
            }
            Connection.Open();
            if (returnValue)
            {
                command.Prepare();
                SqlDataReader r = command.ExecuteReader();
                while (r != null && r.Read())
                {
                    var line = new Dictionary<string, object>();
                    for (int i = 0; i < r.FieldCount; i++)
                    {
                        line.Add(r.GetName(i).ToUpper(), r.GetValue(i));
                    }
                    res.Add(line);
                }
            }
            else
                command.ExecuteNonQuery();
            Connection.Dispose();
            return res;
        }

        /// <summary>
        /// Exec a classic proc from the Db.
        /// </summary>
        /// <param name="procName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public List<Dictionary<string, object>> execProc(string procName, HashSet<SqlParameter> parameters)
        {
            List<Dictionary<string, object>> ReturnValue = new List<Dictionary<string, object>>();
            SqlDataReader Reader = null;
            try
            {
                Connection.Open();
                SqlCommand command = new SqlCommand(procName, Connection);
                command.CommandType = CommandType.StoredProcedure;
                foreach (SqlParameter p in parameters)
                {
                    command.Parameters.Add(p);
                }
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
        public object executeReturnProcedure(string name, HashSet<SqlParameter> parameters)
        {
            try
            {
                Connection.Open();

                SqlCommand cmd = new SqlCommand(name, Connection);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                foreach (SqlParameter param in parameters)
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

        /// <summary>
        /// turn args into SqlParameters
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        public static HashSet<SqlParameter> AsParams(params SqlParameter[] items)
        {
            return items.ToHashSet<SqlParameter>();
        }
    }
}
