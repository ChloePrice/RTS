using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace RTS.Data
{
    public class ConnectionFactory
    {
        public static SqlConnection create(DbName dbName, AuthenticationMethod authMethod, string username = null, string password = null)
        {
            string connectionString = "Data Source=.\\SQLEXPRESS;Initial Catalog=RtsDb;Integrated Security=True";

            switch (dbName)
            {
                case DbName.RtsDb:
                    connectionString = "Data Source=.\\SQLEXPRESS;Initial Catalog=RtsDb;";
                    switch (authMethod)
                    {
                        case AuthenticationMethod.SSLogin:
                            connectionString += String.Format("User Id={0};Password={1}", username, password);
                            break;
                        case AuthenticationMethod.SSTrustConnection:
                            connectionString += "Integrated Security=True";
                            break;
                    }
                    break;
            }

            return new SqlConnection(connectionString);
        }
    }
}
