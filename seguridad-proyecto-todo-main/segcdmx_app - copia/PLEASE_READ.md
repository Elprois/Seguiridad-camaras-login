I have been trying to fix the login issue, but I am missing a crucial piece of information about your database structure.

The error `column Usuarios.email does not exist` (and the previous similar errors) means I am trying to find the user profile in the `Usuarios` table using a column that does not exist.

To fix this, I need to know how the `auth.users` table (where Supabase stores authenticated users) is linked to your `Usuarios` table (where you store user profiles).

Please tell me the name of the column in your `Usuarios` table that contains the unique ID (`UUID`) of the user from the `auth.users` table.

Once you provide the correct column name, I can finalize the fix. For example, if the column is named `auth_uuid`, I can make the necessary change.
