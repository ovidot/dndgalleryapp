"use client";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const handleDragDrop = (results) => {
    console.log(results);
  };
  return (
    <main className="flex min-h-screen flex-col items-center mx-auto border border-black max-w-7xl p-3 lg:p-12">
      <div className="items center w-full justify-center flex text-5xl text-gray-900 font-serif underline font-bold p-4">
        IMAGE GALLERY
      </div>
      <div className="w-full border flex justify-center">
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="bg-transparent border border-gray-500 text-gray-950 rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-[50%] text-sm p-2.5"
        />
      </div>
      <DragDropContext
        onDragEnd={() => {
          handleDragDrop;
        }}
      >
        <Droppable droppableId="ROOT" type="group" className="">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-12 gap-4 w-full mx-auto justify-center mt-5 p-3"
            >
              <Draggable draggableId={"01"} index={"01"} className="">
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="col-span-12 sm:col-span-6 md:col-span-3 justify-center flex min-w-[150px] max-w-[300px] min-h[150px] max-h-[300px] flex-shrink-0 "
                  >
                    <Image
                      src={"/Motherhod.jpg"}
                      height={1000}
                      width={1000}
                      alt=""
                      className="object-contain"
                    />
                  </div>
                )}
              </Draggable>
              <Draggable draggableId={"02"} index={"02"}>
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="col-span-12 sm:col-span-6 md:col-span-3 justify-center flex min-w-[150px] max-w-[300px] min-h[150px] max-h-[300px] flex-shrink-0 "
                  >
                    <Image
                      src={"/Houses.jpg"}
                      height={1000}
                      width={1000}
                      alt=""
                      className="object-contain"
                    />
                  </div>
                )}
              </Draggable>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
