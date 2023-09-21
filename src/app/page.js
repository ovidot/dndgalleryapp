"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signOut, updateCurrentUser } from "firebase/auth";
import { redirect } from "next/navigation";
import { Router } from "next/router";

export default function Home() {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState([]);
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (updateCurrentUser) => {
    setUser(updateCurrentUser);
  });
  // const sendProps = () => {
  //   Router.push({
  //     pathname: "/auth",
  //     query: {
  //       user,
  //     },
  //   });
  // };
  // sendProps();
  if (!user) {
    redirect("/auth");
  }
  useEffect(() => {}, []);

  const logout = async () => {
    await signOut(auth);
  };
  const getImages = () => {
    fetch(
      "https://api.unsplash.com/photos?client_id=QqS80NOR-3daH8m2u1cLFemGgRWBU9Ul8a3JXAVA4zU"
    )
      .then((res) => res.json())
      .then((json) => setImageList(json))
      .catch((err) => console.error("error:" + err));
  };
  useEffect(() => {
    getImages();
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
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="bg-transparent border border-gray-500 text-gray-950 rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-[50%] text-sm p-2.5"
        />
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
                        className="p-5  justify-center flex min-w-[150px] max-w-[400px] min-h[150px] max-h-[300px] flex-shrink-0 "
                      >
                        <Image
                          src={items.urls.regular}
                          height={1000}
                          width={1000}
                          alt=""
                          priority={true}
                          className="object-contain"
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
