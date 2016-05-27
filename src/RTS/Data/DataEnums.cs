using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RTS.Data
{
    public enum DbName
    {
        RtsDb = 0
    }

    public enum DbType
    {
        SqlServer = 0
    }

    public enum TableName
    {
        Light = 0,
        Room = 1,
        Scenario = 2,
        Users = 3
    }

    public enum AuthenticationMethod
    {
        SSTrustConnection = 0,
        SSLogin = 1
    }

    public enum QueryType
    {
        READ = 0,
        DELETE = 1,
        UPDATE = 2,
        CREATE = 3
    }
}
