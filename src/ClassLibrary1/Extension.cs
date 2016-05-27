using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RTS
{
    /// <summary>
    /// Centralized extension method for framework.
    /// </summary>
    public static class Extension
    {
        /// <summary>
        /// Turn a IEnumerable item to HashSet. Duplicate are destroyed.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <returns></returns>
        public static HashSet<T> ToHashSet<T>(this IEnumerable<T> source) {
            return new HashSet<T>(source);
        } 
    }
}
