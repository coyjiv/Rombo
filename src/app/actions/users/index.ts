
export async function findUser(searchString:any) {
    try {
      const response = await fetch(`/api/users?searchString=${searchString}`);
      const { data } = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }