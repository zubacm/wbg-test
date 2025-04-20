// import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";

// const initialState = {
//   selectedLocations: [],
//   selectedTourId: null,
//   eventTypes: BookmarkListEventType.Product,
//   name: "",
//   deliveryMethods: ["Email"],
//   bookmarkListNotificationFrequencyType: "Off",
// };

// export const bookmarkListStore = create(
//   immer((set) => ({
//     selectedLocations: [],
//     selectedTourId: null,

//     actions: {
//       selectNewTour: (payload) => {
//         set((state) => {
//           state.data = payload;
//           state.formForCreate.eventTypes = BookmarkListEventType[payload.type];
//           state.formForUpdate.eventTypes = BookmarkListEventType[payload.type];
//         });
//       },
//       updateForm: (payload) => {
//         set((state) => ({
//           formForUpdate: { ...state.formForUpdate, ...payload },
//         }));
//       },
//       createForm: (payload) => {
//         set((state) => ({
//           formForCreate: { ...state.formForCreate, ...payload },
//         }));
//       },
//       clearCreateForm: (payload) => {
//         set(() => ({
//           formForCreate: {
//             ...initialState,
//             ...payload,
//           },
//         }));
//       },
//       clearUpdateForm: () => {
//         set((state) => ({
//           formForUpdate: {
//             ...initialState,
//             eventTypes: BookmarkListEventType[state.data.type],
//           },
//         }));
//       },
//     },
//   }))
// );

// export const useBookmarkListStore = () =>
//   bookmarkListStore((state) => state.data);
// export const useBookmarkListFormForUpdate = () =>
//   bookmarkListStore((state) => state.formForUpdate);
// export const useBookmarkListFormForCreate = () =>
//   bookmarkListStore((state) => state.formForCreate);
// export const useBookmarkListActions = () =>
//   bookmarkListStore((state) => state.actions);