"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt-layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    // API'den postları getir
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt");
        const data = await res.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Posts could not be fetched:", error);
      }
    };
    fetchPosts();
  }, []);

  // Arama alanı değiştiğinde filtreleme yap
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = posts.filter(
      (post) =>
        post.username.toLowerCase().includes(searchValue) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchValue))
    );
    setFilteredPosts(filtered);
  };

  // Etikete tıklayınca filtreleme yap
  const handleTagClick = (tag) => {
    setSearchText(tag);

    const filtered = posts.filter((post) =>
      post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
