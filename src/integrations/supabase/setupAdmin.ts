import { supabase } from './client';

export const setupAdminPrivileges = async (email: string) => {
  try {
    // First, get the user's ID from their email
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      throw userError;
    }

    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Update the user's profile to set is_admin to true
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', user.id);

    if (updateError) {
      throw updateError;
    }

    console.log('Admin privileges set successfully for user:', email);
    return true;
  } catch (error) {
    console.error('Error setting up admin privileges:', error);
    throw error;
  }
}; 