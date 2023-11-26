import { SearchFriendCard } from "./SearchFriendCard";
import { IUser } from "@/mongo/models/User";

interface SearchFriendResultsProps {
  searchResults: IUser[];
  searchString: string;
}

export const SearchFriendResults = ({ searchResults, searchString }: SearchFriendResultsProps) => {
  
  return (
    <div>
      {searchString.length > 0 ? (
        searchResults.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {searchResults.map((user) => (
              <SearchFriendCard key={user.email} user={user} />
            ))}
          </ul>
        ) : (
          <div className="text-center mt-8 text-white text-3xl">No friends found.</div>
        )
      ) : null}
    </div>
  );
};