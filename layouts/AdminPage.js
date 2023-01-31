// import { onDragEnd } from "@lib/dndfunction";
// import { sortByWeight } from "@lib/sortByweight";
// import { Grid, Typography } from "@mui/material";
// import TestimonialCard from "components/cards/TestimonialCard";
// import Buttons from "components/Buttons";
// import FullLayout from "layouts/FullLayout";
// import { useEffect, useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// const AdminPage = ({ currentData, type }) => {
//   const [mounted, setMounted] = useState(false);
//   const [columns, setColumns] = useState({
//     draft: {
//       title: "",
//       items: [],
//     },
//     undraft: {
//       title: "",
//       items: [],
//     },
//   });
//   const [isTrash, setIsTrash] = useState(false);
//   // check mount
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     setColumns({
//       ...columns,
//       undraft: {
//         title: "Published",
//         items: sortByWeight(currentData.undraft),
//       },
//       draft: {
//         title: "Draft",
//         items: sortByWeight(currentData.draft),
//       },
//     });
//   }, [currentData]);

//   const separateDraft = (params, isDraft) => {
//     const draft = columns[params].items.map((data, i) => {
//       return {
//         ...data,
//         weight: i,
//         draft: isDraft,
//       };
//     });

//     return draft;
//   };

//   const draft = separateDraft("draft", true);

//   const published = separateDraft("undraft", false);
//   const draftObject = [...draft, ...published];

//   return (
//     <FullLayout>
//       <Buttons
//         type={type}
//         data={draftObject}
//         setIsTrash={setIsTrash}
//         isTrash={isTrash}
//       />

//       {mounted && (
//         <Grid container spacing={4}>
//           <DragDropContext
//             onDragEnd={(result) =>
//               onDragEnd(result, columns, setColumns, separateDraft)
//             }
//           >
//             {Object.entries(columns).map(([columnId, column]) => {
//               return (
//                 <Grid item sm={6} key={columnId}>
//                   <Typography variant="h2">{column.title}</Typography>
//                   <Droppable droppableId={columnId} key={columnId}>
//                     {(provided, snapshot) => {
//                       return (
//                         <div
//                           {...provided.droppableProps}
//                           ref={provided.innerRef}
//                           style={{
//                             padding: "5px",
//                             borderRadius: "5px",
//                             background: snapshot.isDraggingOver
//                               ? "#fbf5ff"
//                               : "#eee",
//                           }}
//                         >
//                           {column.items.map((item, index) => {
//                             return (
//                               <Draggable
//                                 key={`${item?._id}`}
//                                 draggableId={item?._id.toString()}
//                                 index={index}
//                               >
//                                 {(provided) => {
//                                   return (
//                                     <TestimonialCard
//                                       provided={provided}
//                                       item={item}
//                                       index={index}
//                                     />
//                                   );
//                                 }}
//                               </Draggable>
//                             );
//                           })}
//                           {provided.placeholder}
//                         </div>
//                       );
//                     }}
//                   </Droppable>
//                 </Grid>
//               );
//             })}
//           </DragDropContext>
//         </Grid>
//       )}
//     </FullLayout>
//   );
// };

// export default AdminPage;
