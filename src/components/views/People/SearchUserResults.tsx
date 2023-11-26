import { useState } from "react";
import { User } from "@/types";
import { SearchUserCard } from "./SearchUserCard";

export const SearchUserResults = ({ searchResults, searchString }: { searchResults: any[]; searchString: string }) => (
  <div>
    {searchString.length > 0 ? (
      searchResults?.length > 0 ? (
        <ul className="divide-y divide-gray-100">
          {searchResults.map((user) => (
            <SearchUserCard key={user?.id} user={user} />
          ))}
        </ul>
      ) : (
        <div className="text-center mt-8 text-white text-3xl">No users found.</div>
      )
    ) : null}
  </div>
);