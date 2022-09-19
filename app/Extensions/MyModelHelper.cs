using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace app.Extensions
{
    public static class ModelStateHelper
    {
        public static bool GetErrors(this ModelStateDictionary ModelState)
        {
           var errors = ModelState.Values.Any(x => x.Errors.Count >= 1);
            return errors;
        }
    }
}
