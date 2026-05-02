import { PREVIEW_PADDING_Y, PREVIEW_ROW_HEIGHT } from "@shared/models/constants/layout.constants";

export const getPreviewHeight = (rowCount: number) =>
  rowCount * PREVIEW_ROW_HEIGHT + PREVIEW_PADDING_Y;
