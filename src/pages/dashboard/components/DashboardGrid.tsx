import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { debounce } from "@/common/utils/debounce.util";
import isEqual from "lodash.isequal";
import {
  Responsive as ResponsiveGridLayout,
  WidthProvider,
} from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { updateGridLayoutConfigAct } from "../action-creators/grid-layout-config.act";
import {
  BREAKPOINTS,
  COLS,
  ROW_HIGHT,
} from "../constants/dashboard-grid.const";
import DashboardCard from "./UI/DashboardCard";
import GridItem from "./UI/GridItem";

const ReactGridLayout = WidthProvider(ResponsiveGridLayout);

// Define breakpoints

function DashboardGrid() {
  const { layout } = useAppSelector((state) => state.gridLayoutConfigSlice);
  const { layoutItems } = useAppSelector((state) => state.layoutItemsSlice);
  const isEditMode = useAppSelector((state) => state.authSlice.editMode);
  const dispatch = useAppDispatch();

  const debouncedOnLayoutChange = debounce(
    (_: any, all: ReactGridLayout.Layouts) => {
      // Only dispatch if the new layout is different from the current state layout
      if (!isEqual(all, layout)) {
        dispatch(updateGridLayoutConfigAct({ all }));
      }
    },
    500,
  );

  return (
    <div className="flex h-full flex-1">
      <ReactGridLayout
        className="h-full w-full !p-0"
        layouts={layout}
        breakpoints={BREAKPOINTS}
        autoSize={true}
        rowHeight={ROW_HIGHT}
        onLayoutChange={debouncedOnLayoutChange}
        draggableCancel=".no-drag"
        isDraggable={isEditMode}
        isDroppable={isEditMode}
        isResizable={isEditMode}
        useCSSTransforms={true}
        cols={COLS}
      >
        {layoutItems.map((item) => (
          <GridItem key={item.id} itemId={item.id}>
            <DashboardCard {...item} />
          </GridItem>
        ))}
      </ReactGridLayout>
    </div>
  );
}

export default DashboardGrid;
