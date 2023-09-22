"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signOut, updateCurrentUser } from "firebase/auth";
import { redirect } from "next/navigation";
import { Router } from "next/router";

export default function Home() {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState([]);
  const [user, setUser] = useState({});
  const [searchList, setSearchList] = useState([]);
  const [loadingImages, setLoadingImages] = useState([]);
  const searchInput = useRef(null);
  const API_URL = "https://api.unsplash.com/search/photos";

  onAuthStateChanged(auth, (updateCurrentUser) => {
    setUser(updateCurrentUser);
  });
  if (!user) {
    redirect("/auth");
  }
  const logout = async () => {
    await signOut(auth);
  };
  const handleImageLoad = (index) => {
    setLoadingImages((prev) =>
      prev.map((loadState, i) => (i === index ? false : loadState))
    );
  };
  const getImages = () => {
    fetch(
      "https://api.unsplash.com/photos?client_id=QqS80NOR-3daH8m2u1cLFemGgRWBU9Ul8a3JXAVA4zU"
    )
      .then((res) => res.json())
      .then((json) => setImageList(json))
      .catch((err) => console.error("error:" + err));
    setLoading(false);
  };
  useEffect(() => {
    getImages();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    getSearchImages();
    searchInput.current.value = ""; // Clear the search input field
  };
  const getSearchImages = () => {
    fetch(
      `${API_URL}?query=${searchInput.current.value}&client_id=QqS80NOR-3daH8m2u1cLFemGgRWBU9Ul8a3JXAVA4zU`
    )
      .then((res) => res.json())
      .then((json) => setSearchList(json.results))
      .catch((err) => console.error("error:" + err));
    setLoading(false);
  };
  console.log(searchList.results);
  useEffect(() => {
    getSearchImages();
  }, []);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    console.log(source, destination, type);
    if (!destination) return;
    if (
      source.droppableId == destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const reorderedImages = [...imageList];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedImage] = reorderedImages.splice(sourceIndex, 1);
      reorderedImages.splice(destinationIndex, 0, removedImage);
      return setImageList(reorderedImages);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center mx-auto border border-black max-w-7xl p-3 lg:p-12">
      <div className="items center w-full justify-center flex text-5xl text-gray-900 font-serif underline font-bold p-4">
        IMAGE GALLERY
      </div>
      <div className="">{user?.email}</div>
      <div className="w-full border flex justify-center">
        <form
          className="w-full flex justify-center"
          action="submit"
          onSubmit={handleSearch}
        >
          <input
            ref={searchInput}
            type="text"
            id="search"
            placeholder="Search"
            className="bg-transparent border border-gray-500 text-gray-950 rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-[50%] text-sm p-2.5"
          />
        </form>
        <button onClick={logout}>logout</button>
      </div>
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId={"ROOT"} type="group">
          {(provided) => (
            <div
              className=""
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {provided.placeholder}
              {searchList.map((result, index) => (
                <Draggable
                  key={result.id}
                  draggableId={result.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      {...provided.placeholder}
                      ref={provided.innerRef}
                      className=" p-5  justify-center flex min-w-[150px] max-w-[400px] min-h[150px] max-h-[300px] flex-shrink-0 "
                    >
                      {loadingImages[index] && <div>Loading...</div>}
                      <Image
                        src={result.urls.regular}
                        height={1000}
                        width={1000}
                        blurDataURL={result.urls.thumb}
                        placeholder="blur"
                        alt=""
                        priority={true}
                        className="object-contain"
                        onLoad={() => handleImageLoad(index)} // Call handleImageLoad when image finishes loading
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {React.Children.toArray(
                imageList.map((items, index) => (
                  <Draggable
                    key={items.id}
                    draggableId={items.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        {...provided.placeholder}
                        ref={provided.innerRef}
                        className=" p-5  justify-center flex min-w-[150px] max-w-[400px] min-h[150px] max-h-[300px] flex-shrink-0 "
                      >
                        <Image
                          src={items.urls.regular}
                          height={1000}
                          width={1000}
                          blurDataURL={items.urls.thumb}
                          placeholder="blur"
                          alt=""
                          priority={true}
                          className="object-contain"
                          onLoad={() => handleImageLoad(index)} // Call handleImageLoad when image finishes loading
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
