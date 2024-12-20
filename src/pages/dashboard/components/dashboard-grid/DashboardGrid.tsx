import MessageDisplay from "@/common/components/UI/MessageDisplay";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { debounce } from "@/common/utils/debounce.util";
import isEqual from "lodash.isequal";
import { useState } from "react";
import {
  Responsive as ResponsiveGridLayout,
  WidthProvider,
} from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { updateGridLayoutConfigAct } from "../../action-creators/grid-layout-config.act";
import {
  BREAKPOINTS,
  COLS,
  MARGIN,
  ROW_HEIGHT,
} from "../../constants/dashboard-grid.const";
import { defaultGridData } from "../../constants/default-grid.const";
import { setBreakpoint } from "../../reducers/grid-layout-config.reducer";
import DashboardCard from "../UI/DashboardCard";
import GridItem from "../UI/GridItem";
import "./dashboard-grid.css";

const ReactGridLayout = WidthProvider(ResponsiveGridLayout);

function DashboardGrid() {
  const { layout } = useAppSelector((state) => state.gridLayoutConfigSlice);
  const { layoutItems } = useAppSelector((state) => state.layoutItemsSlice);
  const isEditMode = useAppSelector((state) => state.authSlice.editMode);
  const [sidebarOpened, setSidebarOpened] = useState(false);
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

  const onBreakpointChange = (breakpoint: string) => {
    dispatch(setBreakpoint(breakpoint));
  };

  return (
    <div className="relative flex flex-1">
      <ReactGridLayout
        className="min-h-[calc(100vh+100px)] w-full !p-0"
        layouts={
          layout["lg"].length > 0 || !isEditMode
            ? layout
            : defaultGridData.gridLayoutConfig
        }
        breakpoints={BREAKPOINTS}
        onBreakpointChange={onBreakpointChange}
        autoSize={true}
        rowHeight={ROW_HEIGHT}
        onLayoutChange={debouncedOnLayoutChange}
        draggableCancel=".no-drag"
        isDraggable={isEditMode && !sidebarOpened}
        isDroppable={isEditMode}
        isResizable={false}
        useCSSTransforms={true}
        cols={COLS}
        margin={MARGIN}
      >
        {(layoutItems.length > 0 || !isEditMode
          ? layoutItems
          : defaultGridData.layoutItems
        ).map((item) => {
          return (
            <GridItem
              sidebarOpened={sidebarOpened}
              setSidebarOpened={setSidebarOpened}
              item={item}
              key={item.id}
            >
              <DashboardCard />
            </GridItem>
          );
        })}
      </ReactGridLayout>

      {!isEditMode && layoutItems.length == 0 && (
        <MessageDisplay
          message="Nothing is added"
          imgClassName=" w-80 h-80"
          imgSrc="https://cdn-icons-png.flaticon.com/512/14005/14005478.png"
        />
      )}
    </div>
  );
}

export default DashboardGrid;
