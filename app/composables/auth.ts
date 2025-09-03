import { createAuthClient } from "better-auth/vue";
import { createClient } from "@supabase/supabase-js";

export const auth_client = createAuthClient({});

// export function useSupabase() {
//   const runtime_config = useRuntimeConfig();

//   return createClient(
//     runtime_config.public.supabase_url,
//     runtime_config.public.supabase_key,
//   );
// }
