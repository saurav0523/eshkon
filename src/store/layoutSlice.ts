import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutState, ComponentConfig, HeroData, TwoColumnData, ImageGridData } from '../types';

const initialState: LayoutState = {
  components: [],
  history: [],
  historyIndex: -1,
  isDirty: false,
  lastSaved: null,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<ComponentConfig>) => {
      state.components.push(action.payload);
      state.isDirty = true;
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push([...state.components]);
      state.historyIndex = state.history.length - 1;
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter(comp => comp.id !== action.payload);
      state.isDirty = true;
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push([...state.components]);
      state.historyIndex = state.history.length - 1;
    },
    reorderComponents: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.components.splice(sourceIndex, 1);
      state.components.splice(destinationIndex, 0, removed);
      // Update order numbers
      state.components.forEach((comp, index) => {
        comp.order = index;
      });
      state.isDirty = true;
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push([...state.components]);
      state.historyIndex = state.history.length - 1;
    },
    updateComponent: (state, action: PayloadAction<{ id: string; data: HeroData | TwoColumnData | ImageGridData }>) => {
      const { id, data } = action.payload;
      const component = state.components.find(comp => comp.id === id);
      if (component) {
        component.data = { ...component.data, ...data };
        state.isDirty = true;
        // Add to history
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push([...state.components]);
        state.historyIndex = state.history.length - 1;
      }
    },
    setComponents: (state, action: PayloadAction<ComponentConfig[]>) => {
      state.components = action.payload;
      state.isDirty = false;
      state.history = [action.payload];
      state.historyIndex = 0;
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.components = [...state.history[state.historyIndex]];
        state.isDirty = true;
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        state.components = [...state.history[state.historyIndex]];
        state.isDirty = true;
      }
    },
    markSaved: (state) => {
      state.isDirty = false;
      state.lastSaved = new Date().toISOString();
    },
    clearHistory: (state) => {
      state.history = [state.components];
      state.historyIndex = 0;
    },
  },
});

export const {
  addComponent,
  removeComponent,
  reorderComponents,
  updateComponent,
  setComponents,
  undo,
  redo,
  markSaved,
  clearHistory,
} = layoutSlice.actions;

export default layoutSlice.reducer; 