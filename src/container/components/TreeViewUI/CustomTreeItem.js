import { Typography } from '@mui/material';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import tree_chevron_open from 'assets/images/tree_chevron_open.png';
import tree_chevron_close from 'assets/images/tree_chevron_close.png';
export default function CustomTreeItem({
  nodeId,
  label,
  onLabelClick,
  onIconClick,
  expanded,
  ...props
}) {
  return (
    <>
      <TreeItem
        nodeId={nodeId}
        label={<Typography onClick={onLabelClick}>{label}</Typography>}
        {...props}
      />
      <button onClick={onIconClick} className="treeChevron">
        {expanded ? (
          <img src={tree_chevron_open} />
        ) : (
          <img src={tree_chevron_close} />
        )}
      </button>
    </>
  );
}
